import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" />
        <Route path="/home" />
        <Route path="/dogs/:id" />
        <Route path="/dog" />
      </Switch>
    </div>
  );
}

export default App;
