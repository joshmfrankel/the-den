import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * @see https://tailwindui.com/components/application-ui/elements/dropdowns#component-f8a14da22f26a67757b19f2fe3ca00ed
 */
function Dropdown({ children }) {
  const items = React.Children.map(children, child => {
    return (
      <Menu.Item>
        {({ active }) => (
          <div className="block px-4 py-2 text-sm">
            {child}
          </div>
        )}
      </Menu.Item>
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;
