import React, { useEffect, useState } from 'react'
import "./NewProduct.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import SideBar from './SideBar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.deleteProduct);
    const { error, product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isVerified, setIsVerified] = useState(false);

    const categories = [
        "Laptop", "Footwear", "Bottom", "Attire", "Smartphones",
        "Accessories", "Technology", "Sports", "Electronics", "Decor", "Art", "Toys"
    ];

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
            setIsVerified(product.isVerified);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        myForm.set("isVerified", isVerified);

        if (images.length > 0) {
            images.forEach((image) => {
                myForm.append("images", image);
            });
        }

        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title='Update Product -- DeadStock' />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form className='createProductForm' onSubmit={updateProductSubmitHandler} encType='multipart/form-data'>
                        <h1>Update Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input type="number" placeholder='Price' required value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea placeholder='Product Description' value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows='1'></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option value={cate} key={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input type="number" placeholder='Stock' required value={Stock} onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div id='createProductFormFile'>
                            <input type="file" name="avatar" accept='image/*' multiple onChange={updateProductImageChange} />
                        </div>

                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img src={image.url} alt="Old Product Preview" key={index} />
                            ))}
                        </div>

                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img src={image} alt="Product Preview" key={index} />
                            ))}
                        </div>

                        <div className="verificationCheckbox">
                            <VerifiedIcon />
                            <label>
                                <input type="checkbox" checked={isVerified} onChange={() => setIsVerified(!isVerified)} />
                                Mark as Verified
                            </label>
                        </div>

                        <Button id='createProductBtn' type='submit' disabled={loading}>
                            Update
                        </Button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProduct;
