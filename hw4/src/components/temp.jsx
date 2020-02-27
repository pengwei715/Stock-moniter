class App extends Component {

    

    constructor() {
  
    }
  
    componentDidMount() {
      const url = this.urlForTMDB("now_playing")
  
      fetch(url).then((r) => r.json()).then((data) => {
        console.log(data)
        this.setState({ listOfMovies: data.results })
      });
    }
  
    handlePosterClick = (movie) => {
      this.setState({selectedMovie: movie})
    }
    render() {
      const posters = this.state.listOfMovies.map((movie) => {
        return <Poster movie={movie} whenClicked={this.handlePosterClick}/>
      })
      return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col">
            <button onClick={this.handleTopRatedClick} className="btn btn-primary" href="#">Get Top-Rated Movies</button>
            <button onClick={this.handleNowPlayingClick} className="ml-3 btn btn-primary" href="#">Now Playing</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <MovieDetail movie={this.state.selectedMovie}/>
          </div>
          <div className="col-sm-9">
            <div id="wall" className="row">
              {posters}
            </div>
          </div>
        </div>
      </div>
      )
  
    }

    handleNowPlayingClick = (e) => {
      e.preventDefault()
      const url = this.urlForTMDB("now_playing")
  
      fetch(url).then((r) => r.json()).then((data) => {
        console.log(data)
        this.setState({ listOfMovies: data.results })
        // this.state.listOfMovies = data.results
      });
    }


    handleTopRatedClick = (e) => {
      e.preventDefault()
      const url = this.urlForTMDB("top_rated")
  
      fetch(url).then((r) => r.json()).then((data) => {
        console.log(data)
        this.setState({ listOfMovies: data.results })
        // this.state.listOfMovies = data.results
      });
    }