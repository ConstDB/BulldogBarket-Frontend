import React, { useState } from "react";
import ListingTypeSelector from "../components/postproduct/ListingTypeSelector";
import LivePreview from "../components/postproduct/LivePreview";
import PostButton from "../components/postproduct/PostButton";
import ProductDetailsForm from "../components/postproduct/ProductDetailsForm";
import { validateListing } from "../schemas/product_schema";

export default function PostProduct() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Pre-loved");
  const [itemImages, setItemImages] = useState([]);
  const [itemImageFiles, setItemImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "";

  const handlePost = async () => {
    setError(null);
    
    // Use the validation schema
    const formData = {
      title: itemName,
      description,
      price,
      category,
      itemImageFile: itemImageFiles[0] // At least one image required
    };
    
    const validationErrors = validateListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    const form = new FormData();
    form.append("title", itemName);
    form.append("description", description);
    form.append("price", String(price));
    form.append("category", category);
    // Append all images
    itemImageFiles.forEach((file, index) => {
      form.append(`images`, file);
    });

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/listings`, {
        method: "POST",
        // when sending FormData, do NOT set Content-Type; browser will set boundary
        body: form,
        // credentials: 'include' // enable if backend uses cookies
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || "Failed to create listing");
        return;
      }
      // on success, reset form or navigate
      // simple reset:
      setItemName("");
      setDescription("");
      setPrice(0);
      setCategory("Pre-loved");
      setItemImages([]);
      setItemImageFiles([]);
      // you might want to navigate to the newly created listing page
      alert("Listing created");
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
      }}
    >


      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: 40,
          width: "100%",
          boxSizing: "border-box",
        }}
      >

        <div style={{ maxWidth: 1080, flex: 1 }}>
          <ListingTypeSelector />

          <ProductDetailsForm
            itemName={itemName}
            setItemName={setItemName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            itemImages={itemImages}
            setItemImages={setItemImages}
            itemImageFiles={itemImageFiles}
            setItemImageFiles={setItemImageFiles}
          />

          <div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <PostButton onClick={handlePost} />
            {loading && <div style={{ marginTop: 8 }}>Posting…</div>}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Live Preview</div>
          <LivePreview
            itemName={itemName}
            description={description}
            price={price}
            category={category}
            itemImages={itemImages}
          />
        </div>
      </div>
    </div>
  );
}
