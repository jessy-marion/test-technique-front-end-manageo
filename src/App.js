import "./assets/styles/base.scss";
import "./App.scss";
import { Window } from "./Components/Window/Window";

function App() {
  return (
    <div className="App">
      <div className="background">
        <Window />
      </div>
    </div>
  );
}

export default App;
