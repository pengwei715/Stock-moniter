import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import ReactWordcloud from 'react-wordcloud'

class Neos extends React.Component {

  static options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [12, 300],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  }

  state={
    data : [{name:"(2016 TR54)", nasa_jpl_url:"http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3760684", estimated_diameter:{meters:{estimated_diameter_max:200}}}],
    clean_data: null
  }
  componentDidUpdate(prevProps){
    console.log("in update")
    if (prevProps.data !== this.props.data ) {
      this.setState(
        {data: this.props.data,
        clean_data: this.clean(this.props.data)
        },this.componentDidMount())     
      }   
  }

  clean(data){
    var res = []
      data.forEach(element => {
        res.push({text: element.name, value: element.estimated_diameter.meters.estimated_diameter_max}) 
  })
  return res
}

  componentDidMount() {
    if(this.state.data){
      this.state.data.sort((a,b) =>(a.estimated_diameter.meters.estimated_diameter_max>b.estimated_diameter.meters.estimated_diameter_max)?-1:1)
      var res = []
      this.state.data.forEach(element => {
        res.push({text: element.name, value: element.estimated_diameter.meters.estimated_diameter_max})  
    })
    console.log(res)
    this.setState({clean_data: res})
    }  
  }

  getItmes(){
    var res = []
    var obj = [...this.state.data];
    obj.sort((a,b) => b.estimated_diameter.meters.estimated_diameter_max - a.estimated_diameter.meters.estimated_diameter_max);
    obj.forEach(el=>{
    res.push(
    <div className='text-light text-center' style = {{float:"left"}} key={el.name} onClick = {() => {window.open(el.nasa_jpl_url)}}>
      <h5 className = 'mr-5' style = {{float:"left"}}> Name: {el.name} </h5>
      <h5 style = {{float:"left"}}>Diameter: {el.estimated_diameter.meters.estimated_diameter_max}</h5>
    </div>)
    })
    return res
  }

  render() {
    if (!this.props.data) {
      return null
    }

    const neos = this.getItmes()
    return (
      <div className = 'row' style={{height:'auto'}}>
        <div className = 'text-white col-sm-8 text-center h-100' style={{height:'auto'}} >
          <ReactWordcloud options={this.options} words={this.state.clean_data} />
        </div>

        <div className = 'text-white bg-dark mb-3 col-sm-4 '>
          <ul className=" list-group list-group-flush">
            <h4 className = 'text-center'> Rank by Diameter</h4>
            {neos}
          </ul>  
        </div>
      </div>
      )
  }
}


export default Neos