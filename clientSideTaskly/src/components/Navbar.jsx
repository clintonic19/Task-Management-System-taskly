import  'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleSideBar } from '../redux/slices/authSlice';
import { MdOutlineSearch } from 'react-icons/md';
import Avatar from '../components/UserAvatar';
import Notification from '../components/Notification'


const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    // TOP NAVBAR
    <div className='flex justify-between items-center bg-white sticky px-4 py-3 2xl:py-4 z-10 top-0'>
      <div className='flex gap-4'>
        {/* MOBILE MENU */}
        <button
          onClick={() => dispatch(toggleSideBar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          {/* <VscMenu /> */}
          ☰
        </button>

        {/* SEARCH BAR */}
        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-lg bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl cursor-pointer' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <Notification/>
        
        <Avatar />
      </div>
    </div>
  );
};

export default Navbar;
