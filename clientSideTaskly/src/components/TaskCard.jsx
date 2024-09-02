import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import TaskDialog from './subTasks/TaskDialog';
import { RandomColor, PRIOTISETASK, taskType, formatDate } from "../utils/Index";
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import UserInfo from './UsersInfo';
import { IoMdAdd } from 'react-icons/io';
import AddSubTask from './subTasks/AddSubTask';


const Icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  // DUMMY DATA TO DISPLAY TASKS 
// const taskType = {
//     todo: "bg-orange-600",
//     "in-progress": "bg-yellow-600",
//     completed: "bg-green-600",
//   };

const TaskCard = ({task}) => {
    const {user} = useSelector(state => state.auth);
    const[open, setOpen] = useState(false);

  return (
    <>
        <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
            <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTISETASK[task?.priority])}>
                <span className='text-lg'>{Icons[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
            </div>
            {/* CHECK AN ADMIN USER */}
                {user?.isAdmin && <TaskDialog task={task}/>}

                {/* DIALOG BOX TO OPEN A TASK, EDIT AND CREATE SUB-TASK */}
                <TaskDialog/>
        </div>
 
        <>
            <div className='flex items-center gap-2'>
                <div className={clsx("w-4 h-4 rounded-full", taskType[task.stage])}/>

                <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
            </div>
            <span className='text-sm text-gray-500'>{formatDate(new Date(task?.date))}</span>        
        </>
{/* SUB MESSAGE BOX */}
        <div className='w-full border-t boarder-gray-200 my-2'/>
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center text-sm gap-1 text-gray-600'>
                        <BiMessageAltDetail/>
                            <span>{task?.activities?.length}</span>
                    </div>

                    <div className='flex items-center text-sm gap-1 text-gray-600'>
                        <MdAttachFile/>
                            <span>{task?.activities?.length}</span>
                    </div>

                    <div className='flex items-center text-sm gap-1 text-gray-600'>
                        <FaList/>
                            <span>{task?.activities?.length}</span>
                    </div>

                </div>
                {/* TEAM MEMBERS OR USERS*/}

                    <div className='flex flex-row-reverse'>
                        {
                            task.team?.map((user, index) => (
                                <div key={index} className={clsx('w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm -mr-1',
                                    RandomColor[index % RandomColor?.length])}>

                                        
                                        <UserInfo user={user}/>
                                </div>
                            ))}
                    </div>
            </div>
            {/* SUB TASKS */}
            {
                task?.subTasks?.length > 0 ? <div className='py-4 border-t border-gray-200'>
                    <h6 className='text-base line-clamp-1 text-black'>{task?.subTasks[0].title}</h6>
                    <div className='p-4 space-x-8'>
                        <span className='text-sm text-gray-500'>{formatDate(new Date(task?.date))}</span>
                        <span className='bg-orange-600/10 px-3 py-1 rounded-lg text-orange-700 font-medium'>{task?.subTasks[0].tag}</span>
                    </div>  
                </div> :<>
                {/* DISPLAY THIS WHEN THERE IS NO TASK */}

                <div className='py-4 border-t border-gray-200'>
                    <span className='text-gray-500'>No Task Available...</span>
                </div>                
                </>       
            }

            {/* ADD SUB TASK BUTTON TO CHECK FOR AN ADMIN USER  */}
            <div className='w-full pb-2'>
                <button
                onClick={() => setOpen(true)}
                disabled = {user?.isAdmin ? false:true}
                className='w-full flex gap-2 items-center font-semibold text-sm text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300'
                >
                    <IoMdAdd className='text-lg'/>
                    <span>ADD TASK</span>
                </button>
            </div>
        </div>
           {/*FORM TO ADD SUB-TASK  */}
           <AddSubTask open={open} setOpen={setOpen} id={task._id}/>
           {/* <AddSubTask open={open} setOpen={setOpen} id={task._id}/> */}
    </>
  )};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard
