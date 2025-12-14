import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import RegisterForm from "@/features/auth/components/RegisterForm";
import { Separator } from "@/components/ui/separator";

function Register() {
  const { t } = useTranslation();

  return (
    <div className="max-w-[370px] min-w-[300px] p-6! mx-auto! flex flex-col gap-2 absolute top-full left-[50%] -translate-x-[50%] translate-y-[50%]">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("signup_threads")}
        </h1>

        <RegisterForm />

        <div className="text-center">
          <Link to="/auth/forgot-password" className="text-sm text-foreground">
            {t("forgot_psw")}
          </Link>
        </div>

        <div className="relative my-6!">
          <Separator className="bg-normaltext!" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-systemtext!">
            {t("or")}
          </span>
        </div>
      </div>

      <p className="text-center">
        {t("havent_got_account")}
        <Link
          to="/auth/login"
          className="text-foreground font-semibold hover:underline"
        >
          {t("login")}
        </Link>
      </p>
    </div>
  );
}

export default Register;
