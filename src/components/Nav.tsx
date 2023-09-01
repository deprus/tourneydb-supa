import React from 'react';
import NavLink from './NavLink';

interface NavProps {
  isClosed: boolean;
  setIsClosed: (isClosed: boolean) => void;
}

export default function Nav({ isClosed, setIsClosed }: NavProps) {
  return (
    <div
      className={`items-center absolute left-0 top-[50px] lg:static justify-between w-full lg:flex lg:w-auto lg:order-1 ${
        isClosed && 'hidden'
      }`}
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0  bg-gray-800 lg:bg-gray-900 border-gray-700">
        <NavLink setIsClosed={setIsClosed} href="/" title="Home" />
        <NavLink
          setIsClosed={setIsClosed}
          href="/tournaments"
          title="Tournaments"
        />
        <NavLink setIsClosed={setIsClosed} href="/players" title="Players" />
        <NavLink setIsClosed={setIsClosed} href="/ratings" title="Ratings" />
        <NavLink setIsClosed={setIsClosed} href="/matches" title="Matches" />
        <NavLink setIsClosed={setIsClosed} href="/results" title="Results" />
      </ul>
    </div>
  );
}
