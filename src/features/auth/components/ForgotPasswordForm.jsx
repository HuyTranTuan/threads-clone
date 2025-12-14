import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordSchema } from "@/utils/validators";
import { Input } from "@/components/ui/input";
import { authServices } from "@/services";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await authServices.forgotPassword(data.email);

      //Toast
      toast.info(t(""), {
        description: response.message,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      toast.error(t("request_failed"), {
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
      {/* Email */}
      <Input
        type="email"
        placeholder={t("email")}
        {...register("email")}
        className={`h-12 bg-background border-input-border rounded-xl text-normaltext placeholder:text-normaltext-tertiary ${
          errors.email ? "border-destructive" : ""
        }`}
        disabled={isLoading}
      />
      {errors.email && (
        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-foreground! text-background! !hover:bg-systemtext cursor-pointer rounded-2xl"
        disabled={isLoading}
      >
        {isLoading ? t("sending") : t("resend_link_new_psw")}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
