import { GraphQLClient } from "graphql-request";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Navbar } from "./Navbar";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

// add Head

export const Layout = (props: {
  children: ReactNode;
  gqlClient: GraphQLClient;
  setToken: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar gqlClient={props.gqlClient} setToken={props.setToken} />
      {props.children}
      <div className="flex-grow"></div>
      <footer className=" bg-teal-500  mt-8 border-t-2 border-teal-600 py-2">
        <p className="text-center text-slate-50">Designed by Jeff Rose, 2022</p>
        <div className="flex justify-center mt-1">
          <a
            href="https://www.linkedin.com/in/jeffreytrose"
            target="_blank"
            className="text-xl mx-4 hover:cursor-pointer hover:bg-teal-600 p-2 rounded-md"
          >
            <AiFillLinkedin fill="rgb(248 250 252)" stroke="rgb(20 184 166)" />
          </a>
          <a
            href="https://github.com/jt-rose"
            target="_blank"
            className="text-xl mx-4 hover:cursor-pointer hover:bg-teal-600 p-2 rounded-md"
          >
            <AiFillGithub fill="rgb(248 250 252)" stroke="rgb(20 184 166)" />
          </a>
        </div>
      </footer>
    </main>
  );
};
