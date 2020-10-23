import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import Slider from '../slider';

import Wallet from '../../routes/wallet';
import Home from '../../routes/home';
import Faq from '../../routes/faq';
import Contact from '../../routes/contact/contact';
import Identity from '../../routes/identity';
import About from '../../routes/about';
import Category from '../../routes/category';
import Manage from '../../routes/manage';
import Privacy from '../../routes/privacy';
import Submit from '../../routes/submit';
import Terms from '../../routes/terms';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Slider />
        <Container fluid className="app">
          <Row>
            <Col xs="12" sm="12" md="4" lg="4" xl="3" className="nopadding">
              <Sidebar />
            </Col>
            <Col xs="12" sm="12" md="8" lg="8" xl="9" className="app__content">
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
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
