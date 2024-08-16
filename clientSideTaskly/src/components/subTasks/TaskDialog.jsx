import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { MdAdd, MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { HiDuplicate } from "react-icons/hi";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { Menu, MenuButton, MenuItem, MenuItems, Transition, } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin6Line } from "react-icons/ri";
import AddTaskForm from './AddTaskForm';
import AddSubTask from './AddSubTask';
import ConfirmationMessage from '../Confirm';


const TaskDialog = ({ task }) => {
  // Component code here

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => {};
  const deleteClicks = () => {};
  const deleteHandler = () => {};

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/tasks/${task?._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHandler(),
    },
  ];
  
  return (    
   
<>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <MenuButton className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
            <BsThreeDots />
          </MenuButton>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            {/* LOOPING OVER DIFFERENT ITEMS */}
            <MenuItems className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((user) => (
                  <MenuItem key={user.label}>
                    {({ focus }) => (
                      <button
                        onClick={user?.onClick}
                        className={`${
                          focus ? "bg-orange-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {user.icon}
                        {user.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>

              <div className='px-1 py-1'>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        focus ? "bg-orange-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <AddTaskForm
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmationMessage
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  )
}
TaskDialog.propTypes = {
  task: PropTypes.object,
};

export default TaskDialog
