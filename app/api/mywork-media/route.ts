import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export interface MediaItem {
  url: string
  type: 'image' | 'video'
  name: string
}

export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), 'public', 'images', 'mywork')
    if (!fs.existsSync(baseDir)) {
      return NextResponse.json({ mediaByFolder: {} })
    }

    const entries = fs.readdirSync(baseDir, { withFileTypes: true })
    const mediaByFolder: Record<string, MediaItem[]> = {}

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderName = entry.name.toLowerCase().trim()
        const folderPath = path.join(baseDir, entry.name)
        let files = fs.readdirSync(folderPath)

        // If .mp4 exists, ignore raw .mov to prevent browser codec issues
        const hasMp4 = files.some(f => f.toLowerCase().endsWith('.mp4'))
        if (hasMp4) {
          files = files.filter(f => !f.toLowerCase().endsWith('.mov'))
        }

        const mediaFiles: MediaItem[] = files
          .filter(f => /\.(jpg|jpeg|png|webp|gif|svg|mov|mp4|webm)$/i.test(f))
          .sort((a, b) => {
            // Put video files first if available
            const extA = path.extname(a).toLowerCase()
            const extB = path.extname(b).toLowerCase()
            const isVidA = ['.mov', '.mp4', '.webm'].includes(extA)
            const isVidB = ['.mov', '.mp4', '.webm'].includes(extB)
            if (isVidA && !isVidB) return -1
            if (!isVidA && isVidB) return 1
            return a.localeCompare(b)
          })
          .map(file => {
            const ext = path.extname(file).toLowerCase()
            const isVideo = ['.mov', '.mp4', '.webm'].includes(ext)
            return {
              url: `/images/mywork/${entry.name}/${encodeURIComponent(file)}`,
              type: isVideo ? 'video' : 'image',
              name: file,
            }
          })

        if (mediaFiles.length > 0) {
          mediaByFolder[folderName] = mediaFiles
        }
      }
    }

    return NextResponse.json({ mediaByFolder })
  } catch {
    return NextResponse.json({ mediaByFolder: {} })
  }
}
