import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/Button";

const REPORT_REASONS = [
  { key: "spam", value: "spam" },
  { key: "nudity", value: "nudity" },
  { key: "hate_speech", value: "hate_speech" },
  { key: "violence", value: "violence" },
  { key: "harassment", value: "harassment" },
  { key: "false_info", value: "false_info" },
  { key: "scam", value: "scam" },
  { key: "other", value: "other" },
];

function ReportDialog({ open, onOpenChange, onSubmit, isLoading = false }) {
  const { t } = useTranslation();
  const [selectedReason, setSelectedReason] = useState(null);

  const handleSubmit = async () => {
    if (selectedReason) {
      await onSubmit?.(selectedReason, "");
      setSelectedReason(null);
    }
  };

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setSelectedReason(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background rounded-2xl! p-5!">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-xl! font-bold!">
            {t("report_title")}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
            {t("report_description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1 mt-2">
          {REPORT_REASONS.map((reason) => (
            <Button
              key={reason.key}
              onClick={() => setSelectedReason(reason.value)}
              className={`w-full text-foreground! text-left px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                selectedReason === reason.value
                  ? "bg-secondary"
                  : "hover:bg-secondary/30"
              }`}
            >
              {t(`report_reasons_${reason.key}`)}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedReason || isLoading}
          className="w-full mt-3 rounded-lg cursor-pointer bg-destructive/60! hover:bg-destructive! text-destructive-foreground"
        >
          {isLoading ? "..." : t("report_submit")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDialog;
