import React from "react";
import "./AuthForm.css";
import facebook from "../../Assets/Image/facebook.png"
import GoogleLogo from "../../Assets/Image/google.svg";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "../../firebase.init";



const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);


const Login = () => {
  const navigate = useNavigate();



  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        // ...
        navigate('/');
      }).catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);

      });
  }

  const facebookAuth = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        navigate('/')
        console.log(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
          console.log(errorMessage)
      });
  }


  const handleFormLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Login</h1>
        <form onSubmit={handleFormLogin}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='text' name='email' id='email' />
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <button type='submit' className='auth-form-submit'>
            Login
          </button>
        </form>
        <p className='redirect'>
          New to Tech Geeks?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
        <div className='input-wrapper  mt'>
          <button className='google-auth' onClick={facebookAuth}>
            <img className="fb-img" src={facebook} alt='' />
            <p> Continue with Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
