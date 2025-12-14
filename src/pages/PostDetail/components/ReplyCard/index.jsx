import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import AvatarComponent from "@/components/post/components/AvatarRounded";
import MoreDropdownMenuComponent from "@/components/post/components/PostMenu";
import PostImage from "@/components/post/components/PostImage";
import InteractionBar from "@/components/post/components/InteractionBar";
import ReplyForm from "@/pages/Home/components/ReplyForm";
import { formatTimeAgo } from "@/utils/timeFormat";

const ReplyCard = ({ reply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const navigate = useNavigate();

  const handleToggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleClick = (e) => {
    // Check for interactive elements: buttons, links, textareas, and dropdown menu items
    const interactiveSelectors = [
      "button",
      "a",
      "textarea",
      '[role="menuitem"]',
      '[role="menu"]',
      "[data-radix-collection-item]",
    ];

    if (interactiveSelectors.some((selector) => e.target.closest(selector))) {
      return;
    }

    navigate(`/post/${reply.id}`);
  };

  return (
    <Card
      className="bg-content-background border-card-border! py-2 transition-colors shadow-none rounded-none cursor-pointer border-0 border-b"
      onClick={handleClick}
    >
      <CardContent className="p-2">
        <div className="flex gap-3">
          {/* Avatar Column */}
          <div className="flex flex-col items-center">
            <AvatarComponent post={reply} />

            {showReplyForm && (
              <div className="w-0.75 h-full rounded-xl bg-reply-line grow mt-2"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px] text-foreground">
                  {reply?.user?.username || "username"}
                </span>
                {reply?.user?.verified && (
                  <svg
                    className="w-3.5 h-3.5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
                <span className="text-muted-foreground text-[15px]">
                  {formatTimeAgo(reply?.created_at)}
                </span>
              </div>
              <MoreDropdownMenuComponent />
            </div>

            {/* Reply Text */}
            <p className="text-[15px] text-foreground mb-2">{reply?.content}</p>

            <PostImage post={reply} />

            {/* Interaction Bar */}
            <InteractionBar
              likes={reply?.likes_count || 0}
              comments={reply?.replies_count || 0}
              repost={reply?.reposts_and_quotes_count || 0}
              shares={0}
              post={reply}
              onToggleReply={handleToggleReplyForm}
            />
          </div>
        </div>

        {showReplyForm && (
          <ReplyForm post={reply} onClose={handleToggleReplyForm} />
        )}
      </CardContent>
    </Card>
  );
};

export default ReplyCard;
