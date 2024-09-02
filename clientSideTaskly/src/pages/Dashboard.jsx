
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react';
import { FaNewspaper } from 'react-icons/fa';
import { FaArrowsToDot } from 'react-icons/fa6';
import { LuClipboardEdit } from 'react-icons/lu';
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp
} from 'react-icons/md';
import { users } from '../assets/DummyData';
import { PRIOTISETASK, RandomColor, taskType } from "../utils/Index";
// import Card from '../components/Card';
import Loading from '../components/Loader';
import Rechart from '../components/Rechart';
import UserInfo from '../components/UsersInfo';
import UserTable from '../components/UserTable';
import { useGetDashboardStatsQuery } from '../redux/slices/api/taskApiSlice';


const TaskTable = ({ tasks }) => {
  // ...
  const Icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };
  TaskTable.propTypes = {
    tasks: PropTypes.array.isRequired,
  };

  // TABLE HEAD TO DISPLAY IN VIEW LIST  CONTENTS
  const TableHeader = () => (
    // <div className='w-full border-b border-gray-300'>
    <thead className='w-full border-b border-gray-300'>
      <tr className='text-black  text-left'>
        <th className='py-2'>Task Title </th>
        <th className='py-2'>Priority </th>
        <th className='py-2'>Team Members </th>
        <th className='py-2 hidden md:block'>CreatedAt </th>
      </tr>
    </thead>
  );

  // TABLE ROW TO DISPLAY IN VIEW LIST  CONTENTS
  const TableRow = ({ task }) => (
 
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", taskType[task.stage])}
          />
          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTISETASK[task.priority])}>
            {Icons[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((users, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                RandomColor[index % RandomColor.length]
              )}
            >
              <UserInfo user={users} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>

    
  );

  TableRow.propTypes = {
    task: PropTypes.shape({
      stage: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      team: PropTypes.array.isRequired,
      date: PropTypes.string.isRequired,
    })
  };
  
  return(
    <>
      <div className='items-center flex w-full md:w-10/8 bg-white px-4 md:px-6 pt-2 pb-4 shadow-md rounded'>
        <table>
          <TableHeader />
          <tbody>
            {
              tasks?.map((task, index)=>(
                <TableRow key={index} task={task} />
              ))
            }
          </tbody>
        </table>
      </div>     
    </>   
  )
};


const Dashboard = () => {
 
  const {data, isLoading } = useGetDashboardStatsQuery();
  
  if(isLoading)
    return(
      <div className='py-10'>
        < Loading />
      </div>
    );
  // const totals =  data?.tasks
  const totals = users?.tasks
  
  // USER STATISTICS DATA TO CHECK PROGRESS OF TASKS
  const stats = [
    {
        _id: "1",
        label: "TOTAL TASK",
        totals: users?.totalTasks || 0,
        // totals: data?.totalTasks || 0,
        icon: <FaNewspaper />,
        bg: "bg-orange-600",
    },

    {
        _id: "2",
        label: "COMPLETED",
        total: totals["completed"] || 0,
        icon: <MdAdminPanelSettings />,
        bg: "bg-[#0f766e]",
    },

    {
        _id: "3",
        label: "IN-PROGRESS ",
        total: totals["in progress"] || 0,
        icon: <LuClipboardEdit />,
        bg: "bg-[#f59e0b]",
    },

    {
        _id: "4",
        label: "PENDING",
        total: totals["todo"],
        icon: <FaArrowsToDot />,
        bg: "bg-red-600" || 0,
    }
];

  return(
    <>
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* MAPPING TO DISPLAY THE DASHBOARD ICON FOR TASK */}
        {stats?.map((stats) => (
          <div
            key={stats._id}
            
            className={`flex items-center justify-between p-4 rounded-lg ${stats.bg} text-white`}
          >
            <div className="flex items-center gap-3">
              {stats.icon}
              <h2 className=''>{stats.label}</h2>
            </div>
            <h2 className='font-semibold'>{stats.totals}</h2>
          </div>
        ))}

        {/* COMMENDED CARD TO MAP HERE.... */}
        {/* {
          stats.map(({icon, bg, label, totals, }, index ) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={totals} />
          ))
        } */}
        </div>

        {/* CHARTS FOR DASHBOARD */}
            <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
              <h2 className="text-xl text-gray-600 font-semibold">TASK CHART</h2>
              {/* <div className="w-full h-80 bg-white">
              
              </div> */}
              {/* RECHART DASHBOARD */}
              <Rechart data={data?.graphData} />  
              {/* <Rechart />   */}
            </div>

            <div className="w-full flex flex-cols md: flex-row gap-4 2xL:gap-10 py-8">
                
                {/* LEFT */}

                {/* <div className="w-full md:w-12/2 bg-white p-4 rounded shadow-sm"> */}
                   <TaskTable  tasks={users?.last10Task} />
                {/* </div> */}

                {/* RIGHT */}
                <UserTable users={users.users}/>
            </div>
            
      </div>   
    </>
  )
};


Dashboard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
  })
};



export default Dashboard
