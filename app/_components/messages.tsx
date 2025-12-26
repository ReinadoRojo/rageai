"use client"

import { cn } from "@/lib/utils";
import { MD5 } from "@/lib/md5";
import { type MMessage } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

const ChatMessage = ({
  role,
  content
}: {role: "user" | string; content: string }) => (
  <div className="flex flex-row mt-2">
    <div className={cn("px-4 py-2 rounded-xl", (role == "user") ? 
      "ml-auto bg-primary text-primary-foreground" : 
      "mr-auto bg-accent text-foreground"
      )}>
      <p>
        {content}
      </p>
    </div>
  </div>
)

export function MessagesBoard({messages}: {messages: MMessage[]}) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [messages])

  return (
    <ScrollArea className="h-[calc(100%-10rem)] space-y-2">
      {messages.map(msg => {
        if(!msg.content || typeof msg.content !== "string") return
        if(msg.role === "system") return       
        return (
          <ChatMessage key={MD5(`${msg.content}+${msg.role}+${msg.timestamp}`)} role={msg.role} content={msg.content} />
        )
      })}
      <div style={{ width: "1px", height: "1px" }} ref={bottomRef}></div>
    </ScrollArea>
  )
}