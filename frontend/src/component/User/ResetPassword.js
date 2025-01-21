import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams hook
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const { token } = useParams(); // Use useParams to get the token from the URL
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm)); // Pass token to the resetPassword action
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Password Updated Successfully");
            navigate("/login"); // Redirect to login after successful password reset
        }
    }, [error, dispatch, navigate, success]);

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <MetaData title="Change Password -- DeadStock" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordUpBox">
                                <h2>Change Password</h2>

                                <form className="resetPasswordForm" onSubmit={resetPasswordSubmit} encType="multipart/form-data">
                                    <div className="form-group">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <input type="submit" value={loading ? "Loading..." : "Update"} className="resetPasswordBtn" disabled={loading} />
                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    );
}

export default ResetPassword;
