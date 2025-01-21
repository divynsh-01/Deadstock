import React, { useState, useEffect } from 'react';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);

        // Only set avatar if a new one is selected
        if (avatar) {
            myForm.set("avatar", avatar);
        }

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url); // Setting initial avatar from user data
        }
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/accounts"); // Use navigate to push the user to the "accounts" page
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [error, dispatch, navigate, user, isUpdated]);

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <MetaData title="Update Profile -- DeadStock" />
                        <div className="updateProfileContainer">
                            <div className="updateProfileUpBox">
                                <h2>Update Profile</h2>

                                <form className="updateProfileForm" onSubmit={updateProfileSubmit}>
                                    <div className="updateProfileName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="updateProfileEmail">
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

                                    <div className="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input type="submit" value={loading ? "Loading..." : "Update Profile"} className="updateProfileBtn" disabled={loading} />
                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default UpdateProfile;
