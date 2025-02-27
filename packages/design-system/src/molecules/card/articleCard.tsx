import { PropsWithChildren } from "react";

export function Card({
  index,
  title,
  summary,
  content,
  asset,
  ...props
}: {
  index?: number;
  title: string;
  summary?: string;
  content: string;
  props?: React.HTMLAttributes<HTMLElement>;
  asset?: string;
}) {
  return (
    <>
      <article className="w-100% block" {...props}>
        <span className="w-100% grid gap-24px cols-16 relative border-b-1 border-b-solid  border-color-black p-4">
          <h2 className="col-start-1 col-span-2 text-26px font-600">
            {index?.toString().padStart(2, "0").padStart(3, ".")}
          </h2>
          <h2 className="col-start-3 col-span-5 text-26px font-600 line-height-100%">
            <a href="">{title}</a>
          </h2>
          <h3 className="hidden"></h3>
          <h3 className="hidden"></h3>
          <h3 className="hidden"></h3>
          <div className="col-start-9 col-span-3 aspect-1">
            <a href="">
              <img className="w-100% h-100% object-cover" src={asset} alt="" />
            </a>
          </div>
          <div className="col-start-13 col-span-4 text-13px line-height-4.5">
            <p>
              <strong className="font-400  ">{content}</strong>
            </p>
          </div>
        </span>
      </article>
    </>
  );
}
