import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import SignIn from './Components/Pages/SignIn';
import Home from './Components/Pages/Home';
import SigUp from './Components/Pages/SignUp';
import Search from './Components/Pages/Search';
import Others from './Components/Pages/Others';
import CourseDetail from './Components/Pages/CourseDetails';
import VideoPlayer from './Components/Pages/VideoPlayer';
import About from './Components/Pages/About';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  isLoggedInAlready() {
    const isUSer = localStorage.getItem("userIDVienna");
    console.log("userName", isUSer);
    if (isUSer) {
     
      return true;
    } else {
      
      return false
    }
  }

  render() {
    return (
     <Router>
       <Switch>
       <Route exact path="/" render={() => (
            this.isLoggedInAlready() ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
              )
          )} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={SignIn} />
          <Route path="/registration" component={SigUp}/>
          <Route path="/search" component={Search}/>
          <Route path="/others" component={Others}/>
          <Route path="/course/:id" component={CourseDetail}/>
          <Route path="/video/:id" component={VideoPlayer}/>
          <Route path="/about" component={About}/>
          <Route component={SignIn}/>
       </Switch>
     </Router>
    )
  }
}
