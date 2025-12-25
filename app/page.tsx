import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function Home() {
  const d = true

  return (
    <div className="container mx-auto *:border-t *:border-b *:border-dashed *:border-primary-foreground space-y-8 border-l border-r border-dashed">
      <header className="h-12 flex items-center px-4">
        <nav>
          <ul className="flex flex-row space-x-4">
            <li>Obj 1</li>
            <li>Obj 2</li>
            <li>Obj 3</li>
            <li>Obj 4</li>
          </ul>
        </nav>
      </header>
      <main className="py-8 px-4 flex flex-col space-y-4 w-full h-full">
        <header>
          <h1>Ragebait Chat</h1>
        </header>
        <section>
        </section>
        <footer className="mt-auto">
          <form>
            <InputGroup>
              <InputGroupTextarea placeholder="Ask, Search or Chat..." />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  variant={d ? 'dashed' : 'default'}
                  className="rounded-full ml-auto"
                  size="sm"
                  disabled={d}
                >
                  <span>Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form> 
        </footer>
      </main>
      <footer className="px-4 py-6">
        <p className="text-xs text-accent-foreground text-center">
          RageAI. Made with &lt;3 by Ezequiel C. ~ Running on Vercel, commit <span>COMMIT</span>
        </p>
      </footer>
    </div>
  );
}