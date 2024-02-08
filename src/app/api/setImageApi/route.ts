import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const email: any = req.nextUrl.searchParams.get("email") ?? "email"
    const data = await req.formData();
    const file: any = data.get('file');

    if (file) {
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const newPath = `./public/images/${email}.jpg`;
        await writeFile(newPath, buffer);

        return NextResponse.json({
            message: "okay"
        });
    }
}