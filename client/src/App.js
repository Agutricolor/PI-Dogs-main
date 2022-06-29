import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./components/Home/home";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/dogs/:id" component={Detail} />
        <Route path="/dog" />
      </Switch>
    </div>
  );
}

export default App;
