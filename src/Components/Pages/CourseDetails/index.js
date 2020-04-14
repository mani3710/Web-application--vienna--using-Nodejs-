import React, { Component } from 'react';
import './css/main.css';
import './css/util.css';
import imageIcon from './images/img-01.png';
import Undraw from 'react-undraw';
import LoadingOverlay from 'react-loading-overlay';
import data from '../../GeneralComponents/index';
import { Redirect, Link } from 'react-router-dom';
import Api from '../../Api';
import randomID from '@thewizard0f0z/randomid-generator';
import Modal from 'react-awesome-modal';
import API from '../../Api';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
			isScurityText: true,
			isshowError: false,
			errorMsg: "",
			isSpinnerVisible: false,
			isloggedIn: false,
			isLoggedOut: false,
			courseID: props.match.params.id,
			couserDetails: {}
		}
		console.log("props", props);
		debugger;
		this.getData();
	}

	componentWillMount() {
		var userData = localStorage.getItem("@randomId");
		console.log("user", userData)
		if (!(userData)) {
			this.setState({ isLoggedOut: true });
		}

	}
	getData() {


		this.setState({ isSpinnerVisible: true });
		API.getCourseDetails(this.state.courseID)
			.then(res => res.json())
			.then((responseJson) => {
				console.log("respose", responseJson);
				this.setState({ couserDetails: responseJson.details })
				debugger;
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
									<img
										src={this.state.couserDetails.thumbnail}
									/>
									<div style={{ textAlign: "center", marginTop: 15 }}>
										<button
											type="button" class="btn btn-danger">
											<Link 
											style={{flex:1,width:"100%",height:"100%",color:"white"}}
											to={`/video/${this.state.courseID}`} >
												Play
					</Link>

										</button>
									</div>

								</div>

								<form class="login100-form validate-form">
									<span class="login100-form-title" style={{ marginTop: -100 }}>
										{this.state.couserDetails.name}
									</span>
									<div>
										<label> Publisher name : <span style={{ fontWeight: "bold" }}>{this.state.couserDetails.publisherName}</span></label>
									</div>
									<div>
										<label> Date         <span style={{ fontWeight: "bold", marginLeft: "2rem" }}>:  {this.state.couserDetails.publishAt}</span></label>
									</div>
									<div>
										<label>     <span style={{ fontWeight: "bold" }}>description </span></label>
										<p><span style={{ marginLeft: 40 }}></span>{this.state.couserDetails.description}</p>
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
