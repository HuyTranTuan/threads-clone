import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  debounce,
  isPasswordMatch,
  isValidEmailFormat,
  isValidPassword,
} from "@/features/auth/helpers";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  selectRegisterLoading,
  resetRegisterState,
} from "@/features/auth";
import { registerSchema } from "@/utils/validators";
import { authServices } from "@/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Redux state
  const isLoading = useSelector(selectRegisterLoading);

  //Local state cho validation
  const [emailFormatError, setEmailFormatError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //Lưu giá trị tạm để so sánh Password
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  //Debounce check username
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (!username || username.length < 3) return;

      try {
        await authServices.validateUsername(username);
        clearErrors("username");
      } catch (error) {
        setError("username", {
          type: "manual",
          message: error.response?.data?.message || t("username_existed"),
        });
      }
    }, 700),
    [],
  );

  const checkEmail = useCallback(
    debounce(async (email) => {
      if (!email) {
        setEmailFormatError("");
        return;
      }

      if (!isValidEmailFormat(email)) {
        setEmailFormatError(t("email_invalid"));
        clearErrors("email");
        return;
      }
      setEmailFormatError("");

      try {
        await authServices.validateEmail(email);
        clearErrors("email");
      } catch (error) {
        setError("email", {
          type: "manual",
          message: error.response?.data?.message || t("email_existed"),
        });
      }
    }, 1200),
    [],
  );

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

  //Handle submit
  const onSubmit = async (data) => {
    dispatch(registerStart());

    try {
      const response = await authServices.register(data);

      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      if (response.user) {
        localStorage.setItem("user", response.user);
      }

      dispatch(registerSuccess(response));

      toast.success(t("signup_success"), {
        description: t("we_have_sent_verify_email"),
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 500);
    } catch (error) {
      const errorData = error.response?.data || {
        message: error.message,
      };
      dispatch(registerFailure(errorData));

      const errorMessage = errorData.message || t("signup_fail");

      if (errorData.errors) {
        Object.keys(errorData.errors).forEach((field) => {
          setError(field, {
            type: "manual",
            message: errorData.errors[field][0],
          });
        });
      }

      toast.error(t("signup_fail"), {
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetRegisterState());
    };
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder={t("username")}
        {...register("username")}
        onChange={(e) => {
          register("username").onChange(e);
          checkUsername(e.target.value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
          errors.username ? "border-destructive" : ""
        }`}
        disabled={isLoading}
      />
      {errors.username && (
        <p className="text-destructive">{errors.username.message}</p>
      )}

      <Input
        type="email"
        placeholder={t("email")}
        {...register("email")}
        onChange={(e) => {
          register("email").onChange(e);
          checkEmail(e.target.value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
          errors.email || emailFormatError ? "border-destructive" : ""
        }`}
        disabled={isLoading}
      />
      {emailFormatError && (
        <p className="text-destructive">{emailFormatError}</p>
      )}

      {errors.email && !emailFormatError && (
        <p className="text-destructive">{errors.email.message}</p>
      )}

      <PasswordInput
        placeholder={t("password")}
        {...register("password")}
        onChange={(e) => {
          const value = e.target.value;
          register("password").onChange(e);
          setPasswordValue(value);
          checkPassword(value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
          errors.password || passwordError ? "border-destructive" : ""
        }`}
        disabled={isLoading}
      />
      {passwordError && <p className="text-destructive">{passwordError}</p>}

      {errors.password && (
        <p className="text-destructive">{errors.password.message}</p>
      )}

      <PasswordInput
        type="password"
        placeholder={t("confirm_password")}
        {...register("password_confirmation")}
        onChange={(e) => {
          register("password_confirmation").onChange(e);
          checkConfirmPassword(e.target.value);
        }}
        className={`h-12 bg-threaditembg border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
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
        {isLoading ? t("siging_up") : t("sigup")}
      </Button>
    </form>
  );
};

export default RegisterForm;
