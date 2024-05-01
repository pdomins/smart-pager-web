import { put, del, head } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return new NextResponse('Filename not provided', { status: 400 })
  }

  if (!request.body) {
    return new NextResponse('Request body is missing', { status: 400 })
  }

  const contentLength = request.headers.get('Content-Length')

  let maxSize = 1 * 1024 * 1024

  if (filename.endsWith('.pdf')) {
    maxSize = 5 * 1024 * 1024 // Extended limit for PDF files
  }

  if (contentLength && parseInt(contentLength) > maxSize) {
    return new NextResponse(
      `File size exceeds ${maxSize / 1024 / 1024}MB limit`,
      { status: 400 }
    )
  }

  const blob = await put(filename, request.body, {
    access: 'public',
    cacheControlMaxAge: 0,
  })

  return new NextResponse(JSON.stringify(blob), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const urlToDelete = searchParams.get('url') as string
  const blob = await del(urlToDelete)

  return new NextResponse(JSON.stringify(blob), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const blobUrl = searchParams.get('url') as string
  const blobDetails = await head(blobUrl)

  return Response.json(blobDetails)
}
