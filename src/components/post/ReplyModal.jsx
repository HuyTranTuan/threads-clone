import CreatePostDialog from "@/components/CreatePostDialog";

const ReplyModal = ({ open, onOpenChange, post, onReplySuccess }) => {
  return (
    <CreatePostDialog
      open={open}
      onOpenChange={onOpenChange}
      quotedPost={post}
      mode="reply"
      onReplySuccess={onReplySuccess}
    />
  );
};

export default ReplyModal;
