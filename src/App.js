import Navigation from "./components/layout/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Accommodations from "./components/accommodations/Accommodations";
import Booking from "./components/booking/Booking";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/login/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddProperty from "./components/admin//AddProperty";
import RemoveProperty from "./components/admin/RemoveProperty";
import ReadMessages from "./components/admin/messages/ReadMessages";
import ReadEnquiries from "./components/admin/enquiries/ReadEnquiries";
import Footer from "./components/layout/Footer";
import Inspiration from "./components/inspiration/Inspiration";
import Details from "./components/accommodations/details/Details";
import { AuthProvider } from "./context/AuthContext";
import { GetData } from "./utilities/GetData";
import { BaseUrl } from "./constants/api";
import { saveToStorage } from "./utilities/localStorage/localStorageFunctions";
import { accommodationKey } from "./constants/keys";
import { getFacilities } from "./constants/facilities";
import TestPage from "./TestPage";
import "./sass/style.scss";

getFacilities();

function App() {
  const { data } = GetData(BaseUrl + "/accommodations");
  saveToStorage(accommodationKey, data);

  return (
    <AuthProvider>
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
              <Route path="/dashboard" component={AdminDashboard} />
              <Route path="/inspiration" component={Inspiration} />
              <Route path="/detail/:id" component={Details} />
              <Route path="/add" component={AddProperty} />
              <Route path="/remove" component={RemoveProperty} />
              <Route path="/enquiries" component={ReadEnquiries} />
              <Route path="/messages" component={ReadMessages} />
              <Route path="/test" component={TestPage} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
