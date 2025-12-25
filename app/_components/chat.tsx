"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { MessageForm } from "./message-form";
import { MessagesBoard } from "./messages";
import { useEffect, useState } from "react";
import { MMessage } from "@/types";

export function Chat() {
  const [history, internalSetHistory] = useState<MMessage[]>([]);

  useEffect(() => {
    const rawHist = window.sessionStorage.getItem('messages');
    if(rawHist) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        internalSetHistory(JSON.parse(rawHist));
      } catch (e) {
        console.error("Error parsing history!", e)
      }
    }
  }, [])

  const setHistory = (hist: MMessage[]) => {
    if(!window) return
    internalSetHistory(hist)
    console.log(hist)
    window.sessionStorage.setItem('messages', JSON.stringify(hist))
  }

  return (
    <main className="py-8 flex flex-col space-y-4 w-full h-[calc(100vh-10.5rem)]">
      <MessagesBoard messages={history} />
      <footer className="mt-auto flex flex-col space-y-2">
        <div className="flex">
          <Button variant={"ghost"} size={"icon-sm"} className="ml-auto" title="Restart chat">
            <RotateCcw />
          </Button>
        </div>
        <MessageForm history={history} setHistory={setHistory} />
      </footer>
    </main>
  )
}