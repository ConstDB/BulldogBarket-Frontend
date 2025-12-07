import { useRef } from "react";
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
    <div
      style={{
        width: "900px",
        height: "200px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.05)",
        border: "1px solid #F3F4F6",
      }}
    >
      <div
        style={{
          height: "128px",
          background: "linear-gradient(135deg, #4A53A6, #2E347A)",
        }}
      />

      <div
        style={{
          background: "#fff",
          padding: "0px 20px 0px 14px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          <div style={{ position: "relative" }}>
            <img
              src={ProfileImage}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #fff",
                marginTop: "-40px",
              }}
            />

            <img
              src={CameraIcon}
              alt="Camera"
              onClick={handleCameraClick}
              style={{
                width: "24px",
                height: "24px",
                position: "absolute",
                bottom: "0",
                right: "0",
                background: "#fff",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
              }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
                {fullName} (You)

                {isVerified && (
                <span
                    style={{
                    background: "#EFF6FF",
                    color: "#35408E",
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    }}
                >
                    <img
                    src={VerifiedIcon}
                    alt="Verified"
                    style={{
                        width: "6px",
                        height: "6px",
                        display: "block",
                    }}
                    />
                    Verified Student
                </span>
                )}
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#777",
                marginTop: "4px",
              }}
            >
              {course} • {year} • {school}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "700", fontSize: "18px", color: "#35408E"  }}>
            {soldCount}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>SOLD</div>
        </div>

        <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "700", fontSize: "18px", color: "#35408E" }}>{rating}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>RATING</div>
        </div>

        <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "700", fontSize: "18px", color: "#35408E"  }}>{buyingCount}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>BUYING</div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default UserBanner;
