import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { closeSignUpModal } from "@/features/auth/authSlice";

const SignUpModal = ({ open = true, onOpenChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCloseSignupModal = () => {
    dispatch(closeSignUpModal());
    navigate("/auth/login");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className=""
      id="SignUpModal"
    >
      <DialogContent className="[&>button:last-child]:hidden px-[46px]! py-14! gap-8">
        <div className="flex flex-col gap-4">
          <DialogTitle className="text-foreground text-[32px]! font-bold! text-center">
            {t("say_more_with_threads")}
          </DialogTitle>
          <p className="text-center">
            <span className="text-(--systemtext)">
              {t("join_threads_to_share_thoughts")}
            </span>
          </p>
        </div>
        <Button
          className="h-12 bg-foreground rounded-xl font-semibold text-xl!"
          onClick={handleCloseSignupModal}
        >
          {t("login_threads")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
