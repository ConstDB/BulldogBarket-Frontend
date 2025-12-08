import { useRef, useState } from "react";
import "../../styles/UserProfileEdit/UserBanner.css";
import CameraIcon from "../../assets/cameraicon.svg";
import ProfileImage from "../../assets/profile.png";
import VerifiedIcon from "../../assets/verified.svg";

function UserBanner({
  fullName = "Rick Prime",
  course = "BSCS",
  year = "3rd Year",
  school = "NU Manila",
  isVerified = true,
  soldCount = 0,
  rating = 4.9,
  buyingCount = 3,
  profileImage = ProfileImage,
  onImageUpload,
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [currentImage, setCurrentImage] = useState(profileImage);

  const handleCameraClick = () => fileInputRef.current.click();
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      if (onImageUpload && typeof onImageUpload === "function") {
        // parent-provided handler
        await onImageUpload(file);
      } else {
        // default fallback: upload to backend
        const formData = new FormData();
        formData.append("avatar", file);

        const res = await fetch("/api/profile/avatar", {
          method: "POST",
          body: formData,
          // Note: auth headers should be added by parent or interceptor
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Upload failed: ${res.status}`);
        }

        const data = await res.json();
        // Assume backend returns { url: "..." }
        if (data.url) setCurrentImage(data.url);
      }
    } catch (err) {
      setUploadError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="ub-container">
      <div className="ub-banner" />

      <div className="ub-content">
        <div className="ub-left">
          <div className="ub-profile-wrapper" style={{ position: "relative" }}>
            <img src={currentImage} alt="Profile" className="ub-profile-img" />

            <img
              src={CameraIcon}
              alt="Camera"
              className="ub-camera-btn"
              onClick={handleCameraClick}
              style={{ opacity: uploading ? 0.5 : 1, cursor: uploading ? "not-allowed" : "pointer" }}
            />
            
            {uploading && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
              }}
              >
                Uploading...
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div>
            <div className="ub-name-row">
              {fullName} (You)
              {isVerified && (
                <span className="ub-verified-badge">
                  <img src={VerifiedIcon} alt="Verified" className="ub-verified-icon" />
                  Verified Student
                </span>
              )}
            </div>

            <div className="ub-subtext">
              {course} • {year} • {school}
            </div>

            {uploadError && (
              <div style={{ color: "#DC2626", fontSize: "12px", marginTop: "6px" }}>
                {uploadError}
              </div>
            )}
          </div>
        </div>

        <div className="ub-stats">
          <div className="ub-stat">
            <div className="ub-stat-value">{soldCount}</div>
            <div className="ub-stat-label">SOLD</div>
          </div>

          <div className="ub-stat">
            <div className="ub-stat-value">{rating}</div>
            <div className="ub-stat-label">RATING</div>
          </div>

          <div className="ub-stat">
            <div className="ub-stat-value">{buyingCount}</div>
            <div className="ub-stat-label">BUYING</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBanner;
