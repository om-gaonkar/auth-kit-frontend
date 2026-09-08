import { useState } from "react";

interface UserAvatarProps {
  email?: string;
  avatar?: string;
}

export function UserAvatar({ email, avatar }: Readonly<UserAvatarProps>) {
  const initial = email?.charAt(0).toUpperCase() || "U";

  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground">
      {avatar && !imageError ? (
        <img
          src={avatar}
          alt=""
          className="size-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initial
      )}
    </div>
  );
}
