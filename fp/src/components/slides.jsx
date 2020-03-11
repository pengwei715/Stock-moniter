import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {getLastweek, getLastSevenURLS}from  '@/api'


class Gallery extends React.Component {

  _mounted = false

  constructor(){
    super()
    this.state= {
    currentIndex: 0,
    responsive: { 1024: { items: 1 } },
    galleryItems: [],
    date: new Date()
  }
}

componentDidUpdate(prevProps){
  console.log("in slides update")
  if (prevProps.time !== this.props.time ) {
      this.setState(
        {date: this.props.time,
      }, this.componentDidMount())   
    }   
}

  componentDidMount() {
    this._mounted = true
    if(this._mounted){
      var items=[]
      var week = getLastweek(this.state.date)
      console.log(week)
      var urls = getLastSevenURLS(week)
      urls.map((url) => {
          console.log(url)
          fetch(url).then((data) => {
          return data.json()
      }).then((res)=>{
        if (res.url.match('youtube') == null){
            items.push(res.url)
            this.setState({galleryItems: items.map((el)=> {
                return <div className='text-center'><img style ={{width:1700, height:350}} className = 'text-center' src={el} key={el}/></div>
            })})
      }}
    )})
    }
  }

  componentWillUnmount(){
    this._mounted = false
  }
 
  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })
 
  thumbItem = (item, i) => <span onClick={() => this.slideTo(i)}>* </span>

  render() {
    const { galleryItems, responsive, currentIndex } = this.state
    return (
      <div>
        <AliceCarousel
          dotsDisabled={false}
          buttonsDisabled={false}
          items={galleryItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          onSlideChanged={this.onSlideChanged}
          className = "text-center"
        />
      </div>
    )
  }
}

export default Gallery