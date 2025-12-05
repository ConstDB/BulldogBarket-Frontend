import React, { useState } from "react";
import HeaderBar from "../components/postproduct/HeaderBar";
import ListingTypeSelector from "../components/postproduct/ListingTypeSelector";
import ImageUploader from "../components/postproduct/ImageUploader";
import LivePreview from "../components/postproduct/LivePreview";
import PostButton from "../components/postproduct/PostButton";
import ProductDetailsForm from "../components/postproduct/ProductDetailsForm";

export default function PostProduct() {
  const [itemTitle, setItemTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Pre-loved");
  const [itemImage, setItemImage] = useState(null);

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
      <HeaderBar />

      {/* Centered content container */}
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
        {/* Form + Listing Type Section */}
        <div style={{ maxWidth: 800, flex: 1 }}>
          <ListingTypeSelector />
          <ImageUploader setItemImage={setItemImage} />
          <ProductDetailsForm
            itemTitle={itemTitle}
            setItemTitle={setItemTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
          />
          <PostButton />
        </div>

        {/* Live Preview beside the form */}
        <LivePreview
          itemTitle={itemTitle}
          description={description}
          price={price}
          category={category}
          itemImage={itemImage}
        />
      </div>
    </div>
  );
}
