import { Button } from "./components/ui/button";
import useFuturama from "./hooks/useFuturama";

function App() {
  const {fetchFuturama} = useFuturama();
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={fetchFuturama}>Click me</Button>
    </div>
    </>
  );
}

export default App;
