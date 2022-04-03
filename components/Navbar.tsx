import Link from "next/link";
//import { Menu } from "@headlessui/react";
import {
  UserCircleIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/outline";

export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-teal-400 p-2 px-4 rounded-lg m-2">
      <Link href="/home">
        <div className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <CalendarIcon
            className="text-slate-50 p-2 ht-10 w-10 "
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Daily</p>
        </div>
      </Link>
      <Link href="/stats">
        <div className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <ChartBarIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Stats</p>
        </div>
      </Link>

      <Link href="/settings">
        <div className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <UserCircleIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Account</p>
        </div>
      </Link>
    </nav>
  );
};
