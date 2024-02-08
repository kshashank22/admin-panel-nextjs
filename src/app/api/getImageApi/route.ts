import { readdir } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
  const imageDir = './public/images';
  try {
    const files = await readdir(imageDir);

    const imageList = files.map((fileName) => ({
      url: `/images/${fileName}`,
      name: fileName,
    }));

    return NextResponse.json({
      images: imageList,
    });
  } 
  catch (error) {
    return NextResponse.json({ 
        message : "Internal Error "
     });
  }
}