"use client"

import { messageSubmit } from "@/actions/ai";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { MMessage } from "@/types";
import { FormEvent, KeyboardEvent, KeyboardEventHandler, Ref, useRef, useState, useTransition } from "react";

export function MessageForm({ history, setHistory }: {history: MMessage[], setHistory: (value: MMessage[]) => void}) {
  const [canSend, setCanSend] = useState(false)
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState("")

  const formRef = useRef<HTMLFormElement | null>(null)

  const onFormSubmit = (e: FormEvent) => {
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
  }

  // Source - https://stackoverflow.com/a
  // Posted by wasserholz
  // Retrieved 2025-12-26, License - CC BY-SA 4.0
  const enterToSubmit = (e: KeyboardEvent) => {
    if(e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form onSubmit={onFormSubmit} ref={formRef}>
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
          onKeyDown={enterToSubmit}
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