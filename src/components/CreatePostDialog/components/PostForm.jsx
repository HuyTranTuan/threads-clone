import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Image, Smile, Paperclip } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import QuoteCard from "@/components/post/components/QuoteCard";
import MediaPreview from "@/components/CreatePostDialog/components/MediaPreview";
import AvatarRounded from "@/components/post/components/AvatarRounded";

function PostForm({
  currentUser,
  register,
  content,
  setValue,
  mediaPreviews,
  onMediaSelect,
  onRemoveMedia,
  formId,
  quotedPost,
  mode,
}) {
  const { t } = useTranslation();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Calculate picker position when opening
  useEffect(() => {
    if (showEmojiPicker && emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();
      setPickerPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [showEmojiPicker]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOnButton = emojiButtonRef.current?.contains(event.target);
      const isClickOnPicker = emojiPickerRef.current?.contains(event.target);

      if (!isClickOnButton && !isClickOnPicker) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent =
      (content || "").slice(0, start) +
      emojiData.emoji +
      (content || "").slice(end);

    setValue("content", newContent);

    // Set cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + emojiData.emoji.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="flex gap-3">
      {/* Avatar Column */}
      <AvatarRounded currentUser={currentUser} />

      {/* Form Content */}
      <div className="flex-1 min-w-0">
        {/* Username */}
        <div className="flex items-center gap-2 mb-2!">
          <span className="font-bold! text-[17px]! text-foreground">
            {currentUser?.username || "username"}
          </span>
        </div>

        {/* Textarea */}
        <Textarea
          {...register("content")}
          ref={(e) => {
            register("content").ref(e);
            textareaRef.current = e;
          }}
          placeholder={t("write_sth")}
          className="min-h-[60px] resize-none bg-transparent border-none! p-2! text-[15px] !focus:ring-0 !focus:ring-offset-0 placeholder:text-muted-foreground mb-2.5! w-[calc(100%-10px)]"
          rows={1}
          form={formId}
        />

        {/* Only show QuoteCard when mode is 'quote', not 'reply' */}
        {quotedPost && mode === "quote" && (
          <QuoteCard originalPost={quotedPost} />
        )}

        {/* Media Previews */}
        <MediaPreview mediaPreviews={mediaPreviews} onRemove={onRemoveMedia} />

        {/* Action Buttons */}
        <div className="mt-3 flex items-center gap-1">
          {/* File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onMediaSelect}
            accept="image/*,video/*"
            multiple
            className="hidden"
            id="post-form-file"
          />

          {/* Media Button */}
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3! rounded-xl transition-colors bg-transparent! text-muted-foreground hover:text-foreground"
          >
            <Image className="h-5 w-5" />
          </Button>

          {/* Emoji Button */}
          <Button
            ref={emojiButtonRef}
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-3! rounded-xl transition-colors bg-transparent! text-muted-foreground hover:text-foreground"
          >
            <Smile className="h-5 w-5" />
          </Button>

          {/* Emoji Picker - Rendered via Portal to body */}
          {showEmojiPicker &&
            createPortal(
              <div
                ref={emojiPickerRef}
                className="fixed z-9999 shadow-xl rounded-xl overflow-hidden pointer-events-auto"
                style={{
                  top: pickerPosition.top,
                  left: pickerPosition.left,
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={300}
                  height={300}
                  searchPlaceholder={t("search_emoji")}
                  previewConfig={{ showPreview: false }}
                  skinTonesDisabled
                  lazyLoadEmojis
                />
              </div>,
              document.body,
            )}
        </div>
      </div>
    </div>
  );
}

export default PostForm;
