export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // extract the [id] part

  // You can now use `id` to fetch or process data dynamically
  const data = {
    id,
    nganyaName: 'Baba Yaga',
    phoneNumber: '0700123456',
    imageData: '/images/baba-yaga.jpg',
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
