// 'use client'
// import React, { useState, useEffect } from 'react'

// interface MediaItem {
//   id: string
//   url: string
//   filename: string
// }

// interface SliderImagesProps {
//   name?: string
//   label?: string
//   value?: string[] | string | null
//   onChange?: (value: string[] | string | null) => void
//   relationTo?: string
//   hasMany?: boolean
// }

// const SliderImages: React.FC<SliderImagesProps> = ({
//   name = '',
//   label = 'Slider Images',
//   value,
//   onChange,
//   relationTo = 'media',
//   hasMany = true,
// }) => {
//   const [search, setSearch] = useState('')
//   const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedIds, setSelectedIds] = useState<string[]>([])
//   const [activeImageId, setActiveImageId] = useState<string | null>(null)

//   const handleClick = (id: string) => {
//     let newSelectedIds: string[] = []

//     if (hasMany) {
//       if (selectedIds.includes(id)) {
//         newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id)
//       } else {
//         newSelectedIds = [...selectedIds, id]
//       }
//     } else {
//       if (selectedIds.includes(id)) {
//         newSelectedIds = []
//       } else {
//         newSelectedIds = [id]
//       }
//     }

//     setSelectedIds(newSelectedIds)
//   }

//   useEffect(() => {
//     if (onChange) {
//       if (hasMany) {
//         onChange(selectedIds)
//       } else {
//         onChange(selectedIds.length > 0 ? selectedIds[0] : null)
//       }
//     }
//   }, [selectedIds])

//   useEffect(() => {
//     async function fetchMedia() {
//       try {
//         setIsLoading(true)
//         const res = await fetch(`/api/${relationTo}?limit=1000`)
//         const data = await res.json()
//         const items: MediaItem[] = data.docs || data
//         console.log(items)

//         setMediaItems(items)
//       } catch (error) {
//         console.error('Error fetching media:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchMedia()
//   }, [relationTo])

//   useEffect(() => {
//     if (value) {
//       if (Array.isArray(value)) {
//         setSelectedIds(value.filter((v) => typeof v === 'string'))
//       } else if (typeof value === 'string') {
//         setSelectedIds([value])
//       } else {
//         setSelectedIds([])
//       }
//     } else {
//       setSelectedIds([])
//     }
//   }, [value])

//   const filteredMedia = mediaItems.filter((item) =>
//     item.filename.toLowerCase().includes(search.toLowerCase()),
//   )

//   const selectedIdsStr = selectedIds.map((id) => String(id)) // التحويل هنا

//   if (isLoading) {
//     return <div>Loading images...</div>
//   }

//   return (
//     <div style={{ width: '100%' }}>
//       <label
//         htmlFor={`searchInput-${name}`}
//         style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}
//       >
//         {label}
//       </label>

//       <input
//         id={`searchInput-${name}`}
//         type="text"
//         placeholder="Search By Name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{
//           width: '100%',
//           marginBottom: 10,
//           padding: 6,
//           borderRadius: 4,
//           border: '1px solid #ccc',
//           boxSizing: 'border-box',
//         }}
//       />

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(4, 1fr)',
//           gap: 16,
//           maxHeight: 400,
//           overflowY: 'auto',
//           padding: 10,
//           border: '1px solid #ccc',
//           borderRadius: 6,
//         }}
//       >
//         {mediaItems.map((item) => {
//           const isSelected = selectedIdsStr.includes(String(item.id))
//           return (
//             <div
//               key={item.id}
//               style={{
//                 cursor: 'pointer',
//                 borderRadius: 8,
//                 padding: 6,
//                 border: '1px solid #ccc',
//                 boxShadow: isSelected ? '0 0 8px #0070f3' : 'none',
//                 transform: isSelected ? 'scale(1.02)' : 'scale(1)',
//                 transition: 'all 0.2s ease',
//                 position: 'relative',
//               }}
//               onClick={() => {
//                 ;(handleClick(item.id), console.log(item.id))
//               }}
//             >
//               <img
//                 src={item.url}
//                 alt={item.filename}
//                 style={{
//                   width: '100%',
//                   height: 120,
//                   objectFit: 'cover',
//                   borderRadius: 4,
//                   marginBottom: 6,
//                   filter: isSelected ? 'brightness(1)' : 'brightness(0.9)',
//                 }}
//               />
//               <div style={{ fontSize: 12, textAlign: 'center' }}>{item.filename}</div>
//               {isSelected && (
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     backgroundColor: '#0070f3',
//                     color: 'white',
//                     borderRadius: '50%',
//                     width: 20,
//                     height: 20,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: 12,
//                   }}
//                 >
//                   ✓
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default SliderImages

'use client'
import React, { useState, useEffect } from 'react'

interface MediaItem {
  id: string
  url: string
  filename: string
}

interface SliderImagesProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

const SliderImages: React.FC<SliderImagesProps> = ({ value = [], onChange }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>(value)

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('/api/media?limit=1000')
        const data = await res.json()
        const items: MediaItem[] = data.docs || []
        setMediaItems(items)
      } catch (e) {
        console.error('Failed to fetch media', e)
      }
    }
    fetchMedia()
  }, [])

  const toggleSelect = (id: string) => {
    let newSelected: string[] = []
    if (selectedIds.includes(id)) {
      newSelected = selectedIds.filter((sid) => sid !== id)
    } else {
      newSelected = [...selectedIds, id]
    }
    setSelectedIds(newSelected)
    onChange?.(newSelected)
  }

  return (
    <div>
      <h3>Choose Image</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 12,
        }}
      >
        {mediaItems.map((item) => {
          const isSelected = selectedIds.includes(item.id)
          return (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              style={{
                border: isSelected ? '3px solid #0070f3' : '1px solid #ccc',
                borderRadius: 6,
                cursor: 'pointer',
                overflow: 'hidden',
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              <img
                src={item.url}
                alt={item.filename}
                style={{ width: '100%', height: 100, objectFit: 'cover' }}
              />
              <div
                style={{
                  padding: 4,
                  fontSize: 12,
                  backgroundColor: isSelected ? '#e6f0ff' : 'transparent',
                }}
              >
                {item.filename}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SliderImages
