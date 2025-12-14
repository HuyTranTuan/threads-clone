import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { Separator } from "@/components/ui/separator";

function ResetPassword() {
  const { t } = useTranslation();
  return (
    <div className="max-w-[370px] min-w-[300px] p-6! mx-auto! flex flex-col gap-2 absolute top-full left-[50%] -translate-x-[50%] translate-y-[70%]">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("forgot_psw")}
        </h1>

        <p className="text-center text-sm text-foreground">
          {t("enter_email_recive_link")}
        </p>

        <ResetPasswordForm />

        <div className="relative my-8!">
          <Separator className="bg-normaltext!" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-foreground-tertiary">
            {t("or")}
          </span>
        </div>

        <p className="text-center">
          <Link to="/auth/login" className="text-foreground font-semibold">
            {t("back_to_login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
