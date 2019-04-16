import React, { Component } from 'react'

const API = 'http://api.tvmaze.com/shows';

class Cast extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cast: this.props.cast,
      // showid: this.props.showId
    }
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true })
  //   console.log(this.state.sh)
  //   fetch(API + `/${this.state.showid}` + '/cast')
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json()
  //       } else {
  //         throw new Error('Something went wrong')
  //       }
  //     })
  //     .then(data => this.setState({ cast: data, isLoading: false }))
  //     .catch(error => this.setState({ error, isLoading: false }))
  // }
  render() {
    const { cast, isLoading, error } = this.state
    console.log(cast)
    if (error) {
      return <p>{error.message}</p>
    }

    if (isLoading) {
      return <p>Loading ...</p>
    } return (
      <div className='cast'>
        {cast.slice(0, 8).map(person =>
          <div className='cast__item' key={person.person.id}>
            <img className='cast__img' src={person.person.image.medium} alt="" />
            <h3 className='cast__name' >{person.person.name}</h3>
          </div>
        )}
      </div>
    )
  }
}

export default Cast