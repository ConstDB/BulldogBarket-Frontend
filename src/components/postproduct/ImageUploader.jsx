import React, { useRef, useState } from "react";
import cameraIcon from "../../assets/camera.svg";
import "../../styles/PostProduct/ImageUploader.css";

export default function ImageUploader({ itemImages = [], setItemImages, itemImageFiles = [], setItemImageFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;
    const filesArray = Array.from(newFiles);
    const existingCount = itemImages.length;
    const available = Math.max(0, 5 - existingCount);
    const toAdd = filesArray.slice(0, available);
    if (!toAdd.length) return;

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

  const canAddMore = itemImages.length < 5;

  return (
    <div>
      {canAddMore && (
        <div
          className={`image-uploader-dropzone ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <div className="image-uploader-camera">
            <img src={cameraIcon} alt="camera" />
          </div>
          <div className="image-uploader-text">Click or drag photos here</div>
          <div className="image-uploader-subtext">
            Max 5 photos (5MB each) - {itemImages.length}/5 uploaded
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="image-uploader-input"
            onChange={(e) => { handleFiles(e.target.files); e.currentTarget.value = null; }}
          />
        </div>
      )}

      {itemImages.length > 0 && (
        <div className="image-uploader-preview-container">
          <div className="image-uploader-preview-title">
            Uploaded Images ({itemImages.length}/5)
          </div>
          <div className="image-uploader-preview-grid">
            {itemImages.map((url, index) => (
              <div key={index} className="image-uploader-preview-item">
                <img src={url} alt={`preview-${index}`} />
                <button
                  className="image-uploader-preview-remove"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
