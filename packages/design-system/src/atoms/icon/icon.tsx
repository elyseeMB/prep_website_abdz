export const iconNames = ["i-ri-arrow-right-line", "i-ri-admin-fill"] as const;

export function Icon({
  classname,
  name,
}: {
  name: (typeof iconNames)[number];
  classname?: string;
}) {
  return <div className={[classname, name].join(" ")}> hello world !</div>;
}
