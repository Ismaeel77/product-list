/* eslint-disable react/prop-types */
import {FaStar} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Card =  ({ data }) => {
  return (
    <Link className='product-details' to={`/details/${data.id}`}>
      <div className="card">
        <img src={data.image} alt={data.title} />
        <div className="card--description">
          <h2>{data.title.substring(0,20)}...</h2>
          <p> {data.description.substring(0,50)}... </p>
          <div className="card--footer">
            <span>{data.price}EG</span>
            <div className="card--rate">
              <FaStar />
              <span>{data.rating.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;