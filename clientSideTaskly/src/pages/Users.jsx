import  'react'
import { useState } from 'react'
import PropTypes from 'prop-types';
import Title from '../components/Title';
import Button from '../components/Button';
import { MdAdd } from 'react-icons/md';
import { getInitials } from '../utils/Index';
import {users} from '../assets/DummyData';
import clsx from 'clsx';
// import AddTaskForm from '../components/subTasks/AddTaskForm';
// import AddSubTask from '../components/subTasks/AddSubTask';
import ConfirmationMessage from '../components/Confirm';
import UserInfo from '../components/UsersInfo';
import AddUser from '../components/AddUser';
import { useDeleteUserMutation, useGetTeamListQuery, 
          useUserActionMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';

const Users = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  //GET TEAM LIST (GET REQUEST )
  const { data, isLoading, refetch} = useGetTeamListQuery();

  const [ deleteUser ] = useDeleteUserMutation();
  const [ userAction ] = useUserActionMutation();

  //ACTION HANDLER FUNCTION FOR USER
  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive : !selected?.isActive,
        id: selected?._id,
      });

      refetch()
      toast.success(result?.data?.message)
      
          setSelected(null);

          setTimeout(() =>{
          setOpenAction(false);        
          }, 500);

    } catch (error) {
      console.log(error)
      toast.error( error?.data?.message || error.message )
    }
  };
  
  // DELETE HANDLER FUNCTION
  const deleteHandler = async () => {
  try {
    const result = await deleteUser(selected)
    refetch()
    toast.success("User Deleted Successfully")
      
          setSelected(null);

          setTimeout(() =>{
          setOpenDialog(false);
          
          }, 500);
  } catch (error) {
    console.log(error)
      toast.error( error?.data?.message || error.message )
  }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) =>{
    setSelected(el);
    setOpenAction(true);
  }

  // TABLE HEADER DATA
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

  // TABLE ROW DATA
  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-lg text-white flex items-center justify-center text-sm bg-orange-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title || "user.title"}</td>
      <td className='p-2'>{user.email || "user.email.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-lg",
            user?.isActive ? "bg-orange-200" : "bg-orange-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}

        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-orange-600 hover:text-orange-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

// ADD TEAM MEMBER/MEMBERS
  return (
    <>  
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <Title title="Team Members"/>
        <Button
          label='Add Team Member'
          icon={<MdAdd className='text-lg'/>}
          className='bg-orange-600 text-white rounded-lg flex flex-row-reverse gap-1 items-center 
          py-2 2xl:py-2 2xl:px-2.5'
          // FUNCTION TO ADD TEAM MEMBERS
          onClick={() => setOpen(true)}
        />
      </div>

      {/* DISPALY TEAM MEMBERS */}

      <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {/* MAP USER DATA  */}
              {/* { data?.data?.map((user, index) => ( */}
              {users.users?.map((user, index) => (
                <TableRow key={ index } user={ user } />
              )) }
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION MESSAGE */}

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime()}
      />

      {/* <AddSubTask open={open} setOpen={setOpen} /> */}

      <ConfirmationMessage
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler} />

        <UserInfo
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
        />

        </div>
        </>

  )
}

// Users.propTypes = {
//   task: PropTypes.object.isRequired,
// };

// ADD PROPTYPES
Users.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  })
};

export default Users
