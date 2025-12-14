import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUp, Maximize2 } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postServices, interactionsServices } from "@/services";
import { selectUser } from "@/features/auth";
import { updatePost } from "@/features/feed";
import { createReplySchema } from "@/utils/validators";
import CreatePostDialog from "@/components/CreatePostDialog";
import { Button } from "@/components/ui/button";
import AvatarRounded from "@/components/post/components/AvatarRounded";

function ReplyForm({ post, onClose, onReplySuccess }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExpandedOpen, setIsExpandedOpen] = useState(false);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, resetField } = useForm({
    resolver: yupResolver(createReplySchema(t)),
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content");

  useEffect(() => {
    if (content?.length > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [content]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const replyResponse = await interactionsServices.reply(post.id, data);
      const response = await postServices.getReplies(post.id);
      const updateRepliesCount = response.data.length;
      dispatch(
        updatePost({
          postId: post.id,
          replies_count: updateRepliesCount,
        }),
      );
      // Call onReplySuccess callback if provided (for PostDetail page)
      if (onReplySuccess && replyResponse) {
        onReplySuccess(replyResponse);
      }
      toast(t("reply_successed"));
      onClose();
      resetField("content");
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("reply_failed");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandedReplySuccess = (reply) => {
    if (onReplySuccess) {
      onReplySuccess(reply);
    }
    onClose();
  };

  return (
    <>
      <div className="pt-3 mt-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-3">
          {/* Avatar của user hiện tại */}
          <AvatarRounded currentUser={currentUser} />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <div className="flex gap-2 items-end">
              <Textarea
                placeholder={t("write_sth", { name: post?.user?.name })}
                className="min-h-[15px] h-10 resize-none bg-transparent border-none! w-full flex-1 focus:ring-0! focus:ring-offset-0!"
                {...register("content")}
              />

              {showButton && (
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading}
                  className="rounded-full"
                >
                  {loading ? (
                    <>
                      <Spinner className="mr-2" />
                      {t("reply_loading")}
                    </>
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </Button>
              )}

              {/* Expand button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full p-2"
                onClick={() => setIsExpandedOpen(true)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Expanded Reply Dialog */}
      <div onClick={(e) => e.stopPropagation()}>
        <CreatePostDialog
          open={isExpandedOpen}
          onOpenChange={setIsExpandedOpen}
          quotedPost={post}
          mode="reply"
          onReplySuccess={handleExpandedReplySuccess}
        />
      </div>
    </>
  );
}

export default ReplyForm;
