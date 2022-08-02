import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";

function App() {
  return (
    <>
      <Route path={"/"} exact>
        <Landing />
      </Route>
      <Route path={"/home"} exact>
        <Home />
      </Route>
      <Route path={"/details/:id"} exact>
        <Detail />
      </Route>
      <Route path={"/create"} exact>
        <Create />
      </Route>
    </>
  );
}

export default App;
