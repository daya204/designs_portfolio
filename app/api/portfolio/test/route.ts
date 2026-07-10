import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { v2 as cloudinary } from 'cloudinary'

export async function GET(request: NextRequest) {
  const results: any = {}

  // 1. Check env vars
  results.env = {
    cloudinary_name: !!process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_key: !!process.env.CLOUDINARY_API_KEY,
    cloudinary_secret: !!process.env.CLOUDINARY_API_SECRET,
    supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabase_service: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    upload_secret: !!process.env.UPLOAD_SECRET,
  }

  // 2. Test Supabase service client
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('id')
      .limit(1)
    results.supabase = error ? { error: error.message } : { ok: true, rowCount: data?.length }
  } catch (e: any) {
    results.supabase = { exception: e?.message }
  }

  // 3. Test Cloudinary config
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const config = cloudinary.config()
    results.cloudinary = { cloud_name: config.cloud_name, has_key: !!config.api_key, has_secret: !!config.api_secret }
  } catch (e: any) {
    results.cloudinary = { exception: e?.message }
  }

  return NextResponse.json(results)
}
