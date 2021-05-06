import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import Slider from "../slider";

import Wallet from "../../routes/wallet";
import Home from "../../routes/home";
import Faq from "../../routes/faq";
import Contact from "../../routes/contact/contact";
import Identity from "../../routes/identity";
import About from "../../routes/about";
import Category from "../../routes/category";
import Manage from "../../routes/manage";
import Privacy from "../../routes/privacy";
import Submit from "../../routes/submit";
import Terms from "../../routes/terms";

function App() {
  return (
    <BrowserRouter>
      <div className="sb-nav-fixed" id="main-page">
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/identity" component={Identity} />
                <Route exact path="/about" component={About} />
                <Route exact path="/manage" component={Manage} />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/wallet" component={Wallet} />
                <Route exact path="/submit" component={Submit} />
                <Route path="/category/:name" component={Category} />
                <Route component={Home} />
              </Switch>
            </main>
            <footer className="py-2 footer">
              <div className="container-fluid">
                2021 © Hydro App - All rights reserved.
              </div>
            </footer>
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
