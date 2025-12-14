import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { setUser } from "@/features/auth";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { authServices } from "@/services";

const VerifyEmail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(t("invalid_token"));
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await authServices.verifyEmail(token);
        const { user } = response || {};

        if (user) {
          dispatch(setUser(user));
        }

        setStatus("success");
        setMessage(t("verify_successed"));
        toast(t("verify_successed"));
        setTimeout(() => {
          window.close();
        }, 4000);
      } catch (error) {
        const statusCode = error.response?.status;
        if (statusCode === 400 || statusCode === 404 || statusCode === 422) {
          const hasAuth = localStorage.getItem("refresh_token");
          if (hasAuth) {
            setStatus("not-verified");
            setMessage(t("not_verified"));
            toast.message?.(t("not_verified")) || toast(t("not_verified"));
          } else {
            setStatus("not-verified-no-auth");
            setMessage(t("need_login_to_verify"));
            toast.message?.(t("need_login_to_verify")) ||
              toast(t("need_login_to_verify"));
          }
        } else {
          setStatus("error");
          setMessage(t("verify_failed"));
          toast.error(error.response?.data?.message || t("verify_failed"));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, navigate, t, token]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await authServices.resendVerificationEmail();
      toast.success(t("verifying_email_sent"));
      setMessage(t("check_email"));
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("verify_failed");
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-[370px] min-w-[300px] p-6! flex flex-col gap-2! absolute! top-full! left-[50%]! -translate-x-[50%] translate-y-full">
      {(status === "verifying" || loading) && (
        <div className="flex flex-col gap-2.5! items-center">
          <Spinner className="w-12 h-12" />
          <p className="mt-4 text-lg text-foreground">{t("verifying")}</p>
        </div>
      )}

      {status === "not-verified" && (
        <div className="flex flex-col items-center gap-2.5!">
          <h1 className="text-2xl! font-bold! text-foreground mb-2!">
            {t("verify_email_title")}
          </h1>
          <p className="text-muted-foreground mb-6 text-center">{message}</p>
          <Button
            onClick={handleResendEmail}
            disabled={isResending}
            className="custom-button-style"
          >
            {isResending ? (
              <>
                <Spinner className="mr-2" />
                {t("sending")}
              </>
            ) : (
              t("resend_verify")
            )}
          </Button>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-2.5! items-center">
          <h1 className="text-2xl! font-bold! text-foreground mb-2!">
            {t("verify_successed")}
          </h1>
          <p className="text-muted-foreground mb-4">{message}</p>
          <p className="text-sm text-muted-foreground">{t("back_to_login")}</p>
          <Link to="/auth/login" state={{ verified: true }} />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col! gap-2.5! items-center">
          <h1 className="text-2xl! font-bold! text-foreground mb-2!">
            {t("verify_failed")}
          </h1>
          <p className="text-muted-foreground mb-6!">{message}</p>
          <Button
            onClick={handleResendEmail}
            disabled={isResending}
            className="custom-button-style"
          >
            {isResending ? (
              <>
                <Spinner className="mr-2!" />
                {t("sending")}
              </>
            ) : (
              t("resend_verify")
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
