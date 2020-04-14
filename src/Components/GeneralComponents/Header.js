import React, { Component } from 'react'
import './Header.css';
import circleLogo from '../Assets/circle_vienna.png';
import data from './index';
import Modal from 'react-awesome-modal';
import {Redirect} from 'react-router-dom';
import Undraw from 'react-undraw';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLogOut: false,
      isLoggedOut:false
    }
  }
  componentWillMount() {
    var userData = localStorage.getItem("@randomId");
    console.log("user", userData)
    if (!(userData)) {
      this.setState({ isLoggedOut: true });
    }

  }
  logOutFunc() {
    if (this.state.isLoggedOut) {
      debugger;
      return <Redirect to="/login" />
    } else {
      return null;
    }
  }
  LogOutDemo() {
    localStorage.removeItem("@randomId");
    this.setState({ isLoggedOut: true })
  }
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#" style={{ fontSize: 25, fontWeight: "bold", color: "white", fontFamily: "Verdana, sans-serif" }}>
            <img src={data.circleLogo} style={{ width: 50, height: 50, marginRight: 15 }}></img>
            Vienna</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup" style={{ marginLeft: "auto" }}>
            <div class="navbar-nav">
              <a class="nav-item nav-link navOption" href="/home">Home</a>
              <a class="nav-item nav-link" href="/search">Search</a>
              {/* <a class="nav-item nav-link" href="/others"> Menu</a> */}
              <a class="nav-item nav-link" href="/about"> About</a>
              <div
              style={{fontSize:15,cursor:"pointer"}}
              onClick={()=>{this.setState({isShowLogOut:true})}}
              class="nav-item nav-link" > Logout</div>
            </div>
          </div>
        </nav>
        <Modal visible={this.state.isShowLogOut} width="500" height="430" effect="fadeInUp">
          <div>
            <div style={{ marginLeft: "30px", marginTop: 10, textAlign: "center", fontWeight: "bold" }}>Do you want Logout ?</div>
            <div style={{ textAlign: "center" }}>
              <Undraw
                style={{ height: 300, width: 300 }}
                name="a-day-at-the-park"

              />
              <div style={{ marginTop: 10, textAlign: "center", color: "gray", fontSize: 18 }}>Think more</div>
            </div>
            <div style={{ textAlign: "end", marginRight: 15 }}>
            <button
                type="button"
                onClick={()=>{this.setState({isShowLogOut:false})}}
                class="btn btn-danger"
                style={{ color: "white",marginRight:15 }}
                title={{ color: "white" }}


              >
               cancel
              </button>
              <button
                type="button"
                onClick={()=>{this.LogOutDemo()}}
                class="btn btn-success"
                style={{ color: "white" }}
                title={{ color: "white" }}


              >
               ok
              </button>
             

            </div>

          </div>
        </Modal>
        {this.logOutFunc()}
      </div>
    )
  }
}
