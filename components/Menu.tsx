import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  PencilAltIcon,
  UserCircleIcon,
  LogoutIcon,
  FireIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export const AccountMenu = () => {
  return (
    <div className="">
      <Menu as="div" className="">
        <Menu.Button className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <UserCircleIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Account</p>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Link href="/settings" key="goals-link">
                <a>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-teal-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <FireIcon
                            className="w-5 h-5 mr-2"
                            stroke="rgb(248 250 252)"
                            aria-hidden="true"
                          />
                        ) : (
                          <FireIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Set Goals
                      </button>
                    )}
                  </Menu.Item>
                </a>
              </Link>
              <Link href="/edit-profile" key="edit-profile-link">
                <a>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-teal-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          //   <EditActiveIcon
                          //     className="w-5 h-5 mr-2"
                          //     aria-hidden="true"
                          //   />
                          <PencilAltIcon
                            className="w-5 h-5 mr-2"
                            stroke="rgb(248 250 252)"
                            aria-hidden="true"
                          />
                        ) : (
                          <PencilAltIcon
                            className="w-5 h-5 mr-2"
                            //stroke="rgb(248 250 252)"
                            aria-hidden="true"
                          />
                        )}
                        Edit Profile
                      </button>
                    )}
                  </Menu.Item>
                </a>
              </Link>
            </div>
            <div className="px-1 py-1">
              <Menu.Item key="logout-btn">
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-teal-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutIcon
                        className="w-5 h-5 mr-2"
                        stroke="rgb(248 250 252)"
                        aria-hidden="true"
                      />
                    ) : (
                      <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
