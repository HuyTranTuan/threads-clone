import * as yup from "yup";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ")
    .matches(EMAIL_REGEX, "Email chưa đúng định dạng"),
});

export const loginSchema = yup.object({
  username: yup.string().required("Vui lòng nhập tên người dùng hoặc email"),
  password: yup
    .string()
    .required("vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Vui lòng nhập tên hiển thị")
    .min(3, "Tên hiển thị phải có ít nhất 3 ký tự")
    .max(30, "Tên hiển thị không quá 30 ký tự")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Tên hiển thị chỉ được chứa chữ cái, số và dấu gạch dưới",
    ),
  email: yup.string().required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  password_confirmation: yup.string().required("Vui lòng xác nhận mật khẩu"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  password_confirmation: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

export const createReplySchema = (t) =>
  yup.object().shape({
    content: yup
      .string()
      .required(t("PostCard:validation.contentRequired"))
      .min(1, t("PostCard:validation.contentMin"))
      .max(500, t("PostCard:validation.contentMax")),
  });
