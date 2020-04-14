import React, { Component } from 'react';
import './css/main.css';
import './css/util.css';
import imageIcon from "./images/img-01.png";
import Undraw from 'react-undraw';
import LoadingOverlay from 'react-loading-overlay';
import {ClimbingBoxLoader} from 'react-spinners';
import data from '../../GeneralComponents/index';
import {StyledLoader} from './Styled';
import API from '../../Api';
import randomID from '@thewizard0f0z/randomid-generator';
import Modal from 'react-awesome-modal';
import {Redirect} from 'react-router-dom';
export default class index extends Component {
	constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            re_password: "",
            phoneNo: "",
            email: "",
            isshowError: false,
            errorMsg: "",
            isloggedIn:false,
            isSpinnerVisible: false,
            isShowSuccessDialog:false
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

	onSignUp(e) {
		e.preventDefault();

        var randomKey = randomID(10)


        var { name, password, re_password, phoneNo, email } = this.state;
        console.log("values", name, password, re_password, phoneNo, email )
        this.setState({ isshowError: false, isSpinnerVisible: true });
        if ((name && password && re_password && phoneNo && email ) && (password == re_password)) {
			debugger;
            this.setState({ errorMsg: "" });
            API.signUpAPI(name, password, email, "343434", phoneNo, randomKey)
                .then(res => res.json())
                .then((responseJson) => {
					debugger;
                    if (responseJson.error) {
                        this.setState({ isshowError: true, errorMsg: responseJson.error });
                    } else {
                        
						console.log("respose in sign up", responseJson);
						localStorage.setItem("@randomId",randomKey)
						this.setState({isShowSuccessDialog:true})
                       
                       
                    }
                    this.setState({ isSpinnerVisible: false })
                }).catch((error)=>{
					debugger;
                    console.log("error is",error);
                    this.setState({isSpinnerVisible:false});
                })



        } else if (password != re_password) {
            this.setState({ errorMsg: "Password is not match ! ", isSpinnerVisible: false });
        }
        else {
            this.setState({ isshowError: true, errorMsg: "Empty field !", isSpinnerVisible: false })
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
					<Undraw name="data-trends" />
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title" style={{marginTop:-120}}>
						Vienna
					</span>

					
					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input 
						class="input100" 
						type="text/number" 
						name="pass" 
						placeholder="user name"
						value={this.state.name}
						onChange={(e)=>{this.setState({name:e.target.value})}}
						/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>
					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input 
						class="input100" 
						type="email" 
						name="pass" 
						placeholder="Email"
						value={this.state.email}
						onChange={(e)=>{this.setState({email:e.target.value})}}
						/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input 
						class="input100" 
						type="number" 
						name="pass"
						placeholder="Phone Number"
						value={this.state.phoneNo}
						onChange={(e)=>{this.setState({phoneNo:e.target.value})}}
						 />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-mobile" aria-hidden="true"></i>
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
					<div  data-validate = "Password is required">
						<input 
						class="input100" 
						type="password" 
						name="pass" 
						placeholder="re-Password"
						value={this.state.re_password}
						onChange={(e)=>{this.setState({re_password:e.target.value})}}
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
						onClick={(e)=>{this.onSignUp(e)}}
						class="login100-form-btn" >
							Register
						</button>
					</div>

					

					<div class="text-center p-t-136">
						<a class="txt2" href="/login">
						<i class="fa fa-long-arrow-left m-l-5" aria-hidden="true" style={{marginRight:10}}></i>
							Back to Login
							
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>


	<Modal visible={this.state.isShowSuccessDialog} width="500" height="430" effect="fadeInUp">
                    <div>
					<div style={{ marginLeft: "30px", marginTop: 10,textAlign:"center",fontWeight:"bold" }}>Start your career</div>
                       <div style={{textAlign:"center"}}>
					   <Undraw 
					   style={{height:300,width:300}}
					   name="book-lover"
					   
					   />
					   <div style={{  marginTop: 10,textAlign:"center",color:"gray",fontSize:18 }}>All the best</div>
					   </div>
					   <div style={{textAlign:"end",marginRight:15}}>
					   <button 
					   type="button"
						class="btn btn-success"
						style={{color:"white"}}
						title={{color:"white"}}
						

						>
							<a
							style={{color:"white"}}
							 href="/home" >Go Home</a>
							</button>
					  
					   </div>
                        
                    </div>
                </Modal>
  
</LoadingOverlay>
            {this.logOutFunc()}
                
            </div>
        )
    }
}
