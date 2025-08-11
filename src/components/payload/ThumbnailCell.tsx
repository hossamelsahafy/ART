'use client'
import React, { useState, useEffect } from 'react'

interface MediaItem {
  id: string
  url: string
  filename: string
}

interface SliderImagesProps {
  name?: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  relationTo?: string
  admin?: {
    readOnly?: boolean
  }
}

const SliderImages: React.FC<SliderImagesProps> = ({
  name = '',
  value = '',
  onChange,
  relationTo = 'media',
}) => {
  const [search, setSearch] = useState('')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMedia() {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/${relationTo}?limit=1000`)
        const data = await res.json()
        setMediaItems(data.docs || data)
      } catch (error) {
        console.error('Error fetching media:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMedia()
  }, [relationTo])

  const filteredMedia = mediaItems.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase()),
  )

  const toggleSelect = (id: string) => {
    if (!onChange) return
    // Select this image, deselect others
    onChange(id === value ? '' : id)
  }

  if (isLoading) return <div>Loading images...</div>

  return (
    <div style={{ width: '100%' }}>
      <label
        htmlFor={`searchInput-${name}`}
        style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}
      >
        {label || 'Slider Images'}
      </label>

      <input
        id={`searchInput-${name}`}
        type="text"
        placeholder="Search By Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          marginBottom: 10,
          padding: 6,
          borderRadius: 4,
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          maxHeight: 400,
          overflowY: 'auto',
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 6,
          justifyItems: 'center',
          alignItems: 'center',
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #f1f1f1',
        }}
      >
        {filteredMedia.map((item) => {
          const isSelected = value === item.id
          return (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              style={{
                cursor: 'pointer',
                borderRadius: 8,
                padding: 6,
                backgroundColor: isSelected ? '#0070f3' : 'transparent',
                color: isSelected ? 'white' : 'black',
                userSelect: 'none',
                border: isSelected ? '3px solid #0070f3' : '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: isSelected ? '0 0 8px #0070f3' : 'none',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#0070f3',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 0 6px #0070f3',
                    pointerEvents: 'none',
                  }}
                >
                  ✓
                </div>
              )}
              <img
                src={item.url}
                alt={item.filename}
                style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 6,
                  filter: isSelected ? 'brightness(1)' : 'brightness(0.85)',
                  transition: 'filter 0.2s ease',
                }}
                loading="lazy"
                decoding="async"
              />
              <span
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                }}
              >
                {item.filename}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SliderImages
