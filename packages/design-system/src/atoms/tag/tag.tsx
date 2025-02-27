import { PropsWithChildren } from "react";

type TagType = "taxonomy" | "state" | "collections";

export function Tag({
  type = "taxonomy",
  className,
  children = "tag",
}: PropsWithChildren<{
  className?: string;
  type?: TagType;
}>) {
  return (
    <span
      className={[
        "inline-flex gap-1 items-center lowercase rounded-full text-3 px-3 py-1 font-medium ring-1 ring-inset before:content-empty before:block before:w-6px before:h-6px before:rounded-full hover:bg-gray-1 transition-200",
        type === "state" &&
          "before:hidden bg-gradient-to-b from-[#f0fdf4] to-transparent text-green-700 ring-green-600/20 before:bg-green-700",
        type === "taxonomy" &&
          "bg-blue-50 text-blue-700 ring-blue-700/10 before:bg-blue-700",
        className,
      ].join(" ")}
    >
      <div className="i-ri-checkbox-circle-fill"></div>
      {children}
    </span>
  );
}
