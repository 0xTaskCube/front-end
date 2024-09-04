import { sendPostRequest } from '@/lib/utils/okxApiHelper';

export async function POST(): Promise<Response> {
  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    return new Response(JSON.stringify({ error: 'Missing Webhook URL' }), { status: 500 });
  }

  const params = [
    {
      chainIndex: '1',
      url: webhookUrl,
      type: 'transaction',
    },
  ];

  try {
    const response = await sendPostRequest('/api/v5/wallet/webhook/subscribe', params);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Request error: ${errorMessage}`);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
