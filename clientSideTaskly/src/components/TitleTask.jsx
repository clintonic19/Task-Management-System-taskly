import React from 'react'

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoMdAdd } from 'react-icons/io';

// DISPLAY COMPLETED TASKS 

const TitleTask = ({label, className}) => {

    TitleTask.propTypes = {
        label: PropTypes.func,
        className: PropTypes.node.isRequired,
      };

  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 flex rounded bg-white items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full", className)}/>
        <p className='text-sm md:text-base text-gray-600'>{label}</p>
      </div>

      <button className='hidden md:block'>
        <IoMdAdd className='text-lg text-black'/>
      </button>
    </div>
  )

// UPDATED CODE

// return (
//     <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between'>
//       <div className='flex gap-2 items-center'>
//         <div className={clsx("w-4 h-4 rounded-full ", className)} />
//         <p className='text-sm md:text-base text-gray-600'>{label}</p>
//       </div>

//       <button className='hidden md:block'>
//         <IoMdAdd className='text-lg text-black' />
//       </button>
//     </div>
//   );
};


export default TitleTask
