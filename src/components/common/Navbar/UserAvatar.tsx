interface UserAvatarProps {
  email?: string;
}

export function UserAvatar({ email }: Readonly<UserAvatarProps>) {
  const initial = email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
      {initial}
    </div>
  );
}
