export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') || 'World'

  return new Response(JSON.stringify({ message: `Hello, PEDRIO!` }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
