import "../../styles/MarketFeed/QuickPost.css";

import profileicon from "../../assets/profileicon.svg";
import sellitem from "../../assets/sellitem.svg";
import lfpost from "../../assets/lfpost.svg";

function QuickPost() {
  return (
    <div className="qp-box">
      <div className="qp-row1">
        <img src={profileicon} alt="User" className="qp-profile" />

        <div className="qp-input">
          Selling or Looking for something?
        </div>
      </div>

      <div className="qp-line"></div>

      <div className="qp-row2">
        <button className="qp-btn">
          <img src={sellitem} alt="Sell Item" />
          <span>Sell Item</span>
        </button>

        <button className="qp-btn">
          <img src={lfpost} alt="LF Post" />
          <span>Create 'LF' Post</span>
        </button>
      </div>
    </div>
  );
}

export default QuickPost;
