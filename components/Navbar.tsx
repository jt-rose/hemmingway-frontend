import Link from "next/link";
//import { Menu } from "@headlessui/react";
import { ChartBarIcon, CalendarIcon } from "@heroicons/react/outline";
import { AccountMenu } from "./Menu";
import { PropTypesWithRefresh } from "types/propTypes";

export const Navbar = (props: PropTypesWithRefresh) => {
  return (
    <nav className="flex justify-around bg-teal-400 p-2 px-4 rounded-lg m-2">
      {/* <Example /> */}
      <Link href="/">
        <button className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <CalendarIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Daily</p>
        </button>
      </Link>
      <Link href="/stats">
        <button className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <ChartBarIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Stats</p>
        </button>
      </Link>

      <AccountMenu gqlClient={props.gqlClient} setToken={props.setToken} />
      {/* <Link href="/settings">
        <div className="flex hover:bg-teal-500 rounded-full hover:cursor-pointer">
          <UserCircleIcon
            className="text-slate-50 p-2 ht-10 w-10 hover:bg-teal-500 rounded-full"
            stroke="rgb(248 250 252)"
          />{" "}
          <p className="text-slate-50 font-bold  pr-2 pt-2">Account</p>
        </div>
      </Link> */}
    </nav>
  );
};
