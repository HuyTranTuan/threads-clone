import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { selectUser } from "@/features/auth";
import { addPostToFeed, updatePost } from "@/features/feed";
import PostForm from "./components/PostForm";
import ThreadHint from "./components/ThreadHint";
import DialogFooter from "./components/DialogFooter";
import { interactionsServices, postServices } from "@/services";

const FORM_ID = "create-post-form";

const CreatePostDialog = ({
  open,
  onOpenChange,
  quotedPost,
  mode,
  onReplySuccess,
  editPost,
  onEditSuccess,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      content: "",
    },
  });

  // Initialize form with edit post data
  useEffect(() => {
    if (mode === "edit" && editPost && open) {
      setValue("content", editPost.content || "");

      // Set existing media previews from post
      if (editPost.media && editPost.media.length > 0) {
        const existingPreviews = editPost.media.map((mediaItem) => ({
          url: mediaItem.url || mediaItem,
          type: (mediaItem.type || "image").includes("video")
            ? "video"
            : "image",
          isExisting: true, // Mark as existing media
        }));
        setMediaPreviews(existingPreviews);
      }
    }
  }, [mode, editPost, open, setValue]);

  const content = watch("content");
  const isFormValid =
    content?.trim().length > 0 ||
    mediaFiles.length > 0 ||
    mediaPreviews.length > 0;

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const maxFiles = 10;
    const totalFiles = mediaFiles.length + files.length;
    if (totalFiles > maxFiles) {
      toast.error(t("createPost.maxFiles", { max: maxFiles }));
      return;
    }

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMediaFiles((prev) => [...prev, ...files]);
    setMediaPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeMedia = (index) => {
    const preview = mediaPreviews[index];
    // Only revoke if it's a blob URL (not existing media)
    if (!preview.isExisting && preview.url.startsWith("blob:")) {
      URL.revokeObjectURL(preview.url);
    }
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    mediaPreviews.forEach((preview) => {
      if (!preview.isExisting && preview.url.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });
    setMediaFiles([]);
    setMediaPreviews([]);
    reset();
    onOpenChange(false);
  };

  const onSubmit = async (data) => {
    if (!isFormValid) return;

    try {
      setLoading(true);
      const postData = {
        content: data.content,
        media: mediaFiles,
      };

      // Handle EDIT mode
      if (mode === "edit" && editPost) {
        const response = await postServices.updatePost(editPost.id, postData);
        dispatch(updatePost(response));
        toast.success(t("edit_successed"));
        handleClose();
        if (onEditSuccess && response) {
          onEditSuccess(response);
        }
        return;
      }

      if (mode === "quote") {
        const response = await interactionsServices.quote(
          quotedPost.id,
          postData,
        );
        dispatch(addPostToFeed(response));
        dispatch(updatePost({ original_post_id: quotedPost.id }));
        toast.success(t("post_successed"));
        handleClose();
        return;
      }

      if (mode === "reply") {
        const response = await interactionsServices.reply(
          quotedPost.id,
          postData,
        );
        dispatch(
          updatePost({
            postId: quotedPost.id,
            replies_count: (quotedPost.replies_count || 0) + 1,
          }),
        );
        dispatch(upda);
        toast.success(t("reply_successed"));
        handleClose();
        if (onReplySuccess && response) {
          onReplySuccess(response);
        }
        return;
      }

      const response = await postServices.createPost(postData);
      dispatch(addPostToFeed(response));
      toast.success(t("post_successed"));
      handleClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("post_failed");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getDialogTitle = () => {
    switch (mode) {
      case "edit":
        return t("edit_post_title");
      case "reply":
        return t("reply_post_title");
      default:
        return t("create_post_title");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[620px] p-5! rounded-3xl! bg-card text-foreground overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4!">
          <DialogTitle className="text-center font-bold! text-[20px]!">
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} id={FORM_ID}>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <PostForm
              currentUser={currentUser}
              register={register}
              content={content}
              setValue={setValue}
              mediaPreviews={mediaPreviews}
              onMediaSelect={handleMediaSelect}
              onRemoveMedia={removeMedia}
              formId={FORM_ID}
              quotedPost={quotedPost}
              mode={mode}
              isFormValid={isFormValid}
              loading={loading}
            />
            {mode !== "edit" && <ThreadHint currentUser={currentUser} />}
          </div>
        </form>

        {/* Footer */}
        <DialogFooter
          isFormValid={isFormValid}
          loading={loading}
          mode={mode}
          formId={FORM_ID}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
