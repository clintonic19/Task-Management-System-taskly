import  'react';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { MdAdd, MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loader';
import Title from '../components/Title';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
// import Sidebar from '../components/Sidebar';
import TaskTitle from '../components/TitleTask';
import  {tasks } from '../assets/DummyData.js';
import BoardView  from '../components/DashboardView';
import Table from "../components/subTasks/ViewList.jsx";
import AddTaskForm from '../components/subTasks/AddTaskForm.jsx';

const TABS = [
  {title: "Board View", icon: <MdGridView/>},
  {title: "List View", icon: <FaList/>},
];

// DUMMY DATA TO DISPLAY TASKS 
const taskType = {
  todo: "bg-orange-600",
  "in-progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Task = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || " ";
  return loading ? (   
    <div className='py-10'>
      <Loading />
    </div>
    
  ):(
    <div className='w-fulll'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ?`${status} Tasks `: "Tasks"}/>
        {

          (status) && (
            <Button
              onClick={() => setOpen(true)}
              label='Create Task'
              icon={<MdAdd className='text-lg'/>}
              className='bg-orange-600 text-white rounded-lg flex flex-row-reverse gap-1 items-center py-2 2xl:py-2 2xl:px-2.5'
            
            />
          )
          
          }
      </div>

      <Tabs tabs={TABS} setSelected={setSelected} >
      {(status) &&(
        <div className='w-full flex justify-between gap-4 md:gap-x-12 py-5'>
          <TaskTitle label="To-Do" className={taskType.todo}/>
          <TaskTitle label="In-progress" className={taskType['in-progress']}/>
          <TaskTitle label="Completed" className={taskType.completed}/>
        </div>
      )}

      {/* DISPLAY CARD INTO THE TASK URL */}
      
      {
        selected === 0 ? <div><BoardView tasks={tasks}/> 
        </div> :<div className='w-full'>
          
          {/* LIST VIEW ITEMS HERE OR TASKS IN A TABLE */}
          <Table tasks={tasks} />
        </div>       
      }
      </Tabs>

      <AddTaskForm open={open} setOpen={setOpen}/>
    </div>    
  )
  
};

{/* <BoardView tasks={tasks}/> */}

export default Task
