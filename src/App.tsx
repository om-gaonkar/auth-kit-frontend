import AppRouter from "./app/router/AppRouter";
import { AppToaster } from "./components/common/Toaster/AppToaster";

function App() {
  return (
    <div>
      <AppToaster />
      <AppRouter />
    </div>
  );
}

export default App;
