import { useRef } from "react";
import "../../styles/UserProfileEdit/UserBanner.css";
import CameraIcon from "../../assets/camera.svg";
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
}) {
  const fileInputRef = useRef(null);

  const handleCameraClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) console.log("Selected image:", file);
  };

  return (
    <div className="ub-container">
      <div className="ub-banner" />

      <div className="ub-content">
        <div className="ub-left">
          <div className="ub-profile-wrapper">
            <img src={ProfileImage} alt="Profile" className="ub-profile-img" />

            <img
              src={CameraIcon}
              alt="Camera"
              className="ub-camera-btn"
              onClick={handleCameraClick}
            />

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
