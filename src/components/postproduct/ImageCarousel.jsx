import React, { useState, useEffect } from "react";

export default function ImageCarousel({ itemImages = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(itemImages) || itemImages.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= itemImages.length) {
      setCurrentIndex(0);
    }
  }, [itemImages, currentIndex]);

  const mainImage = Array.isArray(itemImages) && itemImages.length > 0 ? itemImages[currentIndex] : null;

  return (
    <div style={{ width: 320, height: 170, position: "relative" }}>
      <div style={{ width: "100%", height: 150, background: mainImage ? "transparent" : "#E5E7EB", borderRadius: 10, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {mainImage && <img src={mainImage} alt="item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}

        {Array.isArray(itemImages) && itemImages.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + itemImages.length) % itemImages.length); }} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", color: "white", border: "none", width: 28, height: 28, borderRadius: 14, cursor: "pointer" }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % itemImages.length); }} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", color: "white", border: "none", width: 28, height: 28, borderRadius: 14, cursor: "pointer" }}>›</button>
          </>
        )}
      </div>

      {Array.isArray(itemImages) && itemImages.length > 1 && (
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          {itemImages.map((url, idx) => (
            <div key={idx} onClick={() => setCurrentIndex(idx)} style={{ cursor: "pointer", border: idx === currentIndex ? "2px solid #2563EB" : "1px solid #E5E7EB", width: 56, height: 40, overflow: "hidden", borderRadius: 6 }}>
              <img src={url} alt={`thumb-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
