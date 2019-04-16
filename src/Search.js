import React, { Component } from 'react'
import Shows from './Shows'
import { Link } from 'react-router-dom'

const API = 'http://api.tvmaze.com/search/shows?q=';

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      shows: [],
      error: null,
      page: 0,
      search: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.setState({ isLoading: true })

    fetch(API + `${this.state.search}`)
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault()
    this.componentWillMount()
  }
  render() {
    const { shows } = this.state
    return (
      <div>
        <Link className='show__link' to='/'>Home</Link>
        <form className='search' onSubmit={this.onSubmit}>
          <input className='search__input' type="text" name='search' value={this.state.search} onChange={this.onChange} />
          <input className='search__btn' type="submit" value='Search' />
        </form>
        {/* {pages} */}
        {/* <button onClick={this.onNextPage.bind(this)}>next</button> */}
        <div className="grid">
          {shows.map(show =>
            <Shows show={show.show} />
          )}
        </div>
      </div>
    )
  }
}
