import React, { useState } from 'react';
import auth from '../../firebase.init';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleSignUp = e => {
    e.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms=event.target.terms.checked;
    console.log(email, password,terms);
    setErrorMessage('')
      if(!terms){
        setErrorMessage('pleace acept out terms condition')
      }
    if (password.length < 6) {
      setErrorMessage('password should be 6 character')
    }
    const passregex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
    if (!passregex.test(password)) {
      setErrorMessage('one upercase one number one character')
    }


    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user)
        setSuccess(true)
        //send email verify
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          console.log('veryfy the email')
        })
      })
      .catch(error => {
        console.log(error.message)
        setErrorMessage(error.message)
        setSuccess(false)

      })
  }
  return (


    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword ? 'text' : "password"} placeholder="password" name='password' className="input input-bordered" required />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className=' absolute right-4 top-12'>

            {
              showPassword ? <FaEyeSlash /> : <FaRegEye />
            }
          </button>
          <div className="form-control">
            <label className="label justify-start gap-4 cursor-pointer">
              <input type="checkbox" name='terms'  className="checkbox" />
              <span className="label-text">Accept out terms condition</span>
            </label>
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">sign up</button>
        </div>
      </form>
      {
        errorMessage && <p className='text-red-600'>{errorMessage}</p>
      }
      {
        success && <p className='text-green-600'>successfully user</p>
      }
      
    </div>

  );
};

export default SignUp;