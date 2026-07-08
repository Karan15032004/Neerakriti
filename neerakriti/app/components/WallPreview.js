'use client';
// 👆 Client Component — needs useState, useRef, file uploads, and mouse/touch events.
// None of this can run on the server.

import { useState, useRef, useEffect } from 'react';

export default function WallPreview({ productImage, productName }) {
  // productImage = "/images/jharokha.jpg" (passed from product detail page)
  // productName  = "Jharokha Wall Panel" (for alt text)

  // ── State ──
  const [wallPhoto, setWallPhoto] = useState(null);   // uploaded wall photo as data URL
  const [productSize, setProductSize] = useState(150); // overlay width in pixels
  const [position, setPosition] = useState({ x: 100, y: 100 }); // overlay position
  const [dragging, setDragging] = useState(false);     // true while dragging
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // mouse offset from top-left

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // ── Handle wall photo upload ──
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // FileReader converts the image file into a data URL string
    // so we can display it directly in an <img> tag
    reader.onload = (event) => {
      setWallPhoto(event.target.result);
      // Reset product position to center when new wall photo is uploaded
      setPosition({ x: 100, y: 100 });
    };
    reader.readAsDataURL(file);
  };

  // ── Mouse/touch drag handlers ──
  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    // Remember where inside the product image the user clicked
    // so dragging feels natural (doesn't jump to top-left corner)
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerMove = (e) => {
    if (!dragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    // Calculate new position relative to the container
    setPosition({
      x: e.clientX - containerRect.left - dragOffset.x,
      y: e.clientY - containerRect.top - dragOffset.y,
    });
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // ── Draw to canvas for download ──
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const wallImg = new Image();
    wallImg.src = wallPhoto;

    wallImg.onload = () => {
      // Set canvas size to match wall photo
      canvas.width = wallImg.width;
      canvas.height = wallImg.height;
      ctx.drawImage(wallImg, 0, 0);

      // Calculate scale factor between displayed size and actual image size
      const container = containerRef.current;
      const scaleX = wallImg.width / container.offsetWidth;
      const scaleY = wallImg.height / container.offsetHeight;

      // Draw product overlay at the correct scaled position
      const prodImg = new Image();
      prodImg.src = productImage;
      prodImg.onload = () => {
        const scaledWidth = productSize * scaleX;
        const scaledHeight = (productSize * (prodImg.height / prodImg.width)) * scaleY;
        ctx.drawImage(
          prodImg,
          position.x * scaleX,
          position.y * scaleY,
          scaledWidth,
          scaledHeight
        );

        // Trigger download
        const link = document.createElement('a');
        link.download = `neerakriti-wall-preview.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
    };
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        borderTop: '1px solid var(--border)',
        paddingTop: '2rem',
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem',
          color: 'var(--ink)',
          marginBottom: '0.5rem',
        }}
      >
        Preview on Your Wall
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          color: 'var(--ink)',
          opacity: 0.7,
          marginBottom: '1rem',
        }}
      >
        Upload a photo of your wall, then drag and resize the art to see how it looks.
      </p>

      {/* ── Upload button ── */}
      <label
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          backgroundColor: 'var(--ink)',
          color: 'var(--bg)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          marginBottom: '1rem',
        }}
      >
        Upload Wall Photo
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
          // 👆 Hidden file input — the <label> wrapping it acts as the visible button.
          // Clicking the label triggers the file picker automatically.
        />
      </label>

      {/* ── Preview area (only shown after upload) ── */}
      {wallPhoto && (
        <>
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '700px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid var(--border)',
              cursor: dragging ? 'grabbing' : 'default',
              // 👆 Prevent text selection while dragging
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {/* Wall photo as background */}
            <img
              src={wallPhoto}
              alt="Your wall"
              style={{ width: '100%', display: 'block' }}
            />

            {/* Product overlay — draggable */}
            <img
              src={productImage}
              alt={productName}
              onPointerDown={handlePointerDown}
              style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${productSize}px`,
                cursor: dragging ? 'grabbing' : 'grab',
                borderRadius: '4px',
                // Subtle shadow to make the product "pop" against the wall
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                touchAction: 'none',
              }}
            />
          </div>

          {/* ── Size slider ── */}
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '700px',
            }}
          >
            <label
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
              }}
            >
              Resize:
            </label>
            <input
              type="range"
              min="50"
              max="400"
              value={productSize}
              onChange={(e) => setProductSize(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: 'var(--ink)',
                opacity: 0.6,
              }}
            >
              {productSize}px
            </span>
          </div>

          {/* ── Download button ── */}
          <button
            onClick={handleDownload}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
            }}
          >
            Download Preview
          </button>
        </>
      )}

      {/* Hidden canvas used only for generating the downloadable image */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}