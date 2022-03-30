import Link from "next/link";

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
  {
    href: "/welcome",
    linkTitle: "Welcome",
  },
];

export const Navbar = () => {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={"link-" + link.linkTitle}>
            <Link href={link.href}>
              <a>{link.linkTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
