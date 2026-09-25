import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'public', 'images', 'cellphoneS')
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ images: [] })
    }
    const files = fs.readdirSync(dirPath)
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a)
        const numB = parseInt(b)
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB
        return a.localeCompare(b)
      })
      .map(file => `/images/cellphoneS/${file}`)

    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
