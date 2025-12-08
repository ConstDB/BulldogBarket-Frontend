import React, { useState, useRef } from "react";
import "../../styles/PostProduct/productDetailsForm.css";
import ImageUploader from "./ImageUploader";

export default function ProductDetailsForm({
  itemName,
  setItemName,
  description,
  setDescription,
  price,
  setPrice,
  category,
  setCategory,
  itemImages,
  setItemImages,
  itemImageFiles,
  setItemImageFiles
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;
    const filesArray = Array.from(newFiles);
    const existingCount = itemImages.length;
    const available = Math.max(0, 5 - existingCount);
    const toAdd = filesArray.slice(0, available);
    if (toAdd.length === 0) return;

    const newUrls = toAdd.map((file) => URL.createObjectURL(file));

    setItemImages((prev) => [...prev, ...newUrls]);
    setItemImageFiles((prev) => [...prev, ...toAdd]);
  };

  const removeImage = (index) => {
    setItemImages((prev) => {
      const updated = [...prev];
      try { URL.revokeObjectURL(updated[index]); } catch {}
      updated.splice(index, 1);
      return updated;
    });
    setItemImageFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="pdf-container">
      <ImageUploader
        itemImages={itemImages}
        setItemImages={setItemImages}
        itemImageFiles={itemImageFiles}
        setItemImageFiles={setItemImageFiles}
      />

      {/* TITLE & PRICE */}
      <div className="pdf-row">
        <div className="pdf-row-left">
          <div className="pdf-label">Item Name</div>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g., PE Uniform Size M"
            className="pdf-input"
          />
        </div>

        <div className="pdf-row-right">
          <div className="pdf-label">Price (₱)</div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="0.00"
            className="pdf-input-small"
          />
        </div>
      </div>

      {/* CATEGORY & CONDITION */}
      <div className="pdf-row">
        <div className="pdf-row-left">
          <div className="pdf-label">Category</div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Uniform"
            className="pdf-input"
          />
        </div>

        <div className="pdf-row-right">
          <div className="pdf-label">Condition</div>
          <input
            placeholder="Pre-loved / Used"
            className="pdf-input-small"
          />
        </div>
      </div>

      {/* MESSAGE TO SELLER */}
      <div>
        <div className="pdf-label">Message to Seller (Optional)</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item. Where can you meet? (e.g., Garden, Library)"
          className="pdf-textarea"
        />
      </div>
    </div>
  );
}
