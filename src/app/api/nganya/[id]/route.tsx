export async function GET(request: Request, { params }: { params: { id: string } }) {
  const data = {
    nganyaName: 'Baba Yaga',
    phoneNumber: '0700123456',
    imageData: '/images/baba-yaga.jpg', // or base64 image data
  };

  return new Response(JSON.stringify(data), { status: 200 });
}
