import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./components/Home/home";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/dogs/:id" component={Detail} />
        <Route path="/dog" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
