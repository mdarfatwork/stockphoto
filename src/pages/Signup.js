import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
      // You can access the user information using userCredential.user
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className='mx-auto w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white rounded-lg md:mt-12 px-3 py-5 lg:px-5 lg:py-7'>
      <h1 className='text-center font-semibold text-2xl text-neutral-700'>Sign Up</h1>
      <div className='px-3 lg:px-5 py-5 lg:py-7 flex flex-col gap-4'>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-1 lg:p-2 border-none focus:outline-none' />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-1 lg:p-2 border-none focus:outline-none focus:border-2'/>
        <span className='w-full block text-center bg-[#4BC34B] text-white rounded-lg py-3' onClick={handleSignUp}>Submit</span>
        <p className='text-center'>Already have an account? <Link className='underline' to='/login'>Login</Link> </p>
      </div>
    </div>
  );
}

export default Signup;
