import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class DatePanel extends React.Component {

  state = {
    startDate: new Date()
  };
  handleChange = date => {
    this.setState({startDate:date},
     this.sendDate(date))
  };


  sendDate = (date) => {
    this.props.parentCallback(date)
  }


  render() {
      return (
<div className='row'>
        <div className=" col-md-2" style={{backgroud:'black'}} >
            <div className="card-img align-items-center text-center">
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            onSelect={(date )=>{ this.setState({startDate:date},this.sendDate(date))}}
            inline
            fixedHeight
            />
        </div>
      </div>

      <h3 className='col-md-3 text-light '>
          There are so many hazardous asteroids 
          passing by the earth, pick a date, we will show you 
          the the rank of the Hazardous Asteroids 
      </h3>


      <div className=" mb-3 col-md-6">
        <div className="card-img align-items-center text-center">
        <iframe width="800" height="205" src="https://www.youtube.com/embed/FiNU1BwNH5I" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay>

        </iframe>
        </div>
      </div>
    </div>
    )
  }
}


export default DatePanel