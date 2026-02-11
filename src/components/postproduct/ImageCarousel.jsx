import React, { useState, useEffect } from "react";
import "../../styles/PostProduct/imageCarousel.css";

export default function ImageCarousel({ itemImages = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(itemImages) || itemImages.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= itemImages.length) {
      setCurrentIndex(0);
    }
  }, [itemImages, currentIndex]);

  const mainImage = itemImages[currentIndex] || null;

  return (
    <div className="image-carousel">
      <div className="image-carousel-main" style={{ background: mainImage ? "transparent" : undefined }}>
        {mainImage && <img src={mainImage} alt="item" />}

        {itemImages.length > 1 && (
          <>
            <button
              className="image-carousel-btn image-carousel-btn-left"
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + itemImages.length) % itemImages.length); }}
            >
              ‹
            </button>
            <button
              className="image-carousel-btn image-carousel-btn-right"
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % itemImages.length); }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {itemImages.length > 1 && (
        <div className="image-carousel-thumbs">
          {itemImages.map((url, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`image-carousel-thumb ${idx === currentIndex ? "selected" : ""}`}
            >
              <img src={url} alt={`thumb-${idx}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
