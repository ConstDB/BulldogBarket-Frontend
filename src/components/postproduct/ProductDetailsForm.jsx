import React from "react";
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
  condition,
  setCondition,
  stocks,
  setStocks,
  type,
  itemImages,
  setItemImages,
  itemImageFiles,
  setItemImageFiles
}) {
  return (
    <div className="pdf-container">
      <ImageUploader
        itemImages={itemImages}
        setItemImages={setItemImages}
        itemImageFiles={itemImageFiles}
        setItemImageFiles={setItemImageFiles}
      />

      {/* ITEM NAME & PRICE */}
      <div className="pdf-row">
        <div className="pdf-row-left">
          <div className="pdf-label">
            Item Name <span style={{ color: 'red' }}>*</span>
          </div>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g., PE Uniform Size M"
            className="pdf-input"
            required
          />
        </div>

        <div className="pdf-row-right">
          <div className="pdf-label">
            Price (₱) <span style={{ color: 'red' }}>*</span>
          </div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="0.00"
            className="pdf-input-small"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* CATEGORY & CONDITION/STOCKS SIDE BY SIDE */}
      <div className="pdf-row">
        <div className="pdf-row-left">
          <div className="pdf-label">
            Category <span style={{ color: 'red' }}>*</span>
          </div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Uniform, School Supplies, Electronics"
            className="pdf-input"
            required
          />
        </div>

        <div className="pdf-row-right">
          {/* CONDITION for single type */}
          {type === "single" && (
            <>
              <div className="pdf-label">
                Condition <span style={{ color: 'red' }}>*</span>
              </div>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="pdf-input-small"
                required
              >
                <option value="Brand New">Brand New</option>
                <option value="Pre-loved">Pre-loved</option>
                <option value="Used">Used</option>
                <option value="Like New">Like New</option>
              </select>
            </>
          )}

          {/* STOCKS for bulk type */}
          {type === "bulk" && (
            <>
              <div className="pdf-label">
                Stocks Available <span style={{ color: 'red' }}>*</span>
              </div>
              <input
                type="number"
                value={stocks}
                onChange={(e) => setStocks(Number(e.target.value))}
                placeholder="1"
                className="pdf-input-small"
                min="1"
                required
              />
            </>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <div className="pdf-label">
          Description <span style={{ color: 'red' }}>*</span>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item. Where can you meet? (e.g., Garden, Library)"
          className="pdf-textarea"
          rows={5}
          required
        />
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
          Include details like condition, size, meetup location, etc.
        </div>
      </div>
    </div>
  );
}
