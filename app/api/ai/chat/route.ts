import { NextRequest, NextResponse } from 'next/server';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || '';
const MINIMAX_API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_pro';

const SYSTEM_PROMPTS = {
  quiz: `あなたは日本の成人用品ECサイトのAI選品助手です。
お客様のニーズに合わせて、最適な商品を見つけてください。
商品カテゴリ：男性用玩具（マスターベーションツール等）、女性用玩具（バイブレーター等）、セックススーツ、LOTUSシリーズ、body-safe silicone商品など。
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
        { error: 'メッセージが空です' },
        { status: 400 }
      );
    }

    const validTypes = ['quiz', 'privacy', 'support'];
    const aiType = validTypes.includes(type) ? type : 'support';

    // Build messages array
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPTS[aiType as keyof typeof SYSTEM_PROMPTS] },
    ];

    // Add history (max 20 messages)
    const recentHistory = history.slice(-20);
    for (const h of recentHistory) {
      messages.push({
        role: h.sender === 'user' ? 'user' : 'assistant',
        content: h.content,
      });
    }
    messages.push({ role: 'user', content: message });

    // Call MiniMax API
    if (!MINIMAX_API_KEY) {
      return NextResponse.json({
        reply: getMockReply(aiType, message),
      });
    }

    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-Text-01',
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('Invalid API response');
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      {
        reply:
          '申し訳ありません。一時的なエラーが発生しました。しばらく経ってから再度お試しください。',
      },
      { status: 200 }
    );
  }
}

function getMockReply(type: string, lastMessage: string): string {
  const mockReplies: Record<string, string> = {
    quiz: `ありがとうございました！您说的需求，我来分析一下。

根据您的描述，推荐关注 LOTUS 系列的敏感振动器——采用 body-safe silicone，专门设计用于敏感肌肤。

此外，如果您想要 something more intense，强烈推荐我们店内的 bestseller 人体工学款，适合初次体验。

您还有其他具体需求吗？`,

    privacy: `了解您对隐私保护的关注！我们的店铺非常重视这一点。

具体措施包括：
✓ 専用隐私包装，外包装不显示任何商品信息
✓ 配送单上只写「書類」或「선물」
✓ 可在备注中填写要求，包装内完全中性
✓ 付款明细可设置为其他店名（如「SANUTO」等）

如有更多问题，请随时询问！`,

    support: `收到您的提问！关于您咨询的内容，我来为您解答。

的一般質問：
• 配送期間：通常3-5営業日
• 运费：700円（Orders over 5000円 包邮）
• 退货：商品到着後7日以内可（未开封）

如需更详细的帮助，请联系：
📧 contact@example.com
📞 対応時間 10:00-18:00（土日祝休）`,
  };

  return mockReplies[type] || mockReplies.support;
}
