import { createServiceClient } from '@/lib/supabase/server'
// Service client uses direct supabase-js (no cookies needed for API routes)
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request: NextRequest) {
  try {
    const secret = request.headers.get('x-upload-secret')
    if (!secret || secret !== process.env.UPLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageId, imageUrl } = await request.json()
    if (!imageId) {
      return NextResponse.json({ error: 'Missing imageId' }, { status: 400 })
    }

    // Delete from Cloudinary by extracting public_id from URL
    if (imageUrl) {
      try {
        const urlParts = imageUrl.split('/')
        const fileWithExt = urlParts[urlParts.length - 1]
        const folder = urlParts[urlParts.length - 2]
        const parentFolder = urlParts[urlParts.length - 3]
        const publicId = `${parentFolder}/${folder}/${fileWithExt.split('.')[0]}`
        await cloudinary.uploader.destroy(publicId)
      } catch (e) {
        console.warn('Cloudinary delete failed (continuing):', e)
      }
    }

    // Delete from Supabase
    const supabase = createServiceClient()
    const { error } = await supabase.from('portfolio_images').delete().eq('id', imageId)

    if (error) {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
