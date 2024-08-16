import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// TABS COMPONENTS
import PropTypes from 'prop-types';

export default function Tabs({ tabs, setSelected, children }) {
Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
  return (
    <div className='w-full px-1 sm:px-0'>
      <TabGroup>
        <TabList className='flex space-x-6 rounded-xl p-1'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                  selected
                    ? "text-orange-700  border-b-2 border-orange-600"
                    : "text-gray-800  hover:text-orange-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className='w-full mt-2'>{children}</TabPanels>
      </TabGroup>
    </div>
  );
}