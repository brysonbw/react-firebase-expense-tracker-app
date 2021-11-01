import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navigation from "./components/Navigation";
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

// css
import './index.css';



function App() {
    const { authIsReady, user } = useAuthContext()

  return (
    <>
    {authIsReady && ( 
  <Router>
    {/* Navigation */}
      <Navigation />


   {/* Routes */}
      <Switch>
      <Route exact path="/">
          {!user && <Redirect to='/login' />}
          {user && <Home />}
        </Route>

        <Route path="/login">
          {user && <Redirect to='/' />}
          {!user && <Login />}
        </Route>

        <Route path="/signup">
          {user && <Redirect to='/' />}
          {!user && <Signup />}
        </Route>

        <Route path="*">
            <Redirect to='/'/>
          </Route>

      </Switch>


      </Router>
      )}
    </>
  );
}

export default App;
