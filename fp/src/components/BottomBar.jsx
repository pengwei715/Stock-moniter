import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Chart from '@/components/Chart';
import { getData, getNews} from "@/components/utils";
import {TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {

    _isMounted = false;

	componentDidMount() {
        this._isMounted = true;
		getData(this.props.lab).then(data => {
			this.setState({ data })
		})
    }
    componentWillReceiveProps(nextProps){
        if(! this._isMounted){return}
        if(this.props.lab !== nextProps.lab){
           this.setState({
              lab: nextProps.lab
           })
           getData(this.props.lab).then(data => {
			this.setState({ data })
		    })
        }
     }

     componentWillUnmount() {
        this._isMounted = false;
    }

	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (	
					<TypeChooser>
						{type => <Chart type={type} data={this.state.data} />}
					</TypeChooser>
		)
	}
}

class News extends React.Component {

    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
		getNews(this.props.lab).then(data => {
			this.setState({ data })
		})
    }
    
    componentWillReceiveProps(nextProps){
        if(! this._isMounted){return}
        if(this.props.lab !== nextProps.lab){
           this.setState({
              lab: nextProps.lab
           })
           getNews(this.props.lab).then(data => {
			this.setState({ data })
		    })
        }
     }

     componentWillUnmount() {
        this._isMounted = false;
    }

	render() {
		if (this.state == null) {
			return <div>Loading...</div>
        }
        console.log(this.state)
		return (
                <div className= 'card text-white bg-primary h-100'>
                    <h3 className='text-center '>
                        Latest News
                    </h3>
                    <h5 className='text-center '>
                            {this.state.data[0].headline}
                    </h5>
                    <div >
                        {this.state.data[0].summary}...
                    </div>
                    <a href={this.state.data[0].url}>more</a>
                </div>        
		)
	}
}

class SearchBox extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            term: 'ibm'
        }  
    }
  
    handleChange(e) {
      this.setState({term:e.target.value});
    }
  
    handleSubmit(e) {
      e.preventDefault()
      this.props.submitHandler(this.state.term)
    }

    render(){  
        return (
        <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input onChange={(e)=>this.handleChange(e)} value={this.state.term} className="p-1 ml-3" placeholder="Search by symbol..."></input>
        </form>
      )
    }
  }

class BottomBar extends React.Component {
    constructor(){
        super()
        this.state = {
            lab: 'ibm'
        }
    }

    handleSearch(term) {
        this.setState({lab:term})
      }

    render() {
        return(
            <div>
                <div className='card-deck'> 
                    <div className='col-md-8 bg-light card'>
                        <ChartComponent lab = {this.state.lab}/>
                        <SearchBox submitHandler = {(e) => this.handleSearch(e)}/>
                    </div> 
                    <div className='col-md-4 card bg-primary'>
                        <News lab={this.state.lab}/>
        
                    </div>
                </div>
            </div>
        );

    }
}

export default BottomBar;