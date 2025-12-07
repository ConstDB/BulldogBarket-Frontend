import React, { useState, useRef } from "react";
import cameraIcon from "../../assets/camera.svg";
import ImageUploader from "./ImageUploader";

export default function ProductDetailsForm({
  itemTitle,
  setItemTitle,
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
    // Avoid nested state updates — compute additions first
    const filesArray = Array.from(newFiles);
    const existingCount = Array.isArray(itemImages) ? itemImages.length : 0;
    const available = Math.max(0, 5 - existingCount);
    const toAdd = filesArray.slice(0, available);

    if (toAdd.length === 0) return;

    const newUrls = toAdd.map((file) => URL.createObjectURL(file));

    // Append URLs and files in separate state updates
    setItemImages((prev) => {
      const updated = Array.isArray(prev) ? [...prev] : [];
      updated.push(...newUrls);
      return updated;
    });

    setItemImageFiles((prevFiles) => {
      const updatedFiles = Array.isArray(prevFiles) ? [...prevFiles] : [];
      updatedFiles.push(...toAdd);
      return updatedFiles;
    });
  };

  const removeImage = (index) => {
    setItemImages((prev) => {
      const updated = [...prev];
      // Revoke the old URL to prevent memory leak
      try {
        URL.revokeObjectURL(updated[index]);
      } catch (e) {}
      updated.splice(index, 1);
      return updated;
    });

    setItemImageFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const canAddMore = itemImages.length < 5;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        border: "1px solid #E5E7EB",
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
        width: 800,
      }}
    >

      <ImageUploader itemImages={itemImages} setItemImages={setItemImages} itemImageFiles={itemImageFiles} setItemImageFiles={setItemImageFiles} />

      {/* TITLE & PRICE */}
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        <div style={{ flex: 2 }}>
          <div style={{ fontWeight: 700 }}>Item Title</div>
          <input
            value={itemTitle}
            onChange={(e) => setItemTitle && setItemTitle(e.target.value)}
            style={{
              width: "100%",
              height: 33,
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "5px 10px",
            }}
            placeholder="e.g., PE Uniform Size M"
          />
        </div>

        <div style={{ flex: 1, marginLeft: 40 }}>
          <div style={{ fontWeight: 700 }}>Price (₱)</div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice && setPrice(Number(e.target.value))}
            style={{
              width: "90%",
              height: 33,
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "5px 10px",
            }}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* CATEGORY & CONDITION */}
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        <div style={{ flex: 2 }}>
          <div style={{ fontWeight: 700 }}>Category</div>
          <input
            value={category}
            onChange={(e) => setCategory && setCategory(e.target.value)}
            style={{
              width: "100%",
              height: 33,
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "5px 10px",
            }}
            placeholder="Uniform"
          />
        </div>

        <div style={{ flex: 1, marginLeft: 40 }}>
          <div style={{ fontWeight: 700 }}>Condition</div>
          <input
            style={{
              width: "90%",
              height: 33,
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "5px 10px",
            }}
            placeholder="Pre-loved / Used"
          />
        </div>
      </div>

      {/* MESSAGE TO SELLER */}
      <div>
        <div style={{ fontWeight: 700 }}>Message to Seller (Optional)</div>
        <textarea
          value={description}
          onChange={(e) => setDescription && setDescription(e.target.value)}
          style={{
            width: "97%",
            height: 90,
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            padding: 10,
            marginTop: 4,
          }}
          placeholder="Describe your item. Where can you meet? (e.g., Garden, Library)"
        />
      </div>
    </div>
  );
}
