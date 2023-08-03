'use client';

import { useState } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import NavButton from './NavButton';
import SignInButton from './SignInButton';

export default function Header() {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <header className="bg-gray-900 w-full sticky z-10 top-0 left-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo setIsClosed={setIsClosed} />
        <div className="flex lg:order-2">
          <SignInButton />
          <NavButton isClosed={isClosed} setIsClosed={setIsClosed} />
        </div>
        <Nav isClosed={isClosed} setIsClosed={setIsClosed} />
      </div>
    </header>
  );
}
