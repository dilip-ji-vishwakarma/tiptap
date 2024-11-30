import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

//Doc
//https://lucide.dev/guide/packages/lucide-react

export const IconRender: React.FC<IconProps> = ({ name, color, size, strokeWidth = 1, className }) => {
  const defaultKey = "Wrench" as keyof typeof icons;
  const LucideIconComponent = icons[name] || icons[defaultKey];
  if (!LucideIconComponent) {
    console.error(`Icon "${name}" not found in Lucide icons library.`);
  }

  return (
    <LucideIconComponent
      className={className}
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
    />
  );
};
