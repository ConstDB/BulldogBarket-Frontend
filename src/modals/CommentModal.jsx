import { useCreateComment } from "@/hooks/useCommentApi";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import formatTimeAgo from "@/utils/FormatTimeAgo";

export default function CommentModal({ listing, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const createCommentMutation = useCreateComment();

  const user = useUserStore((state) => state.user);
  async function fetchComments() {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/listings/${listing._id}/comments`,
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

  const handleCreateComment = async () => {
    if (!message.trim()) return;

    try {
      const newComment = await createCommentMutation.mutateAsync({
        listingId: listing._id,
        message,
      });

      setComments((prev) => [...prev, newComment]);
      setMessage("");
    } catch (err) {
      console.error(`Failed to create comments ${err}`);
    }
  };

  const isSeller = (commenterId) => {
    if (listing.seller.id === commenterId) return true;
    return false;
  };

  useEffect(() => {
    fetchComments();
  }, [listing._id]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex w-[420px] min-h-[480px] max-h-[90vh] flex-col bg-white rounded-xl py-2 px-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <div className="text-[16px] font-semibold mb-3.5">
            Comments ({comments.length})
          </div>
          <div className="text-[12px] font-bold bg-neutral-50 text-neutral-500">
            {listing.name}
          </div>
        </div>

        {/* Comments */}
        <div className="max-h-[450px] w-[390px]  flex-1 overflow-y-auto pr-1 space-y-6">
          {loading && <div className="text-center text-sm">Loading…</div>}

          {!loading &&
            comments.map((c) => (
              <div key={c._id} className="flex items-start gap-2.5">
                <img
                  src={c.user.avatarUrl}
                  className={`rounded-full ${
                    isSeller(c.user._id)
                      ? "w-7.5 h-7.5 ring-2 ring-[#35408E] ml-0.5 "
                      : "w-8 h-8"
                  }`}
                  alt="avatar"
                />

                <div className="flex flex-col w-full">
                  {/* User Info */}
                  <div className="flex items-center ">
                    <span
                      className={`font-bold text-[14px] ${
                        isSeller(c.user._id) ? "text-[#35408E]" : ""
                      }`}
                    >
                      {c.user.name}
                    </span>
                    {isSeller(c.user._id) && (
                      <span className="text-[12px] font-bold text-white bg-[#35408E] ml-2 px-2 rounded-xs">
                        Seller
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="max-w-[320px] text-[14px] leading-[18px] wrap-break-word">
                    <p>{c.message}</p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                    <span>{formatTimeAgo(c.createdAt)}</span>
                    <span>•</span>
                    <span>{c.user.course}</span>
                    <span>•</span>
                    <span>{c.user.campus}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex gap-3 items-center border-t border-neutral-200 pt-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          {/* Input */}
          <div className="flex w-[370px] items-center gap-3 border border-neutral-200 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 outline-none text-[14px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="text-blue-600 hover:text-blue-700"
              onClick={handleCreateComment}
            >
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
    </div>
  );
}
