// import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from './DynamicForm';
import { Description,  DialogTitle } from '@headlessui/react';
import Button from './Button';


const ViewNotification = ({open, setOpen, el}) => {
  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                
                <DialogTitle as='h3' className='text-lg font-semibold'>
                    {el?.task?.title}
                </DialogTitle>

                <Description as='p' className='text-sm text-gray-600'>
                    {el.text}
                </Description>

                <Button
                    type='button'
                    label='Ok'
                    className='bg-white px-8 mt-3 text-sm font-semibold text-gray-800 sm:w-auto border py-2 rounded-lg'
                    onClick={() => setOpen(false)}></Button>
            </div>
        </ModalWrapper>
          
      
    </>
  )
}

ViewNotification.propTypes = {
  open: PropTypes.boolean,
  setOpen: PropTypes.function,
  el: PropTypes.object,
};

export default ViewNotification
