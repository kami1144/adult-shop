import { NextRequest, NextResponse } from 'next/server';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-cp-z0pQ-l2ZgtqB1hC1VWHeJxZb7dB-M2RvWIWkdG3Be5Gq9mrv8EWbHMnB1NTedYZzX7M8ZmVTTeasNgDMQCuWLcd3KMpCqeXk-k4CxlN72Si2leILToqbHME';
const MINIMAX_API_URL = 'https://api.minimaxi.com/anthropic/v1/messages';

const SYSTEM_PROMPTS = {
  quiz: `你是日本成人用品EC网站的AI选品助手。
客户のニーズに合わせて、最適な商品を見つけてください。
商品カテゴリ：男性用玩具、女性用玩具、セックススーツ、LOTUSシリーズ、body-safe silicone商品など。
プライバシー保護を徹底し、品名の特定は全て英語商品名で行い、日本語では「商品」とだけ表記してください。
会話は親しみやすくしながらも品のある会話を心がけてください。
必ず最後に「他还为您提供」+ 具体商品名を1つ以上提案してください。`,

  privacy: `你是日本成人用品EC网站的AI隐私顾问。
回答关于隐私配送、包装匿名性、付款明细上店铺名称隐藏等问题。
店铺政策：隐私发货（包装上不显示店铺名或商品名）、専用外箱、付款明细可设置为其他店名。
只提供信息，不要编造具体的店铺操作方式。`,

  support: `你是日本成人用品EC网站的AI客服。
回答关于商品咨询、配送查询、退换货流程等问题。
提供邮件联系方式：contact@example.com
提供电话対応時間：10:00-18:00（土日祝休）
只提供信息，不要编造具体的店铺操作方式。`,
};

export async function POST(request: NextRequest) {
  try {
    const { type, message, history = [] } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { reply: 'メッセージが空です' },
        { status: 400 }
      );
    }

    const validTypes = ['quiz', 'privacy', 'support'];
    const aiType = validTypes.includes(type) ? type : 'support';

    // Build messages array (Anthropic format)
    const messages: { role: 'user'; content: string }[] = [];

    // Add system prompt as first user message with instruction
    messages.push({
      role: 'user',
      content: SYSTEM_PROMPTS[aiType as keyof typeof SYSTEM_PROMPTS],
    });

    // Add history
    const recentHistory = history.slice(-20);
    for (const h of recentHistory) {
      messages.push({
        role: 'user',
        content: (h.sender === 'user' ? '客户: ' : 'AI: ') + h.content,
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call MiniMax API (Anthropic-compatible)
    if (!MINIMAX_API_KEY) {
      return NextResponse.json({ reply: getMockReply(aiType, message) });
    }

    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MINIMAX_API_KEY}`,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const rawText = await response.text();
    console.error('MiniMax raw response:', rawText);

    if (!response.ok) {
      console.error('MiniMax API error:', response.status, rawText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = JSON.parse(rawText);

    // Extract text from Anthropic response format
    let reply = '';
    if (data.content && Array.isArray(data.content)) {
      const textBlock = data.content.find((b: { type: string }) => b.type === 'text');
      reply = textBlock?.text || '';
    }

    if (!reply) {
      console.error('No reply in response:', JSON.stringify(data).substring(0, 500));
      return NextResponse.json({
        reply: '申し訳ありません。一時的なエラーが発生しました。',
        debug_error: `No reply - content: ${JSON.stringify(data.content)?.substring(0, 200)}`,
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Chat error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      reply:
        '申し訳ありません。一時的なエラーが発生しました。しばらく経ってから再度お試しください。',
      debug_error: message,
    });
  }
}

function getMockReply(type: string, lastMessage: string): string {
  const mockReplies: Record<string, string> = {
    quiz: `ありがとうございました！需求我明白了。

根据您的描述，推荐关注 LOTUS 系列的敏感振动器——采用 body-safe silicone，专门设计用于敏感肌肤。

此外，如果您想要 something more intense，强烈推荐我们店内的 bestseller 人体工学款，适合初次体验。

您还有其他具体需求吗？`,

    privacy: `了解您对隐私保护的关注！我们的店铺非常重视这一点。

具体措施包括：
✓ 専用隐私包装，外包装不显示任何商品信息
✓ 配送单上只写「書類」或「선물」
✓ 可在备注中填写要求，包装内完全中性
✓ 付款明细可设置为其他店名

如有更多问题，请随时询问！`,

    support: `收到您的提问！关于您咨询的内容，我来为您解答。

的一般質問：
• 配送期間：通常3-5営業日
• 运费：700円（5000円以上包邮）
• 退货：商品到着後7日以内可（未开封）

如需更详细的帮助，请联系：
📧 contact@example.com
📞 対応時間 10:00-18:00（土日祝休）`,
  };

  return mockReplies[type] || mockReplies.support;
}
