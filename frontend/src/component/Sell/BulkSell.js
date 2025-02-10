import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, clearErrors } from '../../actions/productAction';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NEW_PRODUCT_RESET } from '../../constants/productConstant';
import { useNavigate } from 'react-router-dom';
import "./BulkSell.css"

const BulkSell = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState('50'); 
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop", "Footwear", "Bottom", "Attire", "Smartphones",
        "Accessories", "Technology", "Sports", "Electronics", "Decor", "Art","Toys"
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Product Created Successfully");
            navigate("/");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, navigate, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        myForm.set("isBulk", true);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(createProduct(myForm));
    };

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title='Create Product -- DeadStock' />
            <div className="centeredContainer">
                <div className="productFormContainer">
                    <form className='productForm' onSubmit={createProductSubmitHandler} encType='multipart/form-data'>
                        <h1>Bulk Sell</h1>

                        <div className="inputField">
                            <SpellcheckIcon />
                            <input 
                                type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="inputField">
                            <AttachMoneyIcon />
                            <input 
                                type="number"
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="inputField">
                            <DescriptionIcon />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows='1'
                            ></textarea>
                        </div>

                        <div className="inputField">
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option value={cate} key={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="inputField">
                            <StorageIcon />
                            <input 
                                type="number"
                                placeholder='Stock'
                                required
                                value={Stock}
                                min="50" 
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id='fileInput'>
                            <input type="file" name="avatar" accept='image/*' multiple onChange={createProductImageChange} />
                        </div>

                        <div id='imagePreview'>
                            {imagesPreview.map((image, index) => (
                                <img src={image} alt="Product Preview" key={index} />
                            ))}
                        </div>

                        <Button
                            id='submitProductBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            List Product
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BulkSell;
