import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom/cjs/react-router-dom.min";

import FinancePage from "./components/financial/finance";
import Login from "./components/login/login";
import NotFound from "./components/404/404";
import ClassesPage from "./components/classes/classes";
import EditClassPage from "./components/edit-class/edit-class";
import MyAccount from "./components/my-account/my-account";
import Essentials from "./components/essentials/essentials";
import UsersPage from "./components/users/users";
import SingleUser from "./components/single-user/single-user";
import AllAdminPage from "./components/all-admin/all-admin";
import SingleAdmin from "./components/single-admin/single-admin";
import Banners from "./components/banners/banners";
import AddClass from "./components/add-class/add-class";
import StudentSignupChart from "./components/test-page/test";
import ConfirmClass from "./components/confirm-class/confirm-class";
import Accounting from "./components/accounting/accounting";
import PaymentResults from "./components/payment-results/payment-result";

import "./asset/css/index.scss";
import AllTeachers from "./components/all-teachers/all-teachers";
import SingleTeacher from "./components/single-teacher/single-teacher";
import AllReports from "./components/reports/all-reports";
import Doreha from "./components/doreha/doreha";
import SingleDore from "./components/single-dore/single-dore";
import SpecialKelasses from "./components/special-kelasses/special-kelasses";
import DrSebti from "./components/dr-sebti/dr-sebti";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/finance" component={FinancePage} />
          <Route path="/accounting" component={Accounting} />
          <Route path="/payments" component={PaymentResults} />
          <Route path="/classes" exact component={ClassesPage} />
          <Route path="/special-classes" exact component={SpecialKelasses} />
          <Route path="/classes/:id" component={EditClassPage} />
          <Route path="/doreha" exact component={Doreha} />
          <Route path="/doreha/:id" component={SingleDore} />
          <Route path="/login" component={Login} />
          <Route path="/users" exact component={UsersPage} />
          <Route path="/users/:id" component={SingleUser} />
          <Route path="/account" component={MyAccount} />
          <Route path="/all-teachers" component={AllTeachers} />
          <Route path="/teacher/:id" component={SingleTeacher} />
          <Route path="/essentials" component={Essentials} />
          <Route path="/all-admins" component={AllAdminPage} />
          <Route path="/admin/:id" component={SingleAdmin} />
          <Route path="/banners" component={Banners} />
          <Route path="/reports" component={AllReports} />
          <Route path="/add-new-class" component={AddClass} />
          <Route path="/confirm-class" component={ConfirmClass} />
          <Route path="/dr-sebti" component={DrSebti} />
          {/* <Route path="/test" component={StudentSignupChart} /> */}
          {/* <Route path="/test" component={Login} /> */}
          <Redirect from="/" exact to="/login" />
          {/* <Route path="/not-found" component={MyAccount} /> */}
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
