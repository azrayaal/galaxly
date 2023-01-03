import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState({
    displayName: '',
  });
  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('tokenfb');
    if (dataFromLocal) {
      const dataItemLocals = JSON.parse(dataFromLocal!);
      console.log('datadatrilocal', dataItemLocals);
      setIslogin(true);
      setUser(dataItemLocals);
    }
  }, []);

  if (isLogin) {
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
              <button
                className="mx-auto lg:mx-0 font-semibold rounded-xl mt-2 lg:mt-0 py-1 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700"
                style={{ display: 'inline-block' }}
              >
                <img
                  style={{ verticalAlign: 'middle', display: 'inline-block' }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXlJREFUSEvtldFxgkAQhv/1fE9Sgdx4+hpTQaQDOzApIR3YQdJBtILYQbAD8io3A3Zg3oXNHCPOgYegGd/kCX5299vbO34IV77oyvXRCIijaNwhmjLRCMyjvCGikJjDjHkhB4PgVJO1gHi9HlGn8w5g3LDKgLPsTQ6HoSvOCdgX/wZw33KEW84y3wU5AlxQvOjBCTkCJFqbmT637LwaFnhK+bZYApgNJSIzmosvZvbtjS8BNlrPGZha1VcsxEt+cNJ0bq2sTjfHctFTKs/J8+xWkygKQfRYaCyElFIm5jmOY4/SNDb3dXpxhL1+/8kN0JptIAvxIKXcOgBOvcj1lDo0Xl5BBQAgYCFe9yP6tL6JOj1nnAO4aLNvgMax3Ub0jxFVvuTGSu6AlafU4R9SNjutJwR8OfJ+AdxVdJeGk2aXW4KBMM/2nrRhYAYhAtrtlgefYv7hbneCNB2TeQ/0AKwY+JBKLWvtumkkxvBMTGGATfFHbtom4dyYP8B7wxmaFaV8AAAAAElFTkSuQmCC"
                />{' '}
                <span>{user.displayName}</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  } else {
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
              <button className="mx-auto lg:mx-0 font-semibold rounded-xl mt-2 lg:mt-0 py-1 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700">Login</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
