import type { LucideIcon } from "lucide-react";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { box: string; icon: number }> = {
  sm: { box: "w-10 h-10", icon: 20 },
  md: { box: "w-12 h-12", icon: 24 },
  lg: { box: "w-14 h-14", icon: 28 },
};

interface Props {
  icon: LucideIcon;
  size?: Size;
  variant?: "teal" | "dark";
  className?: string;
}

const IconChip = ({ icon: Icon, size = "md", variant = "teal", className = "" }: Props) => {
  const s = sizeMap[size];
  const palette =
    variant === "dark"
      ? { bg: "#1F2937", color: "#D6F3EE", border: "#1F2937" }
      : { bg: "#D6F3EE", color: "#0A8C7E", border: "#A7E6DD" };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${s.box} ${className}`}
      style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
      aria-hidden="true"
    >
      <Icon size={s.icon} strokeWidth={1.6} color={palette.color} />
    </span>
  );
};

export default IconChip;
