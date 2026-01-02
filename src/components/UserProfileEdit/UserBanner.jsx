import { useRef, useState } from "react";
import "../../styles/UserProfileEdit/UserBanner.css";
import CameraIcon from "../../assets/cameraicon.svg";
import ProfileImage from "../../assets/profile.png";
import VerifiedIcon from "../../assets/verified.svg";

function UserBanner({ user }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Add safety check - return loading state if user is not available
  if (!user) {
    return (
      <div className="ub-container">
        <div className="ub-banner" />
        <div className="ub-content">
          <div className="ub-left">
            <div className="ub-profile-wrapper">
              <img src={ProfileImage} alt="Profile" className="ub-profile-img" />
            </div>
            <div>
              <div className="ub-name-row">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCameraClick = () => fileInputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed: ${res.status}`);
      }
    } catch (err) {
      setUploadError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="ub-container">
      <div className="ub-banner" />

      <div className="ub-content">
        <div className="ub-left">
          <div className="ub-profile-wrapper" style={{ position: "relative" }}>
            <img 
              src={user.avatarUrl || ProfileImage} 
              alt="Profile" 
              className="ub-profile-img" 
            />

            <img
              src={CameraIcon}
              alt="Camera"
              className="ub-camera-btn"
              onClick={handleCameraClick}
              style={{
                opacity: uploading ? 0.5 : 1,
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            />

            {uploading && (
              <div
                style={{
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
              {user.name || "User"} (You)
              <span className="ub-verified-badge">
                <img src={VerifiedIcon} alt="Verified" className="ub-verified-icon" />
                Verified Student
              </span>
            </div>

            <div className="ub-subtext">
              {user.course || "N/A"} • {user.yearLevel || "N/A"} • {user.campus || "N/A"}
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
            <div className="ub-stat-value">{user.itemsSold || 0}</div>
            <div className="ub-stat-label">SOLD</div>
          </div>

          <div className="ub-stat">
            <div className="ub-stat-value">4.3</div>
            <div className="ub-stat-label">RATING</div>
          </div>

          <div className="ub-stat">
            <div className="ub-stat-value">4</div>
            <div className="ub-stat-label">BUYING</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBanner;