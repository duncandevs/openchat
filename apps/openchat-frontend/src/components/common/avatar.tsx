import {
    Avatar as AvatarPrimitive,
    AvatarImage,
} from "@/components/ui/avatar";
import BoringAvatar  from "boring-avatars";
  

interface AvatarProps {
  className?: string;
  src?: string
};

export function Avatar({ src, className }: AvatarProps){
    return (
      <AvatarPrimitive className={className}>
        <AvatarImage src={src} alt="@shadcn" />
        <BoringAvatar variant="beam" />
      </AvatarPrimitive>
    )
}
  