"use client"

import { messageSubmit } from "@/actions/ai";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { useState } from "react";

export function MessageForm() {
  const [canSend, setCanSend] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      messageSubmit(message)
      setMessage("")
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
            variant={!canSend ? 'dashed' : 'default'}
            className="rounded-full ml-auto cursor-pointer"
            size="sm"
            disabled={!canSend}
            type="submit"
          >
            <span>Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}