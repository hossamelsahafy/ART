'use client'
import React, { useState, useEffect } from 'react';

const SliderImages = ({ value = [], onChange }) => {
  const [search, setSearch] = useState('');
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    async function fetchMedia() {
      const res = await fetch('/api/media?limit=1000');
      const json = await res.json();
      setMediaItems(json.docs || json);
    }
    fetchMedia();
  }, []);

  const filteredMedia = mediaItems.filter(item =>
    item.filename.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    if (value.includes(id)) {
      onChange(value.filter(i => i !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <label
        htmlFor="searchInput"
        style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}
      >
        Slider Images
      </label>

      <input
        id="searchInput"
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
        }}
      >
        {filteredMedia.map(item => (
          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            style={{
              cursor: 'pointer',
              borderRadius: 8,
              padding: 6,
              backgroundColor: value.includes(item.id) ? '#0070f3' : 'transparent',
              color: value.includes(item.id) ? 'white' : 'black',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: value.includes(item.id) ? '0 0 8px #0070f3' : 'none',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <img
              src={item.url}
              alt={item.filename}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 6,
                filter: value.includes(item.id) ? 'brightness(1)' : 'brightness(0.85)',
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
        ))}
      </div>
    </div>
  );
};

export default SliderImages;
