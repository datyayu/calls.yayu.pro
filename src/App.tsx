import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavbarModule } from "./modules";
import { routes } from "./routes";
import "./App.css";

const Navbar = NavbarModule.MainContainer;

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />

      <div className="content">{routes}</div>
    </div>
  </BrowserRouter>
);

export default App;
