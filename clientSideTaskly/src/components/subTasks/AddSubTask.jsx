import 'react'
import Button from '../Button';
import Textbox from '../Textbox';
import { DialogTitle } from '@headlessui/react';
import ModalWrapper from '../DynamicForm';
import { useForm } from 'react-hook-form';
import { useCreateSubTaskMutation } from '../../redux/slices/api/taskApiSlice';
import { toast } from 'sonner';

const AddSubTask = ({ open, setOpen, id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [ addSubTask ] = useCreateSubTaskMutation();
      
      const handleOnSubmit = async (data) => {
        try {
          await addSubTask({ data, id }).unwrap();
          // toast.success(res.message);
          toast.success("SubTask Added Successfully");

          setTimeout(() => {
            setOpen(false);
          }, 500);
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error);
        }
      };
    
      return (
        <>
          <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
              <DialogTitle
                as='h2'
                className='text-base font-bold leading-6 text-gray-900 mb-4'
              >
                {/* ADD SUB-TASK FORM */}
                <h2>CREATE SUB-TASK</h2>
              </DialogTitle>

              <div className='mt-2 flex flex-col gap-6'>
                <Textbox
                  placeholder='Sub-Task title'
                  type='text'
                  name='title'
                  label='Sub-Task Title :'
                  className='w-full rounded'
                  register={register("title", {
                    required: "Title is required!",
                  })}
                  error={errors.title ? errors.title.message : ""}
                />
    
                <div className='flex items-center gap-4'>
                  <Textbox
                    placeholder='Date'
                    type='date'
                    name='date'
                    label='Task Date :'
                    className='w-full rounded'
                    register={register("date", {
                      required: "Date is required!",
                    })}
                    error={errors.date ? errors.date.message : ""}
                  />
                  <Textbox
                    placeholder='Tag'
                    type='text'
                    name='tag'
                    label='Task Tag :'
                    className='w-full rounded'
                    register={register("tag", {
                      required: "Tag is required!",
                    })}
                    error={errors.tag ? errors.tag.message : ""}
                  />
                </div>
              </div>
              <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
                <Button
                  type='submit'
                  className='bg-orange-600 text-sm font-semibold rounded-lg text-white hover:bg-orange-700 sm:ml-3 sm:w-auto'
                  label='ADD SUB-TASK'
                />
    
                <Button
                  type='button'
                  className='bg-white border text-sm font-semibold rounded-lg text-gray-900 sm:w-auto'
                  onClick={() => setOpen(false)}
                  label='CANCEL'
                />
              </div>
            </form>
          </ModalWrapper>
        </>
      );
    };

export default AddSubTask
