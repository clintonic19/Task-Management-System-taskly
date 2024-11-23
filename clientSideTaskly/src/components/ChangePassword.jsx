import React from 'react'
import ModalWrapper from './DynamicForm';
import { DialogTitle } from '@headlessui/react';
import Button from './Button';
import Loading from './Loader';
import Textbox from './Textbox';
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

const ChangePassword = ({ open, setOpen }) => {

    const {register, handleSubmit, formState: { errors } } = useForm();

    const [changePassword, { isLoading } ] = useChangePasswordMutation();

    const handleOnSubmit = async (data) =>{
        if(data.password !== data.confirmPassword){
            toast.warning("Password does not match")
            return;
        }

        try {
             await changePassword(data).unwrap();
            // await changePassword(data);
            toast.success("New password has been set successfully")

            setTimeout(() =>{
                setOpen(false);
                
                }, 1500);
           
        } catch (error) {
            toast.error( error?.data?.message || error.message )
            
        }
    }

  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>

            <DialogTitle as='h3' className="text-base font-bold leading-6 text-gray-900 mb-4" >
                Change Password
            </DialogTitle>

            <div className='mt-2 flex flex-col gap-4'>
                <Textbox
                    className='w-full rounded-lg'
                    type='password'
                    label='Old Password:'
                    name = 'password'
                    placeholder='Enter your old password'
                    register= {register("oldPassword", { required: true })}
                    error = {errors.oldPassword ? errors.oldPassword.message : null}
                />

                <Textbox
                    type='password'
                    label='New Password:'
                    name = 'password'
                    placeholder='Enter your new password'
                    className='w-full rounded-lg'
                    register={register("password", { required: true })}
                    error = {errors.password ? errors.password.message : null}
                />

                <Textbox
                    className='w-full rounded-lg'
                    type='password'
                    label='Confirm Password:'
                    name = 'confirmPassword'
                    placeholder='Confirm your new password'
                    register={register("confirmPassword", { required: true })}
                    error = {errors.confirmPassword ? errors.confirmPassword.message : null}
                />
            </div>
            { isLoading ? ( <div className='py-5'>
                <Loading /> 
            </div> ) :( 
                
                <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='submit'
                        label='Save '
                        className='bg-orange-600 px-8 text-sm font-semibold text-white sm:w-auto border py-2 rounded-lg'
                    />

                    <Button
                        type='button'
                        label='Cancel'
                        className='bg-white px-8 text-sm font-semibold text-gray-800 sm:w-auto border py-2 rounded-lg'
                        onClick={() => setOpen(false)}
                    />
                </div>
            )
            }

            </form>
        </ModalWrapper>

      
    </>
  )
}

export default ChangePassword
