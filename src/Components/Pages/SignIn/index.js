import React, { Component } from 'react';
import './css/main.css';
import './css/util.css';
import imageIcon from './images/img-01.png';
import Undraw from 'react-undraw';
import LoadingOverlay from 'react-loading-overlay';
import data from '../../GeneralComponents/index';
import {Redirect} from 'react-router-dom';
import Api from '../../Api';
import randomID from '@thewizard0f0z/randomid-generator';
import Modal from 'react-awesome-modal';

export default class index extends Component {
	constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            isScurityText: true,
            isshowError: false,
            errorMsg: "",
			isSpinnerVisible:false,
			isloggedIn:false
		}
		
	}
	
	componentWillMount(){
		var userData=localStorage.getItem("@randomId");
		console.log("user",userData)
		if(userData){
			debugger;
			this.setState({isloggedIn:true});
		}
	}
    onSignIn(e) {
		e.preventDefault();
        var { user, password } = this.state;
        this.setState({ isshowError: false,isSpinnerVisible:true });
        if (user && password) {
            this.setState({ errorMsg: "" });
            Api.logInAPI(user, password)
                .then(res => res.json())
                .then((responsejson) => {
                    console.log("response", responsejson);
                    this.setState({isSpinnerVisible:false})
                    if (responsejson.error) {
                        this.setState({ isshowError: true, errorMsg: responsejson.error })
                    }else{
                        // AsyncStorage.setItem("@userId",responsejson.id)
                        // .then(res=>{
                        //     this.props.navigation.navigate("BottomNav");
						// })
						localStorage.setItem("@randomId",responsejson.id)
						this.setState({isloggedIn:true})
                    }
                }).catch(Error => {
                    this.setState({isSpinnerVisible:false})
                    console.log("error in login", Error);
                })
        } else {
            this.setState({ isshowError: true, errorMsg: "Empty field !",isSpinnerVisible:false });
        }
	}
	logOutFunc() {
		if (this.state.isloggedIn) {
			debugger;
		  return <Redirect to="/home" />
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
			   color={data.spinnerColor}
				>
                <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
                <Undraw name="alien-science" />
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title">
						Vienna
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input
						 class="input100" 
						 type="text"
						  name="email" 
						  placeholder="Email"
						  value={this.state.user}
						  onChange={(e)=>{this.setState({user:e.target.value})}}
						  />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input 
						class="input100" 
						type="password"
						 name="pass" 
						 placeholder="Password"
						 value={this.state.password}
						onChange={(e)=>{this.setState({password:e.target.value})}}
						 />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<div style={{textAlign:"center",marginTop:10}}>
		<h4 style={{fontSize:10,color:"red",fontWeight:"bold"}}>{this.state.errorMsg}</h4>
					</div>
					
					
					<div class="container-login100-form-btn">
						<button 
						onClick={(e)=>{this.onSignIn(e)}}
						class="login100-form-btn" >
						Login
						</button>
					</div>

					

					<div class="text-center p-t-136">
						<a class="txt2" href="/registration">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true" style={{marginLeft:10}}></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
            </LoadingOverlay>  
			{this.logOutFunc()}  
            </div>
        )
    }
}
