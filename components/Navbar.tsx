import Link from "next/link";
//import { Menu } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";

const links = [
  {
    href: "/home",
    linkTitle: "Home",
  },
  {
    href: "/stats",
    linkTitle: "Stats",
  },
  {
    href: "/settings",
    linkTitle: "Settings",
  },
];

export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-teal-400 p-2 px-4 rounded-lg m-2">
      <p className="text-slate-50 text-left pl-8 pt-2">Hemmingway</p>
      <ul className="text-slate-50 grow text-center flex justify-around">
        {links.map((link) => (
          <li
            className="hover:bg-teal-500 rounded-lg p-2"
            key={"link-" + link.linkTitle}
          >
            <Link href={link.href}>
              <a className="text-slate-50 font-bold">{link.linkTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
      {/* <UserIcon className="text-slate-50 grow text-right pr-8 pt-2 " /> */}
      <UserCircleIcon
        className="text-slate-50 ht-8 w-8"
        stroke="rgb(248 250 252)"
      />
    </nav>
    //<Example />
    //   <div>
    //     <Flex bg="teal" w="100%" p={4} color="white">
    //       <Text color="whitesmoke" fontFamily="cursive" fontSize="2xl">
    //         Hemmingway
    //       </Text>
    //       <Spacer />
    //       <IconButton
    //         aria-label="user-settings"
    //         color="white"
    //         bg="teal"
    //         icon={<UserIcon />}
    //         variant="outline"
    //       />
    //       <Spacer />
    //       <Menu>
    //         <MenuButton
    //           as={IconButton}
    //           aria-label="Options"
    //           icon={<HamburgerIcon />}
    //           variant="outline"
    //         />
    //         <MenuList>
    //           <MenuItem icon={<AddIcon />} command="⌘T">
    //             New Tab
    //           </MenuItem>
    //           <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
    //             New Window
    //           </MenuItem>
    //           <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
    //             Open Closed Tab
    //           </MenuItem>
    //           <MenuItem icon={<EditIcon />} command="⌘O">
    //             Open File...
    //           </MenuItem>
    //         </MenuList>
    //       </Menu>
    //     </Flex>
    // <div>
    //   <Example />
    //   <Tail />
    // </div>
  );
};
