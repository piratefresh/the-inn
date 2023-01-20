import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ItemsProps {
  label: string;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

export function Menu({ children, trigger, ...props }: MenuProps) {
  return (
    <HeadlessMenu
      as="div"
      className="relative inline-block text-left"
      {...props}
    >
      <div>
        <HeadlessMenu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {trigger}
        </HeadlessMenu.Button>
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
        <HeadlessMenu.Items className="inline-flex flex-col z-tooltip absolute right-0 mt-2 w-48 bg-white lg:w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}

export { HeadlessMenu };
