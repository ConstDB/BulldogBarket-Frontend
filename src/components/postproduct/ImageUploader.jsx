import React, { useRef, useState } from "react";
import cameraIcon from "../../assets/camera.svg";

export default function ImageUploader({ itemImages = [], setItemImages, itemImageFiles = [], setItemImageFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;

    const filesArray = Array.from(newFiles);
    const existingCount = Array.isArray(itemImages) ? itemImages.length : 0;
    const available = Math.max(0, 5 - existingCount);
    const toAdd = filesArray.slice(0, available);
    if (toAdd.length === 0) return;

    const newUrls = toAdd.map((file) => URL.createObjectURL(file));

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
      try { URL.revokeObjectURL(updated[index]); } catch (e) {}
      updated.splice(index, 1);
      return updated;
    });
    setItemImageFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const canAddMore = (Array.isArray(itemImages) ? itemImages.length : 0) < 5;

  return (
    <div>
      {canAddMore && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const files = e.dataTransfer?.files; if (files) handleFiles(files); }}
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
          <div style={{ width: 36, height: 36, background: "#DBEAFE", borderRadius: "50%", marginTop: 10, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={cameraIcon} alt="camera" style={{ width: 20, height: 20 }} />
          </div>
          <div style={{ fontWeight: 700 }}>Click or drag photos here</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>Max 5 photos (5MB each) - {itemImages.length}/5 uploaded</div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", opacity: 0, pointerEvents: "none" }}
            onChange={(e) => { const files = e.target.files; if (files) handleFiles(files); e.currentTarget.value = null; }}
          />
        </div>
      )}

      {itemImages.length > 0 && (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Uploaded Images ({itemImages.length}/5)</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {itemImages.map((imageUrl, index) => (
              <div key={index} style={{ position: "relative", width: 100, height: 100, borderRadius: 8, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                <img src={imageUrl} alt={`preview-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => removeImage(index)} style={{ position: "absolute", top: 4, right: 4, width: 24, height: 24, borderRadius: "50%", background: "rgba(0, 0, 0, 0.6)", color: "white", border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
