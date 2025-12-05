import React from "react";

export default function ProductDetailsForm() {
  return (
    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 15 }}>
      <div>
        <div style={{ fontWeight: 700 }}>Item Title</div>
        <input style={{ width: 450, height: 33, borderRadius: 10, border: "1px solid #E5E7EB", padding: "5px 10px" }} placeholder="e.g., PE Uniform Size M" />
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>Price (₱)</div>
        <input style={{ width: 200, height: 33, borderRadius: 10, border: "1px solid #E5E7EB", padding: "5px 10px" }} placeholder="0.00" />
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>Category</div>
        <input style={{ width: 360, height: 33, borderRadius: 10, border: "1px solid #E5E7EB", padding: "5px 10px" }} placeholder="Uniform" />
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>Condition</div>
        <input style={{ width: 280, height: 33, borderRadius: 10, border: "1px solid #E5E7EB", padding: "5px 10px" }} placeholder="Pre-loved / Used" />
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>Message to Seller (Optional)</div>
        <textarea style={{ width: 660, height: 90, borderRadius: 10, border: "1px solid #E5E7EB", padding: 10 }} placeholder="Describe your item. Where can you meet? (e.g., Garden, Library)" />
      </div>
    </div>
  );
}
