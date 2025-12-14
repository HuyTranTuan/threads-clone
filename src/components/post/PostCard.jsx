import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeAgo } from "@/utils/timeFormat";
import ReplyForm from "@/pages/Home/components/ReplyForm";
import QuoteCard from "@/components/post/components/QuoteCard";
import PostImage from "@/components/post/components/PostImage";
import PostMenuComponent from "@/components/post/components/PostMenu";
import InteractionBar from "@/components/post/components/InteractionBar";
import AvatarComponent from "@/components/post/components/AvatarRounded";

const PostCard = ({
  post,
  isDetailView = false,
  onReplySuccess,
  isEmbedView = false,
  isFirst,
  isLast,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const navigate = useNavigate();

  const handleToggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleClick = (e) => {
    // Don't navigate if in detail view or clicking interactive elements
    if (isDetailView) return;

    // Check for interactive elements: buttons, links, textareas, and dropdown menu items
    const interactiveSelectors = [
      "button",
      "a",
      "textarea",
      '[role="menuitem"]',
      '[role="menu"]',
      "[data-radix-collection-item]",
      "[data-radix-dialog-overlay]",
      '[role="dialog"]',
      "[data-radix-dialog-content]",
    ];

    if (interactiveSelectors.some((selector) => e.target.closest(selector))) {
      return;
    }

    navigate(`/post/${post.id}`);
  };

  return (
    <Card
      id={`post-${post.id}`}
      className={cn(
        "rounded-none! border-0! shadow-none! py-3! px-4!",
        !isLast && "border-b! border-border!",
        !isFirst && "border-t! border-border!",
        !isDetailView ? "hover:none" : "",
      )}
      onClick={handleClick}
    >
      <CardContent className="p-2">
        <div className="flex gap-3">
          {/* Avatar Column - chứa avatar và line */}
          <div className="flex flex-col items-center">
            <AvatarComponent post={post} />

            {/* Line - chỉ hiện khi có reply form */}
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
                  {post?.user?.username || "username"}
                </span>
                {post?.user?.verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
                )}
                <span className="text-muted-foreground text-[15px]">
                  {formatTimeAgo(post?.created_at)}
                </span>
              </div>
              {isEmbedView ? null : <PostMenuComponent post={post} />}
            </div>

            {/* Post Text */}
            <p className="text-[15px] text-foreground mb-2.5!">
              {post?.content}
            </p>

            <PostImage post={post} />

            {/* Quote Card - hiển thị khi post có original_post */}
            {post?.original_post && (
              <QuoteCard originalPost={post.original_post} showInteractions />
            )}

            {/* Interaction Bar */}
            <InteractionBar
              likes={post?.likes_count || 0}
              comments={post?.replies_count || 0}
              repost={post?.reposts_and_quotes_count || 0}
              shares={0}
              post={post}
              onToggleReply={handleToggleReplyForm}
              isEmbedView={isEmbedView}
            />
          </div>
        </div>
        {showReplyForm && (
          <ReplyForm
            post={post}
            onClose={handleToggleReplyForm}
            onReplySuccess={onReplySuccess}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
