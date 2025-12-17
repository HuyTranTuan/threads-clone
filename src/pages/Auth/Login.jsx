import { useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useCurrentUser } from "@/features/auth/hooks";
import LoginForm from "@/features/auth/components/LoginForm";
import { Separator } from "@/components/ui/separator";

function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.verified) {
        const continuePath = params.get("continue") || "/";
        navigate(continuePath);
      } else {
        const token = localStorage.getItem("access_token");
        <Navigate to={`/verify-email?token=${token}`} />;
      }
    }
  }, [currentUser, navigate, params]);

  return (
    <div className="max-w-[370px] min-w-[300px] p-6!flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-xl! sm:my-4 text-foreground font-bold!">
          {t("login_threads")}
        </h1>

        <LoginForm />

        <div className="text-center mt-2.5!">
          <Link
            to="/auth/forgot-password"
            className="text-foreground font-bold! hover:text-(--systemtext)"
          >
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

      <div className="text-center">
        {t("havent_got_account")}
        <Link
          to="/auth/register"
          className="text-foreground font-bold! hover:text-(--systemtext)"
        >
          {t("register")}
        </Link>
        {t("or")}
        <Link
          to="/"
          className="text-foreground font-bold! hover:text-(--systemtext)"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
}

export default Login;
