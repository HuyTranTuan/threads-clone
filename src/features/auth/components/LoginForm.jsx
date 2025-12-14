import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { loginSchema } from "@/utils/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  selectLoginLoading,
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/features/auth";
import { authServices } from "@/services";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [params] = useSearchParams();

  const isLoading = useSelector(selectLoginLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    try {
      const response = await authServices.login(data);

      //Lưu token vào localStorage
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }

      //Lưu user vào localStorage để restore khi F5
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      if (response.user.verified) {
        const continuePath = params.get("continue") || "/";
        navigate(continuePath);
        dispatch(loginSuccess(response));
        //Hiển thị toast
        toast.success(
          `${t("login_success")}: ${t("greeting", { username: response.user.username })}`,
        );
      } else {
        navigate(`/verify-email?token=${response.access_token}`);
        toast.info(`${t("login_success")}`);
      }
    } catch (error) {
      const messageToDisplay =
        typeof error === "string"
          ? error
          : error.response?.data?.message || error.message || "Unknown Error";

      dispatch(loginFailure(error));

      toast.error(`${t("login_fail")}: ${messageToDisplay}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder={t("email")}
        {...register("username")}
        className={`
                        h-12
                        bg-background
                        border-input-border
                        rounded-2xl
                        text-normaltext
                        placeholder:text-normaltext-tertiary
                        ${errors.username ? "border-destructive" : ""}
                        `}
        disabled={isLoading}
      />
      {errors.username && (
        <p className="text-destructive">{errors.username.message}</p>
      )}
      <PasswordInput
        placeholder={t("password")}
        {...register("password")}
        className={`h-12 bg-background border-input-border rounded-xl
                    text-normaltext placeholder:text-normaltext-tertiary
                    ${errors.password ? "border-destructive" : ""}
                  `}
        disabled={isLoading}
      />
      {errors.password && (
        <p className="text-destructive">{errors.password.message}</p>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-foreground text-background !hover:bg-systemtext cursor-pointer rounded-2xl"
        disabled={isLoading}
      >
        {isLoading ? t("loging_in") : t("login")}
      </Button>
    </form>
  );
}
export default LoginForm;
