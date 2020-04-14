import React, { Component } from 'react';
import './css/main.css';
import './css/util.css';
import imageIcon from './images/img-01.png';
import Undraw from 'react-undraw';
import LoadingOverlay from 'react-loading-overlay';
import data from '../../GeneralComponents/index';
import { Redirect } from 'react-router-dom';
import Api from '../../Api';
import randomID from '@thewizard0f0z/randomid-generator';
import Modal from 'react-awesome-modal';
import API from '../../Api';
import YouTube from '@u-wave/react-youtube';

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
			couserDetails: {},
			videoList: [],
			currentVideoId: "",
			currentVideoName: "",
			courseID: props.match.params.id,
		}
		console.log("props", props);
		debugger;
		this.getVideoIds();
	}

	componentWillMount() {
		var userData = localStorage.getItem("@randomId");
		console.log("user", userData)
		if (!(userData)) {
			this.setState({ isLoggedOut: true });
		}

	}
	getVideoIds() {
		this.setState({ isSpinnerVisible: true });
		API.getVideos(this.state.courseID)
			.then(res => res.json())
			.then((responseJson) => {
				console.log("res", responseJson);
				debugger;
				var arrRow = [];
				for (var i of responseJson.videoId) {
					arrRow.push(i.rowNo);
				}
				var sortRowArray = arrRow.sort(function (a, b) { return a - b });
				var sortArray = [];
				for (var j of sortRowArray) {
					for (var k of responseJson.videoId) {
						if (k.rowNo == j) {
							sortArray.push(k);
							break;
						}
					}
				}

				this.setState({
					isSpinnerVisible: false,
					videoList: sortArray,
					currentVideoId: sortArray[0].id,
					currentVideoName: sortArray[0].title
				});

			}).catch((error) => {
				console.log("Error", error)
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
			<div >
				<LoadingOverlay
            
					active={this.state.isSpinnerVisible}
					spinner
					color={data.spinnerColor}
				>
					<div class="limiter">
						<div 
						class="container-login100">
							<div
								style={{ flexDirection: "column", marginTop:10 }}
								class="wrap-login100">
								<YouTube
									autoplay
									video={this.state.currentVideoId}
									style={{ height: "25rem", marginTop: -120, marginLeft: 30 }}
								/>
								<div style={{ marginTop: "2rem" }}>
									<h3>{this.state.currentVideoName}</h3>
								</div>
								<div style={{ marginTop: "2rem" }}>
									<h4 style={{color:"gray"}}>Video List :</h4>
								</div>
								<div style={{ marginTop: "2rem",overflow:"auto",marginLeft:"2rem",height:"30rem",borderColor:"gray",borderRadius:10,borderWidth:2 }}>
									{this.state.videoList.map((video)=>
									<div 
									onClick={()=>{this.setState({currentVideoId:video.id,currentVideoName:video.title})}}
									class="card videocard" style={{marginTop:"2rem",cursor: "pointer",borderStyle:"solid"}}>
									  <div style={{marginLeft:"1rem",marginTop:"1rem",marginBottom:"1rem"}}>	{video.title}</div>
									</div>
									)}
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
