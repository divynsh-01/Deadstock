import React from 'react'
import { Link } from "react-router-dom"
// import ReactStars from "react-rating-stars-component"
import { Rating } from '@mui/material'



const Product = ({ product }) => {
    const options ={
        precision: 0.5,
    readOnly: true,
    value: product.ratings,
    
    }
    return (
        <div>
            <Link className='productCard' to={`/product/${product._id}`}>
                <img src= {product.images[0].url} alt= {product.name} />
                <p>{product.name}</p>
                <div>
                    <Rating {...options}/>
                    <span className='productCardRev'>({product.numOfReviews} Reviews)</span>
                </div>
                <span>
                    {`₹${product.price}`}
                </span>
            </Link>
        </div>
    )
}

export default Product
