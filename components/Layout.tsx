import { ReactNode } from "react";
import { Navbar } from "./Navbar";

// add Head

export const Layout = (props: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      {props.children}
    </main>
  );
};
