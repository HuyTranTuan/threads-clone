import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function DialogFooter({ isFormValid, loading, formId }) {
  const { t } = useTranslation();

  return (
    <div className="border-t! border-(--systemtext)! p-4! flex items-center justify-between">
      <span className="text-muted-foreground text-[13px]">
        {t("anyone_can_reply")}
      </span>
      <Button
        type="submit"
        form={formId}
        disabled={!isFormValid || loading}
        className="rounded-xl px-5"
      >
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            {t("posting")}
          </>
        ) : (
          t("post")
        )}
      </Button>
    </div>
  );
}

export default DialogFooter;
