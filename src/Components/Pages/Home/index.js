import React, { Component } from 'react';
import Header from '../../GeneralComponents/Header';
import Undraw from 'react-undraw';
import LoadingOverlay from 'react-loading-overlay';
import data from '../../GeneralComponents/index';
import { Redirect,Link } from 'react-router-dom';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import API from '../../Api';
import Wal from '../../Assets/wal.jpg';
import './index.css';
import HorizontalScroll from 'react-scroll-horizontal'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      isSpinnerVisible: false,
      id: localStorage.getItem("@randomId"),
      homePageData: {}
    }
    this.getHomePageDataFunc();
  }
  componentWillMount() {
    var userData = localStorage.getItem("@randomId");
    console.log("user", userData)
    if (!(userData)) {
      this.setState({ isLoggedOut: true });
    }

  }

  getHomePageDataFunc() {
    this.setState({ isSpinnerVisible: true })
    API.getHomePageData(this.state.id)
      .then(res => res.json())
      .then((resposeJson) => {
        console.log("response", resposeJson);
        debugger;
        this.setState({ homePageData: resposeJson, isSpinnerVisible: false });
      })
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
  renderData() {
    if (this.state.homePageData.carosel) {
      return (
        <div style={{marginBottom:30}}>
          <h1 style={{  fontSize: 20, fontWeight: "bold",marginTop:"2rem",marginBottom:"1rem",marginLeft:20 }}>Trending courses :</h1>
         
          <div style={{ width: "95vw", height:300,marginLeft:"4rem" }}>
            <HorizontalScroll>
            {this.state.homePageData.carosel.map((course, index) =>
              <Link  
              
              to={`/course/${course.id}`}
              class="card" style={{ width: "18rem",marginRight:20 }}>
                <img src={course.thumbnail} class="card-img-top"  alt="..." style={{height:150}} />
                <div class="card-body">
            <h5 class="card-title">{course.name}</h5>
                  <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                 <div style={{textAlign:"center"}}>
                 
                 </div>
                </div>
              </Link >)}
              
            </HorizontalScroll>
          </div>
          <h1 style={{  fontSize: 20, fontWeight: "bold",marginTop:"2rem",marginBottom:"1rem",marginLeft:20 }}>Web development :</h1>
         
         <div style={{ width: "95vw", height:300,marginLeft:"4rem" }}>
           <HorizontalScroll>
           {this.state.homePageData.html.map((course, index) =>
             <Link  
             to={`/course/${course.id}`}
             
             class="card" style={{ width: "18rem",marginRight:20 }}>
               <img src={course.thumbnail} class="card-img-top" alt="..." style={{height:150}} />
               <div class="card-body">
           <h5 class="card-title">{course.name}</h5>
                 <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                
               </div>
             </Link>)}
             
           </HorizontalScroll>
         </div>
         <h1 style={{  fontSize: 20, fontWeight: "bold",marginTop:"2rem",marginBottom:"1rem",marginLeft:20 }}>React Native :</h1>
         
         <div style={{ width: "95vw", height:300,marginLeft:"4rem" }}>
           <HorizontalScroll>
           {this.state.homePageData.ReactNative.map((course, index) =>
              <Link  
              to={`/course/${course.id}`}
             class="card" style={{ width: "18rem",marginRight:20 }}>
               <img src={course.thumbnail} class="card-img-top" alt="..." style={{height:150}} />
               <div class="card-body">
           <h5 class="card-title">{course.name}</h5>
                 <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                
               </div>
             </Link>)}
             
           </HorizontalScroll>
         </div>
         <h1 style={{  fontSize: 20, fontWeight: "bold",marginTop:"2rem",marginBottom:"1rem",marginLeft:20 }}>React js :</h1>
         
         <div style={{ width: "95vw", height:300,marginLeft:"4rem" }}>
           <HorizontalScroll>
           {this.state.homePageData.Reactjs.map((course, index) =>
              <Link  
              to={`/course/${course.id}`} 
             class="card" style={{ width: "18rem",marginRight:20 }}>
               <img src={course.thumbnail} class="card-img-top" alt="..."  style={{height:150}}/>
               <div class="card-body">
           <h5 class="card-title">{course.name}</h5>
                 <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                
               </div>
             </Link>)}
             
           </HorizontalScroll>
         </div>
         <h1 style={{  fontSize: 20, fontWeight: "bold",marginTop:"2rem",marginBottom:"1rem",marginLeft:20 }}>Node js :</h1>
         
         <div style={{ width: "95vw", height:300,marginLeft:"4rem" }}>
           <HorizontalScroll>
           {this.state.homePageData.Nodejs.map((course, index) =>
              <Link  
              to={`/course/${course.id}`} 
             class="card" style={{ width: "18rem",marginRight:20 }}>
               <img src={course.thumbnail} class="card-img-top" alt="..." style={{height:150}}/>
               <div class="card-body">
           <h5 class="card-title">{course.name}</h5>
                 <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                
               </div>
             </Link>)}
             
           </HorizontalScroll>
         </div>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.isSpinnerVisible}
          spinner

        >
          <div style={{ overflow: "auto" }}>
            <Header />
            {/* {this.renderData()} */}
            <div>
              <img
                src={Wal}
                style={{ width: "100vw" }}
              />
              {this.renderData()}



            </div>

            {this.logOutFunc()}
          </div>
        </LoadingOverlay>
      </div>
    )
  }
}
