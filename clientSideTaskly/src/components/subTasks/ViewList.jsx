import React, { useState } from 'react'
import { MdAttachFile, MdKeyboardArrowUp, 
          MdKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import {toast} from "sonner";
import clsx from 'clsx';
import { RandomColor, PRIOTISETASK, taskType, formatDate } from "../../utils/Index";
import { FaList } from 'react-icons/fa';
import UserInfo from '../UsersInfo';
import PropTypes from 'prop-types';
import Button from '../Button';
import ConfirmationMessage from '../Confirm';


const Icons = {
  high: <MdOutlineKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardDoubleArrowDown />,
};


const ViewList = ({ tasks }) => {
  ViewList.propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        stage: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        activities: PropTypes.array,
        assets: PropTypes.array,
        subTasks: PropTypes.array,
        team: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string.isRequired,
          })
        ),
      })
    )
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  // TABLE HEAD TO DISPLAY IN VIEW LIST  CONTENTS
  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Ranking</th>
        <th className='py-2 line-clamp-1'>Date</th>
        <th className='py-2'>Quantity</th>
        <th className='py-2'>Team Members</th>
      </tr>
    </thead>
  );

  // TABLE ROW TO DISPLAY vIEW LIST CONTENTS

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", taskType[task?.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {task?.title}
          </p>
        </div>
      </td>

{/* DISPLAY TASK BY RANKINGS  */}
      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTISETASK[task?.priority])}>
            {Icons[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-gray-600'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

{/* COMMENTED TO DISPLAY ASSETS */}
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-gray-600'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((user, index) => (
            <div
              key={user._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                RandomColor[index % RandomColor?.length]
              )}
            >
              <UserInfo user={user} />
            </div>
          ))}
        </div>
      </td>

          {/* EDIT TASK */}
      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        <Button
          className='text-orange-600 hover:text-orange-500 sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
        />
        {/* DELETE TASK */}
        <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  
  return (
    // TABLE TO DISPALY IN TEAM MEMBERS VIEWLIST CONTENTS
    <>
      <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks?.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationMessage
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  )
}

ViewList.propTypes = {
  task: PropTypes.object.isRequired,
};

export default ViewList
