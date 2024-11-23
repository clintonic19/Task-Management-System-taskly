import 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import Textbox from './Textbox';
import ModalWrapper from './DynamicForm';
import { DialogTitle } from '@headlessui/react';
import Loading from './Loader';
import { useRegisterMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '../redux/slices/api/userApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
// import { useState } from 'react';


const AddUser = ({ open, setOpen, userData }) => {
  // { open, setOpen, userData }
  // const [open, setOpen, userData] = useState(false);
 

    let defaultValues = userData ?? {};
    const { user } = useSelector ((state) => state.auth);

    const {
        register, handleSubmit, formState: { errors }

    } = useForm({defaultValues});

    // const isLoading = false,
    // const isUpdating = false; 

    const dispatch = useDispatch();

    //REGISTER / ADD NEW USER
    const [ addNewUser, { isLoading }] = useRegisterMutation();

    //UPDATE USER
    const [ updateUser, { isLoading: isUpdating } ] = useUpdateUserMutation()

  // ADD OR UPDATE USER FUNCTION BUTTON
  const handleOnSubmit = async (data) => {
    try {

      //CHECK IF USER EXIST OR ADD NEW USER
      if(userData){
        // const result = await updateUser(data);
        const result = await updateUser(data).unwrap();
        toast.success("User Profile Updated Successfully");
        // toast.success(result?.message);

        //CHECK USER DATA
        if(userData?._id === user._id){
          dispatch(setCredentials({ ...result.user}))
        }

      }else{
         await addNewUser({ ...data, password: data.email }).unwrap();
        // await addNewUser({ ...data, password: data.email });
        // const result = await addNewUser( data );
        toast.success("Added New User Successfully");
      }

      setTimeout(() => {
        setOpen(false)
      }, 1100);

    } catch (error) {    
      toast.error( "An Error Occured Please try Again");
    }
  };

  return (
    <>
        <ModalWrapper open={ open } setOpen={ setOpen } >
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            { userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-orange-600 px-8 text-sm font-semibold text-white hover:bg-orange-700 
                 sm:w-auto rounded-lg'  label='SUBMIT'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold rounded-lg text-gray-900 sm:w-auto'
                onClick={() => setOpen(false) }
                label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
      
    </>


  )
 
}
AddUser.propTypes = {
  open: PropTypes.boolean,
  setOpen: PropTypes.func,
  userData: PropTypes.object,
};
export default AddUser
