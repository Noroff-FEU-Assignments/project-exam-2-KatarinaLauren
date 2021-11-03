import Navigation from "./components/layout/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Accommodations from "./components/accommodations/Accommodations";
import Booking from "./components/booking/Booking";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/Admin";
import Footer from "./components/layout/Footer";
import Inspiration from "./components/inspiration/Inspiration";
import Details from "./components/accommodations/Details";
import "./sass/style.scss";

function App() {
  return (
    <Router>
      <div class="wrapper">
        <Navigation />

        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/accommodations" component={Accommodations} />
            <Route path="/booking" component={Booking} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route path="/inspiration" component={Inspiration} />
            <Route path="/detail/:id" component={Details} />
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
