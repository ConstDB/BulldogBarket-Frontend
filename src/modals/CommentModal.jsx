import { useEffect, useState } from "react";

export default function CommentModal({ listing, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchComments() {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/listings/${listing}/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to get comments:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [listing._id]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex w-[420px] min-h-[480px] max-h-[90vh] flex-col bg-white rounded-xl py-6 px-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <div className="text-[22px] font-semibold">
            Comments ({comments.length})
          </div>
          <div className="text-[12px] text-neutral-500">
            {/* OPTIONAL: Add item name if you want */}
          </div>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          {loading && <div className="text-center text-sm">Loading…</div>}

          {!loading &&
            comments.map((c) => (
              <div key={c._id} className="flex items-start gap-3">
                {/* Avatar */}
                <img
                  src={c.user.avatarUrl}
                  className="w-9 h-9 rounded-full"
                  alt="avatar"
                />

                <div className="flex flex-col w-full">
                  {/* User Info */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[15px]">
                      {c.user.name}
                    </span>

                    {/* Seller Badge – OPTIONAL if your endpoint includes seller info */}
                  </div>

                  {/* Message */}
                  <div className="text-[14px] leading-[18px] mt-0.5">
                    {c.message}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                    <span>•</span>
                    <span>{c.user.course}</span>
                    <span>•</span>
                    <span>{c.user.campus}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 mt-4 border border-neutral-200 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 outline-none text-[14px]"
          />

          <button className="text-blue-600 hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
