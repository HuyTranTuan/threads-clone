import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

import ConfirmationDialog from "@/components/ConfirmationDialog";
import ReportDialog from "@/components/ReportDialog";
import SignUpModal from "@/features/auth/components/SignUpModal";

function PostMenuDialogs({
  postUsername,
  isLoading,
  // Login Dialog
  loginDialogOpen,
  setLoginDialogOpen,
  // Block Dialog
  blockDialogOpen,
  setBlockDialogOpen,
  onBlockConfirm,
  // Delete Dialog
  deleteDialogOpen,
  setDeleteDialogOpen,
  onDeleteConfirm,
  // Report Dialog
  reportDialogOpen,
  setReportDialogOpen,
  onReportSubmit,
}) {
  const { t } = useTranslation();

  return (
    <>
      {/* Login Dialog */}
      <SignUpModal open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />

      {/* Block Confirmation Dialog */}
      <ConfirmationDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        title={t("confirm_block_title")}
        description={t("confirm_block_description")}
        confirmText={t("block")}
        cancelText={t("cancel")}
        onConfirm={onBlockConfirm}
        variant="destructive"
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("confirm_delete_title")}
        description={t("confirm_delete_description")}
        confirmText={t("delete")}
        cancelText={t("cancel")}
        onConfirm={onDeleteConfirm}
        variant="destructive"
        isLoading={isLoading}
      />

      {/* Report Dialog */}
      <ReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        onSubmit={onReportSubmit}
        isLoading={isLoading}
      />
    </>
  );
}

export default PostMenuDialogs;
