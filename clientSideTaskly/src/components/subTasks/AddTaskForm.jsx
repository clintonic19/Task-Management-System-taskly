import React, { useState } from 'react';
import DynamicForm from '../DynamicForm';
import { DialogTitle, Label } from '@headlessui/react';
import Textbox from '../Textbox';
import {useForm} from 'react-hook-form';
import TeamList from './TeamList';
import Select from '../List'
import { BiImages } from 'react-icons/bi';
import Button from '../Button';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from '../../utils/firebase';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/slices/api/taskApiSlice';
import { toast } from 'sonner';
import { dateFormatter } from '../../utils/Index';

const Lists = ["Todo", "In-progress", "Completed"];
const Priority = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTaskForm = ({open, setOpen, task }) => {

    // const task = "";

    // setting default values
    const defaultValues = {
      title: task?.title || "",
      team: task?.team || [],
      stage: "",
      priority: "",
      assests: [],
      date: dateFormatter(task?.date || new Date()),
    };

    const [ createTask, { isLoading } ] = useCreateTaskMutation();
    const [ updateTask, {isLoading: isUpdating }] = useUpdateTaskMutation();

    const URLS = task?.assets ? [ ...task?.assets] : [];

    const [assets, setAssets] = useState([]);
      
    const [uploading, setUploading] = useState(false);

    const uploadedFileURLs = [];
      
      // SUBMIT UPLOADE FUNCTION
      const submitHandler = async(data, e) => {
        e.preventDefault();

        for( const file of assets ){

          setUploading(true);

          try{
            await uploadFile(file);

          } catch (error){
            console.error("Error Uploading file:", error.message );
            return;

          }finally{
            setUploading(false);
          }
        }

        try {
          const newData = {
            ...data, assests: [...URLS, ...uploadedFileURLs],
            team, stage, priority,
          };

          const res = task?._id ? await updateTask({ ...newData, _id: task?._id }).unwrap() : await createTask(newData).unwrap();
          // const res = task?._id ? await updateTask({ ...newData, _id: task._id }) : await createTask(newData);
          toast.success("New Task Created Successfully");

          setTimeout(() =>{
            setOpen(false);     
            }, 500);

        } catch (error) {
          console.log(error)
          toast.error( error?.data?.message || error.message );
        }
      };

    const {register, handleSubmit, formState:{errors} } = useForm({ defaultValues});
    

    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || Lists[0]);

    const [priority, setPriority] = useState(
        task?.priority?.toUpperCase() || Priority[2]
      );

    
      const handleSelect = (e) => {
        setAssets(e.target.files);
      };

      // UPLOADE FILE FUNCTION
      const uploadFile = async(file) => {
        const storage = getStorage(app);

        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name );

        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on("state_changed", (snapshot) => {
            console.log("Uploading");
          },
          (error) => {
            reject(error);
          }, 
          () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadedFileURLs.push(downloadURL);
            resolve();
          }).catch((error) => {
            reject(error);
          }); 
        }
      );
        });

      }

  return (
    <>
      <DynamicForm open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle as='h2'className="text-base font-bold leading-6 text-gray-800 mb-4" >
                {task ? "UPDATE TASK" : "CREATE NEW TASK"}
            </DialogTitle>

{/* TASK TITLE */}
            <div className="pt-2 flex flex-col gap-6 font-semibold">
                <Textbox
                    placeholder='Task Title'
                    type='text'
                    name='title' label=' Task Title :' className='w-full rounded-lg '
                    register={register("title", { required: 'Title is required'})}
                        error={errors.title ? errors.title.message : ""}
                        />
            
            {/* ASSIGN TASK TO TEAM MEMBER */}
            <TeamList team={team} setTeam={setTeam} />

          {/* DROPDOWN LIST TO SELECT TASK */}
            <div className="flex gap-4">
                <Select label="Stage :" lists={Lists} 
                selected={stage}
                setSelected={setStage}/>

{/* DROPDOWN LIST TO ASSIGN DATE OF TASK */}
                <div className="w-full">
                    <Textbox placeholder="Date" type='date'
                        name='date' label='Task Date :'
                        className='w-full rounded'
                        register={register("date", { required: 'Date is required'})}
                        error={errors.date ? errors.date.message : ""} />
                </div>
            </div>

                  {/* SELECT TASK BY PRIORITY */}
                <div className="flex gap-4 ">
                    <Select label='Task Level :' lists={Priority} selected={priority}
                    setSelected={setPriority}/>
                 </div>

            {/* UPLOAD IMAGES */}
            <div className='w-full flex items-center justify-center mt-4'>     
                <label
                  className='flex items-center gap-4 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Upload Descriptive Image :</span>                 
                </label>    
            </div>
                
                {/* DESCRIPTION OF TASK IMAGE*/}
                <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                  <span className='text-sm py-2 text-red-500'>
                  Uploading Descriptive Images
                </span>
            
              ) : (
                  <Button
                  label='SUBMIT'
                  type='submit'
                  className='bg-orange-600 rounded-lg px-8 text-sm font-semibold text-white hover:bg-orange-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm rounded-lg font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='CANCEL' />
            </div>
              
            </div>
        </form>
      </DynamicForm>
    </>
  )
}

export default AddTaskForm
