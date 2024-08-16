import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

const Register = () => {

    const { user } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const submitHandler = async (data) => {
      console.log("submit", data);
      // Handle login logic here
    };
    console.log(user);
  
    // NEW CODE
    useEffect(() => {
      if (user) {
        navigate('/dashboard');
      }
    }, [user, navigate]);

  return (
    <>
        <div className='w-full h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          {/* LEFT Side of the screen */}
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y10 2xl:-mt-20'>
            <span className='text-center flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-200 text-gray-500 justify'>
              Taskly is a robust task management system designed to streamline project management and team collaboration.
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-orange-700'>
              <span>TASKLY</span>
            </p>
            <div className='cell'>
              <div className='circle rotate-in -up-left'></div>
            </div>
          </div>
        </div>
        
        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
            <div className=''>
              <p className='text-orange-700 text-3xl font-bold '>Register</p>
              {/* <p className='text-center text-base text-gray-700'>Bringing Teams Together</p> */}
            </div>
            <div className='flex flex-col gap-y-5'>
            <Textbox
                type='text'
                label='FirstName:'
                placeholder='Enter your FirstName'
                register={register("firstName", { required: "FirstName is required" })}
                name='firstName'
                error={errors.firstName ? errors.firstName.message : null}
                className='w-full rounded-lg'
              />

            <Textbox
                type='text'
                label='LastName:'
                placeholder='Enter your LastName'
                register={register("lastName", { required: "LastName is required" })}
                name='lastName'
                error={errors.lastName ? errors.lastName.message : null}
                className='w-full rounded-lg'
              />

              <Textbox
                type='email'
                label='Email Address:'
                placeholder='Enter your email'
                register={register("email", { required: "Email is required" })}
                name='email'
                error={errors.email ? errors.email.message : null}
                className='w-full rounded-lg'
              />
              <Textbox
                type='password'
                label='Password:'
                placeholder='Enter your password'
                register={register("password", { required: "Password is required" })}
                name='password'
                error={errors.password ? errors.password.message : ""}
                className='w-full rounded-lg'
              />
              <span className='text-sm text-gray-500 cursor-pointer hover:text-orange-700 hover:underline'><Link  > Already have an account? </Link></span>
              {/* <span className='text-sm text-gray-500 cursor-pointer hover:text-orange-700 hover:underline'>Don't have an Account? {Register} </span> */}
              <Button
                type='submit'
                className='w-full rounded-lg h-10 bg-orange-700 text-white'
                label='SUBMIT'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Register
