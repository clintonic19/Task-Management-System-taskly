import  'react'
import PropTypes from 'prop-types';
import {users} from '../../assets/DummyData'
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState, useEffect } from "react";
import { getInitials } from '../../utils/Index';

const TeamList = ({team, setTeam}) => {

TeamList.propTypes = {
  team: PropTypes.array.isRequired,
  setTeam: PropTypes.func.isRequired,
};
    const userData = users.users
    const [selectedUsers, setSelectedUsers] = useState([]);
    
    const changeHandle = (el) => {
        setSelectedUsers(el)
        setTeam(el?.map((users) => users._id));
    }

    useEffect(() => {
        if (team?.length < 1 ){
           ( userData) && setSelectedUsers([userData[0]])
        }else{

            setSelectedUsers(team);
        }
    },[])

  return (
    <div>
      <p className='text-gray-700'> Assign Task :</p>
      <Listbox value={selectedUsers} 
                onChange={(el) => changeHandle(el)} multiple>
            
            <div className="relative mt-1">
            <ListboxButton className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
            <span className='block truncate'>
              {selectedUsers?.map((users) => users?.name).join(', ')}
            </span>

            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </ListboxButton>

          {/* DROP DOWN MENU TO ASSIGN TASK */}

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* REMOVE ACTIVE AND USE FOCUS */}
            <ListboxOptions className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1
             ring-black/5 focus:outline-none sm:text-sm'>
              {userData?.map((user, index) => (
                <ListboxOption
                  key={index}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4. ${
                      focus ? "bg-amber-100 text-orange-900" : "text-gray-900"
                    } `
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2 truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        <div className='w-6 h-6 rounded-lg text-white flex items-center justify-center bg-yellow-600'>
                          <span className='text-center text-[10px]'>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <MdCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
            </div>

      </Listbox>
    </div>
  )
}

export default TeamList
