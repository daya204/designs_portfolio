import { createServiceClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    // Check upload secret
    const secret = request.headers.get('x-upload-secret')
    if (!secret || secret !== process.env.UPLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const categoryId = formData.get('categoryId') as string
    const title = formData.get('title') as string

    if (!file || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Convert file to buffer for Cloudinary
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    let imageUrl: string
    try {
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `portfolio`,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        uploadStream.end(buffer)
      })
      imageUrl = uploadResult.secure_url
    } catch (cloudinaryError: any) {
      console.error('Cloudinary upload error:', cloudinaryError)
      return NextResponse.json(
        { error: `Cloudinary error: ${cloudinaryError?.message || cloudinaryError}` },
        { status: 500 },
      )
    }

    // Save to Supabase using service role
    let imageData
    try {
      const supabase = createServiceClient()
      const { data, error: dbError } = await supabase
        .from('portfolio_images')
        .insert({
          category_id: categoryId,
          image_url: imageUrl,
          title: title || null,
          description: null,
        })
        .select()
        .single()

      if (dbError) {
        console.error('Supabase insert error:', dbError)
        return NextResponse.json(
          { error: `Database error: ${dbError.message}` },
          { status: 500 },
        )
      }
      imageData = data
    } catch (dbException: any) {
      console.error('Supabase exception:', dbException)
      return NextResponse.json(
        { error: `Database exception: ${dbException?.message || dbException}` },
        { status: 500 },
      )
    }

    return NextResponse.json({ image: imageData }, { status: 201 })
  } catch (error: any) {
    console.error('Upload route error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 },
    )
  }
}
