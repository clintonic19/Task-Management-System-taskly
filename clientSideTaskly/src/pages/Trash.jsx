import 'react'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdKeyboardArrowUp, MdKeyboardDoubleArrowDown,
         MdOutlineKeyboardDoubleArrowUp, 
         MdOutlineRestore} from 'react-icons/md';
import { tasks } from '../assets/DummyData';
import Button from '../components/Button';
import Title from '../components/Title';
import clsx from 'clsx';
import { RandomColor, PRIOTISETASK, taskType, formatDate } from "../utils/Index";

import ConfirmationMessage from '../components/Confirm';
import AddUser from '../components/AddUser';
import { useDeleteRestoreTaskMutation, useGetTasksQuery } from '../redux/slices/api/taskApiSlice';
import Loading from '../components/Loader';
import { toast } from 'sonner';



const Icons = {
  high: <MdOutlineKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardDoubleArrowDown />,
};

const Trash = () => {
  // DUMMY DATA
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  // GET ALL TASK QUERY
  const { isLoading, refetch } = useGetTasksQuery({
    strQuery: "", isTrashed: "true", search: "",
  })

  const [ deleteRestoreTask ] = useDeleteRestoreTaskMutation();

  // DELETE AND RESTORE HANDLER
  const deleteRestoreHandler = async () => {
    // e.preventDefault();
    try {
      let result;

      switch (type) {
        case "delete":
          await deleteRestoreTask({id: selected, actionType: "delete"}).unwrap();
          break;

          case "deleteAll":
            await deleteRestoreTask({id: selected, actionType: "deleteAll"}).unwrap();
            break;

        case "restore":
          await deleteRestoreTask({id: selected, actionType: "restore"}).unwrap();
          break;

        case "restoreAll":
          await deleteRestoreTask({id: selected, actionType: "restoreAll"}).unwrap();
          break;

        default:
          "Invalid Action";
          break;
      }

      toast.success("Done");
      setOpenDialog(false);
      refetch();

      setTimeout(() => {
        window.location.reload();
      }, 500);

     
      } catch (error) {
        console.log(error);      
      }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permenantly delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  // LOADING SPINNER
  if(isLoading)
    return(
      <div className='py-10'>
        < Loading />
      </div>
    ); 
  

// TABLE HEAD FOR TRASH
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Ranking</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified</th>
      </tr>
    </thead>
  );

  // TABLE ROW FOR TRASH

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", taskType[item.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {item?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTISETASK[item?.priority])}>
            {Icons[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
 );


  return (
    <>
    <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />

          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => restoreAllClick()}
            />
            
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {/* {data?tasks?.map((trash, id) => ( */}
               {tasks?.map((trash, id) => (
                  <TableRow key={id} item={trash} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} />

      <ConfirmationMessage
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  )
}

Trash.propTypes = {
  tasks: PropTypes.array,
};

Trash.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    priority: PropTypes.string,
    stage: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
  })
  // .isRequired,
};



export default Trash
