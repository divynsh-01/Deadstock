import React from 'react'
import { useState, useEffect } from 'react';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))
    };

    

    useEffect(() => {
        
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Password changed Successfully")
             navigate("/accounts"); // Use navigate to push the user to the "accounts" page
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [error, dispatch, navigate, isUpdated]);

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <MetaData title="Change Password -- DeadStock" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordUpBox">
                                <h2>Change Password</h2>

                                <form className="updatePasswordForm" onSubmit={updatePasswordSubmit} encType="multipart/form-data">

                                    <div className="form-group">
                                        <VpnKeyIcon />
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
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


                                    <input type="submit" value={loading ? "Loading..." : "Change"} className="updatePasswordBtn" disabled={loading} />
                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default UpdatePassword
