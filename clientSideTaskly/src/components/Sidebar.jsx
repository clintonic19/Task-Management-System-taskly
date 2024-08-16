import 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSideBar } from '../redux/slices/authSlice';

import {
  MdDashboard,
  MdOutlinePendingActions,
  MdOutlineAddTask,
  MdTaskAlt,
  MdSettings,
} from 'react-icons/md';

import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';

const linkData = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: <MdDashboard />,
  },
  {
    label: 'Tasks',
    link: '/tasks',
    icon: <FaTasks />,
  },
  {
    label: 'Completed',
    link: '/completed/completed',
    icon: <MdTaskAlt />,
  },
  {
    label: 'In-Progress',
    link: '/in-progress/in-progress',
    icon: <MdOutlinePendingActions />,
  },
  {
    label: 'To-Do',
    link: '/todo/todo',
    icon: <MdOutlinePendingActions />,
  },
  {
    label: 'Team',
    link: '/team',
    icon: <FaUsers />,
  },
  {
    label: 'Trash',
    link: '/trashed',
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.pathname?.split('/')[1] || "";
  // LENGTH OF INFO ON SIDEBAR
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 8);

  const closeSidebar = () => {
    dispatch(toggleSideBar(false));
  };

  const NavLink = ({el}) => (
    <Link
      to={el.link}
      onClick={closeSidebar} // Call closeSidebar instead of toggleSideBar
      className={clsx(
        'w-full lg:w-4/4 flex gap-2 px-3 py-2 rounded-lg items-center text-gray-700 text-base hover:bg-gray-200',
        path === (el.link.split('/')[1] || "") ? 'bg-orange-700 text-white' : ''
      )}
    >
      {el.icon}
      <span className='hover:text-orange-400'>{el.label}</span>
    </Link>
  );

  NavLink.propTypes = {
    el: PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }).isRequired,
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-orange-700 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-orange-700'>Taskly</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map(link => (
          <NavLink key={link.label} el={link} />
        ))}
      </div>

      <div>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-700 '>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
