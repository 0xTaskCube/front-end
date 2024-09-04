import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const event = await req.json();

    // 模拟异步操作
    await new Promise((resolve) => resolve(true));

    // 处理接收到的事件，例如保存到数据库
    console.log('Received Webhook event:', event);

    // 根据事件类型和内容更新数据库或执行其他操作
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

