import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Header from '../../GeneralComponents/Header';
import '../SignIn/css/main.css';
import '../SignIn/css/util.css';



export default class index extends Component {
    constructor(props){
        super(props);
        this.state={
            isSpinnerVisible:false,
            isLoggedOut: false,
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
    render() {
        return (
            <div>
                 <LoadingOverlay
          active={this.state.isSpinnerVisible}
          spinner

        >
               <Header/>
               <div 
               style={{ flexDirection: "column"}}
               class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
			
				<div style={{marginTop:-150}}>
                    <h2>About</h2>
                    <p>
                    Vienna is an online learning platform aimed at professional adults and students, developed in May 2010. As of Jan 2020, the platform has more than 50 million students and 57,000 instructors teaching courses in over 65 languages. There have been over 295 million course enrollments. Students and instructors come from 190+ countries and 2/3 of students are located outside of the U.S. Udemy also has over 5,000 enterprise customers and 80% of Fortune 100 companies use Udemy for employee upskilling.

Students take courses largely as a means of improving job-related skills.[2] Some courses generate credit toward technical certification. Udemy has made a special effort to attract corporate trainers seeking to create coursework for employees of their company.[3] As of 2020, there are more than 150,000 courses on the website
                    </p>
                </div>
			</div>
		</div>
	</div>
                </LoadingOverlay>
                {this.logOutFunc()}
            </div>
        )
    }
}
