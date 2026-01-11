import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/supabase/admin';
import sharp from 'sharp';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const QUALITY = 80;

export async function POST(request: NextRequest) {
  try {
    // Check admin access
    const adminAccess = await isAdmin();
    if (!adminAccess) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Generate unique filename (always save as webp for optimization)
    const timestamp = Date.now();
    const filename = `product-${timestamp}.webp`;

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Optimize image with sharp
    let optimizedBuffer: Buffer;

    if (file.type === 'image/gif') {
      // For GIFs, just resize without converting to preserve animation
      optimizedBuffer = await sharp(inputBuffer, { animated: true })
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toBuffer();
    } else {
      // For other formats, resize and convert to webp
      optimizedBuffer = await sharp(inputBuffer)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toBuffer();
    }

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filename, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      optimized: {
        originalSize: file.size,
        optimizedSize: optimizedBuffer.length,
        savings: Math.round((1 - optimizedBuffer.length / file.size) * 100) + '%'
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
