import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center" style={{ display: 'inline' }}>
          <a className=" text-white no-underline hover:no-underline text-2xl lg:text-4xl flex" href="#" style={{ verticalAlign: 'baseline' }}>
            <Image src="/galaxly-logo-removebg-preview.png" height={50} width={50} alt="" style={{ verticalAlign: 'baseline' }} className="mr-2" />
            {/* <p style={{ verticalAlign: 'baseline' }}>galaxly</p> */}
            <p className="font-thin">
              galax<span className="font-normal">ly</span>
            </p>
          </a>
        </div>
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent  p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center"></ul>
          <Link href="/loginpage">
            <button className="mx-auto lg:mx-0 font-semibold rounded-xl mt-2 lg:mt-0 py-1 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-transparent border-2 border-gray-50">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
