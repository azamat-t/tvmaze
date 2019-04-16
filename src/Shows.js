import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

class Shows extends Component {
  render() {
    return (
      <div className='show__item' key={this.props.show.id}>
        <Link className='show__link' to={`/show/${this.props.show.id}`}>
          <div className='show__outside'><img className='show__img' src={this.props.img} alt="" /></div>
          <div>{this.props.show.name}</div>
        </Link>
        <div className='show__bottom'>
          <div>
            <StarRatingComponent
              starCount={10}
              value={this.props.show.rating.average}
            />
          </div>

          <p>{this.props.show.premiered}</p>
        </div>


      </div>
    )
  }
}

export default Shows