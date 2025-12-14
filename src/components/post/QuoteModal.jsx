import CreatePostDialog from "@/components/CreatePostDialog";

const QuoteModal = ({ open, onOpenChange, quotedPost, onQuoteSuccess }) => {
  return (
    <CreatePostDialog
      open={open}
      onOpenChange={onOpenChange}
      quotedPost={quotedPost}
      mode="quote"
      onQuoteSuccess={onQuoteSuccess}
    />
  );
};

export default QuoteModal;
