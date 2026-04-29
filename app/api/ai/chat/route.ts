import { NextRequest, NextResponse } from 'next/server';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-cp-z0pQ-l2ZgtqB1hC1VWHeJxZb7dB-M2RvWIWkdG3Be5Gq9mrv8EWbHMnB1NTedYZzX7M8ZmVTTeasNgDMQCuWLcd3KMpCqeXk-k4CxlN72Si2leILToqbHME';
const MINIMAX_API_URL = 'https://api.minimaxi.com/anthropic/v1/messages';

const SYSTEM_PROMPTS = {
  quiz: `你是日本成人用品EC网站的AI选品助手。
客户需求に合わせて、最適な商品を見つけてください。
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
      return NextResponse.json({ reply: 'メッセージが空です' }, { status: 400 });
    }

    const validTypes = ['quiz', 'privacy', 'support'];
    const aiType = validTypes.includes(type) ? type : 'support';

    // Build messages (Anthropic format)
    const messages: { role: 'user'; content: string }[] = [
      { role: 'user', content: SYSTEM_PROMPTS[aiType as keyof typeof SYSTEM_PROMPTS] },
    ];

    // Add history
    for (const h of history.slice(-20)) {
      messages.push({
        role: 'user',
        content: (h.sender === 'user' ? '客户: ' : 'AI: ') + h.content,
      });
    }

    messages.push({ role: 'user', content: message });

    // Call MiniMax API
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
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract text from content blocks
    let reply = '';
    if (data.content && Array.isArray(data.content)) {
      const textBlock = data.content.find((b: { type: string }) => b.type === 'text');
      reply = textBlock?.text || '';
    }

    if (!reply) {
      throw new Error('No reply in API response');
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      reply: '申し訳ありません。一時的なエラーが発生しました。しばらく経ってから再度お試しください。',
    });
  }
}
