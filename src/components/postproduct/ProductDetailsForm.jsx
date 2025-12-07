import React, { useState, useRef } from "react";
import cameraIcon from "../../assets/camera.svg";

export default function ProductDetailsForm({
  itemTitle,
  setItemTitle,
  description,
  setDescription,
  price,
  setPrice,
  category,
  setCategory,
  itemImage,
  setItemImage,
  setItemImageFile
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const lastObjectUrl = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (lastObjectUrl.current) {
      try { URL.revokeObjectURL(lastObjectUrl.current); } catch (e) {}
      lastObjectUrl.current = null;
    }
    if (typeof setItemImageFile === "function") setItemImageFile(file);
    const url = URL.createObjectURL(file);
    lastObjectUrl.current = url;
    if (typeof setItemImage === "function") setItemImage(url);
  };
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

      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer?.files && e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        style={{
          width: "100%",
          height: 160,
          border: "1px solid #9CA3AF",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          background: isDragging ? "#EFF6FF" : "white",
          cursor: "pointer"
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: "#DBEAFE",
            borderRadius: "50%",
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={cameraIcon} alt="camera" style={{ width: 20, height: 20 }} />
        </div>
        <div style={{ fontWeight: 700 }}>Click or drag photos here</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>Max 5 photos (5MB each)</div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            pointerEvents: "none",
          }}
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file) handleFile(file);
            e.currentTarget.value = null; 
          }}
        />
      </div>

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
