import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success,setSuccess]=useState(false)
    const [loginError,setLoginError]=useState('')
    const emailRef=useRef()
    const handleLogin=(event)=>{

        event.preventDefault()
        const email=event.target.email.value;
        const password=event.target.password.value;
        console.log(email,password);
        setSuccess(false)
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            if(!result.user.emailVerified){
              setLoginError('pleace verify your email')
            }else{

                setSuccess(true)
            }
        })
        .catch(error =>{
            console.log(error)
        })
        
        
    }

    const handleForgetEmail=()=>{
        console.log('send email',emailRef.current.value)
        const email=emailRef.current.value;
        if(!email){
            console.log('pleace provide a valid email')
        }else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('reset email sent,please check your email')
            })
        }
    }
   
    return (
        <div className='max-w-96 gap-7 mx-auto'>
        <form onSubmit={handleLogin}>
        <label className="input input-bordered flex items-center gap-2 mb-5">
<svg
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 16 16"
 fill="currentColor"
 className="h-4 w-4 opacity-70">
 <path
   d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
 <path
   d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
</svg>
<input type="email" ref={emailRef} name='email' className="grow" placeholder="Email" />
</label>

<label className="input input-bordered flex items-center gap-2 mb-4">
<svg
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 16 16"
 fill="currentColor"
 className="h-4 w-4 opacity-70">
 <path
   fillRule="evenodd"
   d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
   clipRule="evenodd" />
</svg>
<input type="password" name='password' className="grow"  />
</label>
<label onClick={handleForgetEmail} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
<button className="btn btn-accent btn-wide ">Login</button>
        </form>
        {
            success && <p className='text-green-700'> user login successfully</p>
        }
        
        <p>New to this website <Link to="/signUp">sign up</Link></p>
     </div>
    );
};

export default Login;