import { PropsWithChildren, ReactNode } from "react";

export function TheadWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>
) {
  return (
    <thead
      className="relative z-1 shadow-[0_0_0_1px_rgba(25,28,33,0.06),0_1px_2px_0_rgba(25,28,33,0.12),0_0_2px_0_rgba(0,0,0,0.08)] 
  p-4 rounded-lg bg-white font-500"
      {...props}
    >
      {props.children}
    </thead>
  );
}

export function TrWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement>>
) {
  return <tr {...props}>{props.children}</tr>;
}

export function TdWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableCellElement>>
) {
  return <td {...props}>{props.children}</td>;
}

export function ThWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableCellElement>>
) {
  return <th {...props}>{props.children}</th>;
}

export function TbodyWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>
) {
  return <tbody {...props}>{props.children}</tbody>;
}

export function TableWrapper(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>
) {
  return (
    <table
      className="relative w-full text-left rounded-lg overflow-hidden text-14px text-black/60 table-padding"
      {...props}
    >
      {props.children}
    </table>
  );
}

export function Table(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>
) {
  return (
    <article className="relative w-full h-auto grid grid-row-start-1 grid-row-end-auto shadow-[0_0_0_1px_rgba(237,239,242,1),0_0_2px_0_rgba(0,0,0,0.12)] rounded-8px m-1px">
      <div>
        <div className="w-full h-auto relative before:content-empty before:absolute before:bg-[linear-gradient(90deg,#ffffff_19.93%,transparent_100%)] before:w-20px before:pos-top-6px before:pos-bottom-0 before:z-2 before:h-[calc(100%-6px)] before:rounded-[0_0_0_8px] after:content-empty after:absolute after:bg-[linear-gradient(90deg,transparent_0%,#ffffff_80.05%)] after:w-20px after:pos-top-6px after:pos-right-0 after:pos-bottom-0 after:z-2 after:h-[calc(100%-6px)] after:rounded-[0_0_8px]">
          <div className="relative rounded-8px table  w-full overflow-hidden">
            {props.children}
          </div>
        </div>
      </div>
    </article>
  );
}
