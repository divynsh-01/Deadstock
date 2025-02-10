import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, clearErrors, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartAction.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstant.js';

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);



  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError, { position: "bottom-center" });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [error, dispatch, reviewError, success]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added to Cart");
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => setOpen(!open);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- DeadStock`} />
          <div
            className="ProductDetails kam"
            
          >
            <div className="dv">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="detailss">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating value={product.ratings} readOnly precision={0.5} />
                <span className="detailsBlock-2-span"> ({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>

          <h3 className="ReviewsHeading">REVIEWS</h3>

          <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle}>Cancel</Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
