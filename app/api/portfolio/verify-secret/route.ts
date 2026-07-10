import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { secret } = await request.json()
  if (secret && secret === process.env.UPLOAD_SECRET) {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
}
