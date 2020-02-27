import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'



class TopBanner extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        console.log("in the banner")
    return <div className = 'm-header--main text-center h1' style={{color:'white'}}> Weekly Rank of Hazardous Asteroids </div>
        }
}

export default TopBanner