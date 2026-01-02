import React, { useState } from "react";
import ListingTypeSelector from "../components/postproduct/ListingTypeSelector";
import LivePreview from "../components/postproduct/LivePreview";
import PostButton from "../components/postproduct/PostButton";
import ProductDetailsForm from "../components/postproduct/ProductDetailsForm";

export default function PostProduct() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("Pre-loved");
  const [type, setType] = useState("single");
  const [stocks, setStocks] = useState(1);
  const [itemImages, setItemImages] = useState([]);
  const [itemImageFiles, setItemImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Get logged-in user info from localStorage
  let currentUser = { name: "You", avatar: "https://placehold.co/40x40" };
  const possibleKeys = ["user", "userData", "currentUser", "authUser"];
  for (const key of possibleKeys) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Combine first and last name if available
        const firstName = parsed.firstName || parsed.name || "";
        const lastName = parsed.lastName || "";
        currentUser.name = `${firstName} ${lastName}`.trim() || "You";
        currentUser.name += " (You)"; // append (You)
        currentUser.avatar = parsed.avatarUrl || parsed.avatar || "https://placehold.co/40x40";
        break;
      } catch (e) {
        console.log(`Failed to parse ${key}:`, e);
      }
    }
  }

  const validateCloudinaryConfig = () => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error(
        "Cloudinary configuration missing. Please check your environment variables."
      );
    }
  };

  const uploadImagesToCloudinary = async (files) => {
    validateCloudinaryConfig();
    const uploadPromises = files.map(async (file, index) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "marketplace_products");
      formData.append("tags", `product,${category || "uncategorized"}`);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData?.error?.message || "Failed to upload image to Cloudinary"
          );
        }
        const data = await response.json();
        setUploadProgress(Math.round(((index + 1) / files.length) * 100));
        return { url: data.secure_url, publicId: data.public_id, format: data.format };
      } catch (error) {
        console.error(`Failed to upload image ${index + 1}:`, error);
        throw error;
      }
    });
    return await Promise.all(uploadPromises);
  };

  const handlePost = async () => {
    setError(null);
    setUploadProgress(0);

    const validationErrors = [];
    if (!itemName.trim()) validationErrors.push("Item name is required");
    if (!description.trim()) validationErrors.push("Description is required");
    if (price <= 0) validationErrors.push("Price must be greater than 0");
    if (!category.trim()) validationErrors.push("Category is required");
    if (itemImageFiles.length === 0) validationErrors.push("At least one image is required");
    if (type === "bulk" && stocks < 1) validationErrors.push("Stocks must be at least 1");

    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to post a product");
      return;
    }

    try {
      setLoading(true);

      const uploadedImages = await uploadImagesToCloudinary(itemImageFiles);
      const imageUrls = uploadedImages.map((img) => img.url);

      // Build product data conditionally
      let productData = {
        name: itemName,
        images: imageUrls,
        price: Number(price),
        category,
        description,
        type,
      };

      if (type === "single") productData.condition = condition;
      if (type === "bulk") productData.stocks = Number(stocks);

      const res = await fetch(`${API_BASE}/api/v1/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || `Error: ${res.status}`);
      }

      await res.json();

      // Reset form
      setItemName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setCondition("Pre-loved");
      setType("single");
      setStocks(1);
      setItemImages([]);
      setItemImageFiles([]);
      setUploadProgress(0);

      alert("Product created successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
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
          <ListingTypeSelector type={type} setType={setType} />

          <ProductDetailsForm
            itemName={itemName}
            setItemName={setItemName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            condition={condition}
            setCondition={setCondition}
            stocks={stocks}
            setStocks={setStocks}
            type={type}
            itemImages={itemImages}
            setItemImages={setItemImages}
            itemImageFiles={itemImageFiles}
            setItemImageFiles={setItemImageFiles}
          />

          <div>
            {error && <div className="error-message">{error}</div>}

            {loading && uploadProgress > 0 && (
              <div className="upload-progress">
                <div className="upload-progress-text">
                  Uploading images... {uploadProgress}%
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <PostButton onClick={handlePost} disabled={loading} />

            {loading && (
              <div className="loading-message">
                {uploadProgress === 100
                  ? "Creating product..."
                  : "Processing images..."}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Live Preview</div>
          <LivePreview
            userName={currentUser.name}
            avatarUrl={currentUser.avatar}
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
