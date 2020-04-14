import React, { Component } from 'react';
import Header from '../../GeneralComponents/Header';
import SearchField from "react-search-field";
import LoadingOverlay from 'react-loading-overlay';
import data from '../../GeneralComponents/index';
import API from '../../Api';
import {Link} from 'react-router-dom';
import './index.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpinnerVisible: false,
            resultDataList: [],
            dataList: [],
            searchText: "",
            isLoggedOut: false,

        }
        this.getData();
    }
    getData() {
        this.setState({ isSpinnerVisible: true });
        API.getCourseForSearch()
            .then((res) => res.json())
            .then((response) => {
                console.log("response", response.courses);
                debugger;
                this.setState({ isSpinnerVisible: false, resultDataList: response.courses, dataList: response.courses });
            })
    }
    searchForTheText(text) {
        var textLow = text.toLowerCase();
        console.log("search  ", textLow);
        this.setState({ resultDataList: [] });
        var result = [];
        for (var data of this.state.dataList) {
            var name = data.name.toLowerCase();
            var n = name.search(textLow);
            if (n >= 0) {
                result.push(data);
            }
        }
        this.setState({ resultDataList: result });

    }
    isShowData(){
        if(this.state.resultDataList){
             return(
                 <div style={{overflow:"auto",width:"100vw",marginLeft:"2rem" ,marginTop:"1rem",}}>
                    {this.state.resultDataList.map((course)=>
                      <Link  
                      to={`/course/${course.id}`}
                     class="card" style={{ width: "18rem",float:"left",marginLeft:"2rem",marginRight:"2rem",marginBottom:"1rem",height:"20rem" }}>
                       <img src={course.thumbnail} class="card-img-top" alt="..." style={{height:150}} />
                       <div class="card-body">
                   <h5 class="card-title">{course.name}</h5>
                         <p class="card-text" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{course.description}</p>
                        
                       </div>
                     </Link>
                    )}
                 </div>
             );
        }else{
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
                    <Header />
                    <div
                        style={{
                            background: "#bfec99",
                            width: "85%",
                            padding: "7px 47px",
                            borderRadius: "37px",
                            position: "relative",
                            height: "5rem",
                            marginTop: "1rem",
                            marginLeft: "6rem",
                            textAlign: "center"


                        }}
                    >
                        <input
                            type="text"
                            value={this.state.searchText}
                            onChange={(e) => { 
                                this.setState({ searchText: e.target.value })
                                 this.searchForTheText(e.target.value)
                            }}
                            placeholder="Enter the name"
                            style={{ width: "85%", height: "100%", backgroundColor: "transparent", float: "left" }}
                        />
                        <i class="fa fa-search" aria-hidden="true" style={{ width: "8rem", height: 100, marginTop: "1.5rem" }}></i>


                    </div>
                    
                      {this.isShowData()}
                    
                </LoadingOverlay>
            </div>
        )
    }
}
