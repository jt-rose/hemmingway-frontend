import Link from "next/link";

const links = [
  {
    href: "/",
    linkTitle: "Home",
  },
  {
    href: "/exercise",
    linkTitle: "Exercise",
  },
  {
    href: "/meals",
    linkTitle: "Meals",
  },
  {
    href: "/mood",
    linkTitle: "Mood",
  },
  {
    href: "/sleep",
    linkTitle: "Sleep",
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
