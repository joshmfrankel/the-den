import React, { Fragment, Children } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * @see https://tailwindui.com/components/application-ui/elements/dropdowns#component-f8a14da22f26a67757b19f2fe3ca00ed
 */
function Dropdown({ children }) {
  const items = Children.map(children, child => {
    // Inject styles into children slot
    const styledChild = React.cloneElement(child, {
      className: 'block px-4 py-2 text-sm w-full text-left bg-slate-600 hover:brightness-110'
    });

    return (
      <Menu.Item>
        {({ active }) => (
          <>
            {styledChild}
          </>
        )}
      </Menu.Item>
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left" data-no-dnd>
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
        <Menu.Items className="bg-slate-600 absolute -top-2.5 left-8 z-10 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 before:content-[''] before:w-5 before:h-5 before:block before:absolute before:top-0 before:bottom-0 before:my-auto before:rotate-45 before:-z-10 before:-ml-1 before:bg-slate-600">
            {items}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;
