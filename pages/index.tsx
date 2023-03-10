import { Player } from '@lottiefiles/react-lottie-player';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from './components/navbar/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Galaxly</title>
        <meta name="description" content="Shortner Link Url" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/galaxly-logo-removebg-preview.png" />
      </Head>
      {/* <nav>a</nav> */}
      <Navbar />
      <main className="main">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center mt-[3rem]">
          {/* <!--Left Col--> */}
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left  ">
            <p className="leading-normal">Link Shortner!</p>
            <h1 className="text-5xl font-bold leading-tight fontcolor1">Make urls </h1>
            <h1 className="text-5xl font-bold leading-tight"> easy to </h1>
            <h1 className="mb-4 text-5xl font-bold leading-tight fontcolor2"> Remember!</h1>
            <p className="leading-normal mb-8 text-left">Turn your long and hardread link into beautiful short customisable Link!</p>
            <Link href="/dashboard">
              <button
                className="sm:mx-auto mx-0 lg:mx-0 font-semibold rounded-xl my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out "
                style={{ backgroundColor: '#881589' }}
              >
                Create Link
              </button>
            </Link>
          </div>
          {/* <!--Right Col--> */}
          <div className="w-full md:w-3/5 text-center sm:block hidden">
            <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></Script>
            <Player src="https://assets6.lottiefiles.com/packages/lf20_P9CLOgR2NG.json" background="transparent" speed={1} style={{ width: '600px', height: '600px' }} loop controls autoplay></Player>
          </div>
        </div>
      </main>
    </>
  );
}
