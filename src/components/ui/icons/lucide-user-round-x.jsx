import * as React from "react";

export function UserRoundXIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}>
      <path d="M2 21a8 8 0 0 1 11.873-7" /><circle cx="10" cy="8" r="5" /><path d="m17 17l5 5m0-5l-5 5" />
    </svg>
  );
}
