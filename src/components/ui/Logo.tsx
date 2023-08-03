'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  setIsClosed: (isClosed: boolean) => void;
}

export default function Logo({ setIsClosed }: LogoProps) {
  return (
    <Link
      onClick={() => setIsClosed(true)}
      href="/"
      className="flex items-center"
    >
      <Image
        src="/tourney.png"
        alt="TourneyDB Logo"
        className="h-10 mr-3"
        width={40}
        height={40}
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
        TourneyDB
      </span>
    </Link>
  );
}
