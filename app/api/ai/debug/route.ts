import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasKey: !!process.env.MINIMAX_API_KEY,
        keyLength: (process.env.MINIMAX_API_KEY || '').length,
        keyPrefix: (process.env.MINIMAX_API_KEY || '').substring(0, 10),
    });
}
