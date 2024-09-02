import PropTypes from 'prop-types';
import React from 'react';
import TaskCard from './TaskCard';


const DashboardView = ({tasks}) => {
    DashboardView.propTypes = {
        tasks: PropTypes.func,
        className: PropTypes.node,
      };
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:gap-10 gap-5'>
        {
            (tasks?.map((task, index) => (
            // (tasks.map((task, index) => (
                <TaskCard task={task} key={index}/>
            )))
        }

      
    </div>
  )
}

export default DashboardView
