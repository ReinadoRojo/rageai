"use client"

import { messageSubmit } from "@/actions/ai";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { MMessage } from "@/types";
import { useState, useTransition } from "react";

export function MessageForm({ history, setHistory }: {history: MMessage[], setHistory: (value: MMessage[]) => void}) {
  const [canSend, setCanSend] = useState(false)
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState("")

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      startTransition(() => {
        const rawHistory = JSON.stringify(history)
        messageSubmit(message, rawHistory).then(response => {
          if(!response.success) return; // Avoid updating failing responses
          setHistory(response.history)  // Update history
          setMessage("")                // Reset form input
        }).catch(e => {
          console.log(e)
        })
      })
    }}>
      <InputGroup>
        <InputGroupTextarea 
          placeholder="Ask, Search or Chat..."
          maxLength={500}
          onChange={(e) => {
            const val = e.target.value

            setMessage(val)

            if(val.length <= 0 || val.length > 500) {
              setCanSend(false)
              return;
            }

            setCanSend(true)
          }}
          value={message}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant={(!canSend || pending) ? 'dashed' : 'default'}
            className="rounded-full ml-auto cursor-pointer"
            size="sm"
            disabled={!canSend || pending}
            type="submit"
          >
            <span>Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}