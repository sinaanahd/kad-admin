import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';

import FinancePage from './components/financial/finance';
import Login from './components/login/login';
import NotFound from './components/404/404';
import ClassesPage from './components/classes/classes';
import EditClassPage from './components/edit-class/edit-class';

import './asset/css/index.scss';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/finance" component={FinancePage} />
        <Route path="/classes" exact component={ClassesPage} />
        <Route path="/classes/:id"  component={EditClassPage} />
        <Route path="/login" component={Login} />
        <Redirect from="/" exact to="/login" />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
