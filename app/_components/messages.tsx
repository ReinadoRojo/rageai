"use client"

import { cn } from "@/lib/utils";
import { MD5 } from "@/lib/md5";
import { type MMessage } from "@/types";

const ChatMessage = ({
  role,
  content
}: {role: "user" | string; content: string }) => (
  <div className="flex flex-row">
    <div className={cn("", (role == "user") ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-secondary-foreground text-secondary")}>
      <p>
        {content}
      </p>
    </div>
  </div>
)

export function MessagesBoard({messages}: {messages: MMessage[]}) {
  return (
    <>
      {messages.map(msg => {
        if(!msg.content || typeof msg.content !== "string") return
        return (
          <ChatMessage key={MD5(`${msg.content}+${msg.role}+${msg.timestamp}`)} role={msg.role} content={msg.content}/>
        )
      })}
    </>
  )
}