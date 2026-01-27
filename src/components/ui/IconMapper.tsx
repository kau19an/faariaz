import {
  Plane,
  Code,
  Music,
  Terminal,
  Gamepad2,
  Globe,
  Heart,
  Briefcase,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Plane: Plane,
  Code: Code,
  Music: Music,
  Terminal: Terminal,
  Game: Gamepad2,
  Globe: Globe,
  Life: Heart,
  Work: Briefcase,
};

interface IconMapperProps {
  name: string;
  className?: string;
}

export default function IconMapper({ name, className }: IconMapperProps) {
  const IconComponent = iconMap[name] || Globe;
  return <IconComponent className={className} />;
}
