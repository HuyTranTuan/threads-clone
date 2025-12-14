import * as React from "react";

export function BookmarkCheckIcon({
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
      <path d="m19 21l-7-4l-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" /><path d="m9 10l2 2l4-4" />
    </svg>
  );
}
