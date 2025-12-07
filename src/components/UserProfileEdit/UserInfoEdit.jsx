import { useState } from "react";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../data/nuData";
import LockIcon from "../../assets/lock.svg";
import ChatIcon from "../../assets/chat.svg";

const mockUser = {
  studentNumber: "2023-123456",
  fullName: "Rick Prime",
  course: "",
  year: "",
  campus: "",
  contact: "",
};

function UserInfoEdit({ user = mockUser, onSave }) {
  const [course, setCourse] = useState(user?.course || "");
  const [year, setYearLevel] = useState(user?.year || "");
  const [campus, setCampus] = useState(user?.campus || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setError(null);
    setSuccess(false);
    setLoading(true);

    const payload = {
      course,
      yearLevel,
      campus,
      contact,
    };

    try {
      if (onSave && typeof onSave === "function") {
        // allow parent to handle saving (preferred for separation of concerns)
        await onSave(payload);
      } else {
        // default fallback: simple fetch to a conventional endpoint
        // Update this URL to match your backend route and include auth headers if needed
        const res = await fetch(`/api/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed: ${res.status}`);
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "540px",
        background: "#ffffff",
        borderRadius: 16,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        border: "1px solid #F3F4F6",
      }}
    >

      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1E293B",
          marginBottom: -10,
        }}
      >
        Personal Information
      </div>

      <div
        style={{
          background: "#F8FAFC",
          borderRadius: 16,
          padding: "16px",
          border: "1px solid #D8E4F0",
        }}
      >

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LockIcon} alt="Locked" style={{ width: 22, height: 22 }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
            Verified Identity
          </div>
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#64748B",
            lineHeight: 1.35,
            paddingLeft: 32,
            maxWidth: 360,
          }}
        >
          To ensure platform safety, your Student Number and Name are locked.
          Contact admin to correct errors.
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 18,
          }}
        >

          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#334155",

              }}
            >
              STUDENT NUMBER
            </label>
            <div
              style={{
                background: "#E2E8F0",
                padding: "10px 12px",
                borderRadius: 8,
                color: "#6B7280",
                fontSize: 15,
                marginTop: 6,
              }}
            >
              {user.studentNumber}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              FULL NAME
            </label>
            <div
              style={{
                background: "#E2E8F0",
                padding: "10px 12px",
                borderRadius: 8,
                color: "#6B7280",
                fontSize: 15,
                marginTop: 6,
              }}
            >
              {user.fullName}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>

        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Course / Program
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{
              width: "100%",
              height: 44,
              marginTop: 6,
              background: "#FFF",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 15,
            }}
          >
            <option value="">Select Course</option>
            {NU_COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Year Level
          </label>
          <select
            value={year}
            onChange={(e) => setYearLevel(e.target.value)}
            style={{
              width: "100%",
              height: 44,
              marginTop: 6,
              background: "#FFF",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 15,
            }}
          >
            <option value="">Select Year Level</option>
            {NU_YEAR_LEVELS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Campus
        </label>
        <select
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          style={{
            width: "100%",
            height: 44,
            marginTop: 6,
            background: "#FFF",
            border: "1px solid #CBD5E1",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 15,
          }}
        >
          <option value="">Select Campus</option>
          {NU_CAMPUSES.map((camp) => (
            <option key={camp} value={camp}>
              {camp}
            </option>
          ))}
        </select>

        <div
          style={{
            fontSize: 11,
            color: "#64748B",
          }}
        >
          This helps buyers know where you usually transact.
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <label
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Contact Channels
        </label>

        <div style={{ position: "relative", marginTop: 6 }}>
          <img
            src={ChatIcon}
            alt="Chat"
            style={{
              width: 18,
              height: 18,
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.7,
            }}
          />

          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="https://messenger.com/rickprime"
            style={{
              width: "494px",
              height: 33,
              background: "#FFF",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              paddingLeft: 35,
              paddingRight: 10,
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <button
        style={{
          width: "100%",
          height: "33px",
          background: "#35408E",
          color: "#FFF",
          borderRadius: 5,
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <div style={{ marginTop: 8 }}>
        {error && (
          <div style={{ color: "#DC2626", fontSize: 13 }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "#16A34A", fontSize: 13 }}>
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfoEdit;
