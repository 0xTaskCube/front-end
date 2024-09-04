import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const event = req.body;

    // 模拟异步操作
    await new Promise((resolve) => resolve(true));
    
    // 处理接收到的事件，例如保存到数据库
    console.log('Received Webhook event:', event);
    
    // 根据事件类型和内容更新数据库或执行其他操作
    res.status(200).json({ received: true });
  } else {
    res.status(405).end(); // 只允许 POST 请求
  }
}
