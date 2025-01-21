import { React, useRef, useState, useEffect } from 'react';
import './LoginSignUp.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import MailOutlineIcon from '@mui/icons-material/MailOutline';  
import LockOpenIcon from '@mui/icons-material/LockOpen';  
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { toast } from 'react-toastify';

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');
            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        } else if (tab === 'register') {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');
            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft');
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            navigate("/accounts"); // Use navigate to push the user to the "accounts" page
        }
    }, [error, dispatch, navigate, isAuthenticated]);

    return (
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, 'login')}>Login</p>
                        <p onClick={(e) => switchTabs(e, 'register')}>Register</p>
                    </div>
                    <div className="underline" ref={switcherTab}></div>
                </div>
                
                {/* Login Form */}
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="form-group">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot" className="forgot-password">Forgot Password</Link>
                    <input type="submit" value={loading ? "Loading..." : "Login"} className="loginBtn" disabled={loading} />
                </form>

                {/* Register Form */}
                <form className="signUpForm" ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data">
                    <div className="signUpName">
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                        />
                    </div>
                    <input type="submit" value={loading ? "Loading..." : "Register"} className="signUpBtn" disabled={loading} />
                </form>
            </div>
        </div>
    );
};

export default LoginSignUp;
