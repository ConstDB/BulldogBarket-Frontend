import { useState } from "react";
import "../../styles/UserProfileEdit/UserInfoEdit.css"; 
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants.js";
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
      yearLevel: year,
      campus,
      contact,
    };

    try {
      if (onSave && typeof onSave === "function") {
        await onSave(payload);
      } else {
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
    <div className="uie-container">
      <div className="uie-title">Personal Information</div>

      <div className="uie-locked-box">
        <div className="uie-locked-header">
          <img src={LockIcon} alt="Locked" className="uie-lock-icon" />
          <div className="uie-locked-title">Verified Identity</div>
        </div>

        <div className="uie-locked-desc">
          To ensure platform safety, your Student Number and Name are locked.
          Contact admin to correct errors.
        </div>

        <div className="uie-locked-fields">
          <div className="uie-field-group">
            <label className="uie-label">STUDENT NUMBER</label>
            <div className="uie-locked-field">{user.studentNumber}</div>
          </div>

          <div className="uie-field-group">
            <label className="uie-label">FULL NAME</label>
            <div className="uie-locked-field">{user.fullName}</div>
          </div>
        </div>
      </div>

      <div className="uie-row">
        <div className="uie-field-group">
          <label className="uie-label-lg">Course / Program</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="uie-select"
          >
            <option value="">Select Course</option>
            {NU_COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="uie-field-group">
          <label className="uie-label-lg">Year Level</label>
          <select
            value={year}
            onChange={(e) => setYearLevel(e.target.value)}
            className="uie-select"
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

      <div className="uie-field-group">
        <label className="uie-label-lg">Campus</label>
        <select
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          className="uie-select"
        >
          <option value="">Select Campus</option>
          {NU_CAMPUSES.map((camp) => (
            <option key={camp} value={camp}>
              {camp}
            </option>
          ))}
        </select>
        <div className="uie-hint">This helps buyers know where you usually transact.</div>
      </div>

      <div className="uie-field-group">
        <label className="uie-label-lg">Contact Channels</label>

        <div className="uie-contact-wrapper">
          <img src={ChatIcon} alt="Chat" className="uie-chat-icon" />

          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="https://messenger.com/rickprime"
            className="uie-contact-input"
          />
        </div>
      </div>

      <button
        className={`uie-save-btn ${loading ? "uie-save-disabled" : ""}`}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <div className="uie-status">
        {error && <div className="uie-error">{error}</div>}
        {success && <div className="uie-success">Saved successfully</div>}
      </div>
    </div>
  );
}

export default UserInfoEdit;
