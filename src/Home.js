import React, { Component } from 'react';
import Shows from './Shows'

const API = 'http://api.tvmaze.com/shows';
const DEFAULT_QUERY = '';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      shows: [],
      error: null,
      pagenum: 0,
      page: 0,
      currentPage: 0
    }

    this.getData = this.getData.bind(this)

  }

  getData() {
    this.setState({ isLoading: true })

    fetch(API + `?page=${this.state.currentPage}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => this.setState({ shows: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))
  }

  onPage(id) {
    this.setState({ page: id })
  }

  onPrevPage(e) {
    e.preventDefault()
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }))
    this.getData()
  }

  onNextPage(e) {
    e.preventDefault()
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }))
    this.forceUpdate()
  }

  componentDidMount() {
    this.getData()
  }

  forceUpdate() {
    this.getData()
  }
  render() {
    const { shows, isLoading, error } = this.state
    if (error) {
      return <p>{error.message}</p>
    }

    if (isLoading) {
      return <p>Loading ...</p>
    }
    const shows15 = shows.slice(this.state.page * 15, this.state.page * 15 + 15)
    const pages = []
    for (let i = 0; i < (shows.length / 15); i++) {
      pages.push(<button className='page__btn' onClick={this.onPage.bind(this, i)}>{i + 1}</button>)
    }
    return (
      <div className="App">

        <div className="grid">
          {shows15.map(show =>
            < Shows show={show} img={show.image.medium} />
          )}
        </div>
        {this.state.currentPage > 0 ? <button className='page__btn' onClick={this.onPrevPage.bind(this)}>prev</button> : null}
        {pages}
        <button className='page__btn' onClick={this.onNextPage.bind(this)}>next</button>
      </div>
    );
  }
}

export default Home;
