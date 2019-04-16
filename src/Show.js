import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Link } from 'react-router-dom'
import Cast from './Cast'

const API = 'http://api.tvmaze.com/shows';

// const DEFAULT_QUERY = `/${this.props.location.pathname.split('/')[2]}`;

class Show extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: {},
      time: ''
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true })

    fetch(API + `/${this.props.location.pathname.split('/')[2]}` + '?embed=cast')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => this.setState({ show: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))

  }
  render() {
    const { show, isLoading, error } = this.state
    if (error) {
      return <p>{error.message}</p>
    }

    if (isLoading) {
      return <p>Loading ...</p>
    }
    console.log(show)
    // const time = () => {
    //   const ti = show.shedule.time
    //   return ti.toString
    // }
    return (
      <div>
        <div className='film' >
          <div>
            <Link className='film__btn' to='/'>Back</Link>
            <img className='film__img' src={show.image.medium} alt="" /></div>
          <div>
            <h3>{show.name}</h3>
            <p>{show.summary.split()}</p>
          </div>
          <div className='film__info' >
            <h3>Show Info</h3>
            <p><b>Network: </b>{show.network.name}</p>
            <p><b>Schedule: </b>{show.schedule.days} at {show.schedule.time} ({show.runtime})</p>
            <p><b>Show Type: </b>{show.type}</p>
            <p><b>Status: </b>{show.status}</p>
            <p><b>Genres: </b>{show.genres.map(genre => (<>{genre} </>))}</p>
            <p><b>Rating: </b>
              <StarRatingComponent
                starCount={10}
                value={show.rating.average}
              />
              {' '}{show.rating.average}
            </p>
          </div>


        </div>
        <Cast cast={show._embedded.cast} />
      </div>
    )
  }
}

export default Show