import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { urlForAllNeo, getLastweek } from "@/api";

class Discription extends React.Component {
  _mounted = false;
  constructor() {
    super();
    this.state = {
      date: new Date(),
      begin: 0,
      end: 0,
      numTotal: 0,
      numDanger: 0,
      numOversize: 0,
      dangers: []
    };
  }
  componentDidUpdate(prevProps) {
    console.log("in update");
    if (prevProps.time !== this.props.time) {
      this.setState({ date: this.props.time }, this.componentDidMount());
    }
  }

  sendData = () => {
    this.props.callbackFromParent(this.state.dangers);
  };

  componentDidMount() {
    this._mounted = true;
    var dates = getLastweek(this.props.time);
    var today = new Date(this.props.time.getTime());
    var st = today.toISOString().substring(0, 10);
    this.setState({ begin: st });
    today.setDate(today.getDate() - 6);
    var ed = today.toISOString().substring(0, 10);
    this.setState({ end: ed });
    var url = urlForAllNeo(st, ed);
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (this._mounted) {
          this.setState({ numTotal: data.element_count });
        }
        return data.near_earth_objects;
      })
      .then(neos => {
        var neoLst = [];
        var num1 = 0;
        var num2 = 0;
        dates.forEach(date => {
          if (neos[date]) {
            for (const item of neos[date]) {
              if (item.is_potentially_hazardous_asteroid) {
                this.setState({ numDanger: ++num1 });
                neoLst.push(item);
                this.setState({ dangers: neoLst });
                if (
                  item.estimated_diameter.meters.estimated_diameter_max > 100
                ) {
                  this.setState({ numOversize: ++num2 });
                }
              }
            }
          }
        });
      });
    console.log(this.state.dangers);
  }

  componentWillUnmount() {
    this._mounted = false;
  }
  render() {
    return (
      <div className="card-deck" onMouseMove={() => this.sendData()}>
        <div className="card text-white bg-dark mb-3">
          <h3 className="card-header text-center">
            Total Number of Asteroids of the week
          </h3>
          <div className="card-body">
            <h1 className="card-text text-center text-danger">
              {this.state.numTotal}
            </h1>
          </div>
          <div className="card-footer text-center">
            Total number from {this.state.end} to {this.state.begin}
          </div>
        </div>
        <div className="card text-white bg-dark mb-3">
          <h3 className="card-header text-center">
            Number of Hazardous Asteroids
          </h3>
          <div className="card-body">
            <h1 className="card-text text-center text-danger">
              {this.state.numDanger}
            </h1>
          </div>
          <div className="card-footer text-center">
            NASA label Hazardous from {this.state.end} to {this.state.begin}
          </div>
        </div>
        <div className="card text-white bg-dark mb-3">
          <h3 className="card-header text-center">
            Number of Over-sized Asteroids
          </h3>
          <div className="card-body">
            <h1 className="card-text text-center text-danger">
              {this.state.numOversize}
            </h1>
          </div>
          <div className="card-footer text-center">
            diamter > 100 meters from {this.state.end} to {this.state.begin}
          </div>
        </div>
      </div>
    );
  }
}

export default Discription;
