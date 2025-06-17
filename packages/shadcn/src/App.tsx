import { Button } from '@lowcode/shadcn/components/ui/button'

function App() {
  return (
    <div className="container m-auto mt-10">
      <Button variant={'destructive'} size={'lg'} className="hover:bg-secondary/80">
        test
      </Button>
    </div>
  )
}

export default App
