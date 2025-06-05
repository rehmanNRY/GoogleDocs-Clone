"use client"

import { ClientSideSuspense } from "@liveblocks/react";
import { Separator } from "@/components/ui/separator";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AVATAR_SIZE = 32;
const AVATAR_SPACING = 8;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  )
}

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <div className="flex">
          {currentUser && (
            <Avatar
              src={currentUser.info.avatar}
              name="You"
              isCurrentUser={true}
            />
          )}
          {users.map(({ connectionId, info }) => (
            <Avatar
              key={connectionId}
              src={info.avatar}
              name={info.name}
              isCurrentUser={false}
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </div>
  )
}

interface AvatarProps {
  src: string;
  name: string;
  isCurrentUser: boolean;
}

const Avatar = ({ src, name, isCurrentUser }: AvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              marginLeft: isCurrentUser ? 0 : -AVATAR_SPACING
            }}
            className={`
              relative flex shrink-0 place-content-center 
              border-2 border-background rounded-full 
              bg-muted/50 backdrop-blur-sm
              transition-all duration-200 ease-in-out
              hover:scale-110 hover:z-10
            `}
          >
            <img
              src={src}
              alt={name}
              className="size-full rounded-full object-cover"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}