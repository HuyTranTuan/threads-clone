import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button";
import { PasswordInput } from "@/components/ui/password-input";
import { authServices } from "@/services";
import { resetPasswordSchema } from "@/utils/validators";
import { debounce, isPasswordMatch } from "@/features/auth";

const ResetPasswordForm = ({ token, email }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const checkPassword = useCallback(
    debounce((password) => {
      if (!password) {
        setPasswordError("");
        return;
      }

      if (!isValidPassword(password)) {
        setPasswordError(t("password_at_least"));
        clearErrors("password");
      } else {
        setPasswordError("");
      }
    }, 700),
    [],
  );

  const checkConfirmPassword = useCallback(
    debounce((confirmPassword) => {
      if (!confirmPassword) {
        setConfirmPasswordError("");
        return;
      }

      if (!isPasswordMatch(passwordValue, confirmPassword)) {
        setConfirmPasswordError(t("confirmpassword_not_match"));
        clearErrors("password_confirmation");
      } else {
        setConfirmPasswordError("");
      }
    }, 700),
    [passwordValue],
  );

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await authServices.resetPassword({
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      toast.success(t("create_new_password_successed"));

      setTimeout(() => {
        navigate("/login", {
          state: {
            message: t("create_new_password_successed"),
          },
        });
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("cannot_new_password");

      toast.error(t("create_new_password_failed"), {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <PasswordInput
        placeholder={t("new_password")}
        {...register("password")}
        onChange={(e) => {
          const value = e.target.value;
          register("password").onChange(e);
          setPasswordValue(value);
          checkPassword(value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-systemtext${
          errors.password || passwordError ? "border-destructive" : ""
        }`}
        disabled={isLoading}
      />
      {passwordError && <p className="text-destructive">{passwordError}</p>}
      {errors.password && (
        <p className="text-destructive">{errors.password.message}</p>
      )}

      <PasswordInput
        placeholder={t("confirm_password")}
        {...register("password_confirmation")}
        onChange={(e) => {
          register("password_confirmation").onChange(e);
          checkConfirmPassword(e.target.value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-systemtext${
          errors.password_confirmation || confirmPasswordError
            ? "border-destructive"
            : ""
        }`}
        disabled={isLoading}
      />
      {confirmPasswordError && (
        <p className="text-destructive">{confirmPasswordError}</p>
      )}
      {errors.password_confirmation && (
        <p className="text-destructive">
          {errors.password_confirmation.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-foreground text-background !hover:bg-systemtext cursor-pointer rounded-2xl"
        disabled={isLoading}
      >
        {isLoading ? t("processing") : t("create_new_password")}
      </Button>
    </form>
  );
};
export default ResetPasswordForm;
