import React from 'react'
import { useState, useEffect } from 'react';
import './ForgotPassword.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("email", email);
            dispatch(forgotPassword(myForm))
        };

        useEffect(() => {
                
                if (error) {
                    toast.error(error, { position: "bottom-center" });
                    dispatch(clearErrors());
                }
                if (message) {
                    toast.success(message)
                    
                }
            }, [error, dispatch,message]);
        
        

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <MetaData title="Forgot Password -- DeadStock" />
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordUpBox">
                                <h2>Update Profile</h2>

                                <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit} >

                                    <div className="forgotPasswordEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>


                                    <input type="submit" value={loading ? "Loading..." : "Send"} className="forgotPasswordBtn" disabled={loading} />
                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default ForgotPassword
