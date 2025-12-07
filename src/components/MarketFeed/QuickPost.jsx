import profileicon from "../../assets/profileicon.svg";
import sellitem from "../../assets/sellitem.svg";
import lfpost from "../../assets/lfpost.svg";

function QuickPost() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "561px",
        maxHeight: "116px",
        background: "white",
        borderRadius: "10px",
        padding: "16px 18px",
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
        fontFamily: "Sen, sans-serif",
        position: "absolute",
        left: "392px",
        top: "80px",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <img
          src={profileicon}
          alt="User"
          style={{
            width: "42px",
            height: "42px",
          }}
        />

        <div
          style={{
            width: "384px",
            height: "32px",
            background: "#E5E7EB",
            color: "#6B7280",
            borderRadius: "20px",
            padding: "0px 24px",
            display: "flex",
            fontSize: "16px",
            alignItems: "center",
          }}
        >
          Selling or Looking for something?
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#E5E7EB",
          margin: "18px 0 12px 0",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            margin: "0 20px",
            fontFamily: "Sen, sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <img src={sellitem} alt="Sell Item" style={{ height: "12px" }} />
          <span>Sell Item</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            margin: "0 20px",
            fontFamily: "Sen, sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <img src={lfpost} alt="LF Post" style={{ height: "12px" }} />
          <span>Create 'LF' Post</span>
        </button>
      </div>
    </div>
  );
}

export default QuickPost;
