import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase/firebase';
import Modaladdlink from './components/modals/modaladdlink';

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, seIsLogin] = useState(false);
  const [url, setUrl] = useState('');
  // const [galaxiedLink, setGalaxiedLink] = useState('');
  const [namelink, setNameLink] = useState('');
  const [user, setUser] = useState({
    displayName: '',
  });
  //
  const [shortLinks, setShortLinks] = useState<any | null>([]);
  const shortLinkRef = collection(db, 'shortlink');
  //

  const getDataShortLinkFromFireBase = async () => {
    const data = await getDocs(shortLinkRef);
    setShortLinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteShortLink = async (id: any) => {
    // const shortLinkDoc = doc(db, 'shortlink', id);
    // console.log('shortLink', shortLinkDoc);
    // await deleteDoc(shortLinkDoc);
  };

  useEffect(() => {
    getDataShortLinkFromFireBase();
  }, []);

  const router = useRouter();

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('dataUser');
    if (dataFromLocal) {
      const dataItemLocals = JSON.parse(dataFromLocal!);
      // console.log('datadatrilocal', dataItemLocals);
      setUser(dataItemLocals);
      seIsLogin(true);
    } else {
      // router.push('/loginpage');
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const galaxiedLink = res.data.result.short_link;
      // console.log('datapost', res.data.result.short_link);
      await addDoc(shortLinkRef, { originalLink: url, nameLink: namelink, galaxiedLink: galaxiedLink });
      window.location.reload();
      toast.success('Berhasil tambah link', { theme: 'colored' });
    } catch (err) {
      toast.error('harap memasukan link yang benar', { theme: 'colored' });
    }
  };

  const handleFormSubmit = async () => {
    fetchData();
    setShowModal(false);
  };

  useEffect(() => {
    if (handleFormSubmit.length) {
      fetchData();
    }
  }, []);

  if (isLogin) {
    return (
      <>
        <ToastContainer />
        <Head>
          <title>Galaxly | Dashboard</title>
          <meta name="description" content="Shortner Link Url" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Link rel="icon" href="/galaxly-logo-removebg-preview.png" />
        </Head>
        <nav id="header" className="w-full z-30 top-0 text-white ">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div className="pl-4 flex items-center" style={{ display: 'inline' }}>
              <Link className=" text-white no-underline hover:no-underline text-2xl lg:text-4xl flex" href="/" style={{ verticalAlign: 'baseline' }}>
                <Image src="/galaxly-logo-removebg-preview.png" height={50} width={50} alt="" style={{ verticalAlign: 'baseline' }} className="mr-2" />
                {/* <p style={{ verticalAlign: 'baseline' }}>galaxly</p> */}
                <p className="font-thin">
                  galax<span className="font-normal">ly</span>
                </p>
              </Link>
            </div>
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent  p-4 lg:p-0 z-20" id="nav-content">
              <ul className="list-reset lg:flex justify-end flex-1 items-center"></ul>
              <button
                className="mx-auto lg:mx-0 font-semibold rounded-xl mt-2 lg:mt-0 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700 text-gray-50"
                onClick={() => setShowModal(true)}
              >
                create new link
              </button>
            </div>
          </div>
        </nav>

        <main className="main">
          <div className="mb-16 ">
            {/* name */}
            <div className=" w-full sm:mt-16 mt-0 mb-3 text-xl text-gray-300 sm:ml-0 ml-5 inline-block">
              <span>{`${user.displayName}'s Links:`} </span>
              <div className="align-middle sm:hidden inline-block ml-4">
                <button
                  className="  mx-auto lg:mx-0 font-semibold rounded-xl mt-2 lg:mt-0 py-2 px-5 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-gray-400 bg-slate-700 text-gray-50"
                  onClick={() => setShowModal(true)}
                >
                  create link
                </button>
              </div>
            </div>
            {/* emd of name */}
            {/* card */}
            <div className=" w-full grid sm:grid-cols-3 grid-cols-1 gap-6 mt-4 ">
              {shortLinks.map((item: any) => {
                return (
                  <div className="sm:mx-12 mx-5 max-w-[26rem] rounded-2xl overflow-hidden shadow-lg bg-slate-700 hover:scale-105 hover:drop-shadow-xl ease-in-out duration-200 " key={item.id}>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{item.nameLink}</div>
                      <div className="generated-link my-3 truncate">
                        <p className="text-gray-400 text-base ">Original link:</p>
                        <a href="" target="_blank">
                          <p className="text-gray-50 text-base ">{item.originalLink}</p>
                        </a>
                      </div>
                      <div className="generated-link my-3">
                        <p className="text-gray-400 text-base ">Galaxied link:</p>
                        <p className="text-gray-50 text-base ">
                          <a href="" target="_blank">
                            {item.galaxiedLink}
                          </a>
                        </p>
                      </div>
                      <div className="generated-link my-3">
                        <p className="text-gray-400 text-base ">id:</p>
                        <p className="text-gray-50 text-base ">
                          <a href="" target="_blank">
                            {item.id}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="px-3 pt-4 pb-2 flex justify-around">
                      <span className="bg-slate-700 inline-block rounded-md px-3 py-3 mb-2 text-gray-700">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARpJREFUSEvtVdF1gzAMPIUBmg3SBQr2BhkhI9DJygYdodlAQBZINsgCifvUxjyTZxu9EvJV/wHiTrqTLMLChxbGx3MJDsxbR/QB4DVSWVMa8y7ve+Yav3HRUxozJD6qoGvbIwGbjGwqkiRB37ZOwMOAnEepSh5GwMzrgojvJX0IgYCviL4IMA44hdLOJgjBAXQX57YFsPPGzyKIgVtrz2F3/ZkgB+6bQYwvrW3886hNc12kAY91nIpAC953XVNWVR0SqQh6ZjHw0xvqNb/P+KbAMIzyXUVwM3B3AfYp8J+YyKCqCTS37j/BpEoaiWQiXyaRMgFyL1XGDPtkZLIsnCtRM7ETkvACvnKufrN2H53kOZmn/n3uTl6igm/4bcoZlvHtzwAAAABJRU5ErkJggg==" />
                      </span>
                      <span className="bg-slate-700 inline-block rounded-md px-3 py-3 mb-2 text-gray-700">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQBJREFUSEvtVbsNwjAQfRfYA0ponEs6poCSEShhAlZgDErGoIqdCImUsAfkUCIF8betkArc5vm9e3e5Z0LLh1rmh1Ug03oiREsC2LGYA0QWKoo2Jd4qkBpzIKDnSF7BBDAhc+QkkBkjPuQ1VjFXxVsdtC5gq15r3e8EwQoi41usswObQPl9pzUXRPqjQJIkYTcI1gAGLqQA8lNRTOM4Tkv8YyufHGTG7D3I6xpyxTx0FWj0t7g4+AvcdeDVkL/ZolQxV9l13eSmG1vfF+BIIvOnsGsq8G53vubgNwT8o4Joq8Jw9Cm7rjPwDjui7el8ntVhZ52BY4J6w6wvmjfjw4ULNXqMGUMmJDAAAAAASUVORK5CYII=" />
                      </span>
                      <span className="bg-slate-700 inline-block rounded-md px-3 py-3 mb-2 text-gray-700">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPVJREFUSEu9ldERgjAMQBMdQEdwAA/ICE6iTuQI4gaO4AYBzgEcgQU0XjnhBFpMKZjv8l6SJgVh5sCZ+RAkKJgPJsGIKHUlOlpQwRHPFVjk6JKMEjDzeon4AIBVk7lD4i0wcCIq78zJC/HWSBAvURxXLfsOL8GnLaeFyG5LlDUSxKsNbkRqQavnAGUtYeYNEZl2WUMl6MBrUPkUoSG4qgIHHMDRc687KPI8BZF9r3YlfLCCKeBOwVRwq8AJH9jWofesN0VFlknvg5FwewVdQQD8tyAQrtqD0P+FapNDJP8XWKfIo4QoSVpJ68Z0SoEHS3V09jt4A4JofhnQlVrOAAAAAElFTkSuQmCC" />
                      </span>
                      <button className="bg-slate-700 inline-block rounded-md px-3 py-3 mb-2 text-gray-700" onClick={deleteShortLink}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALVJREFUSEvtldsNwjAMRa9ZhAVQsDdhBNiAEdiEjsAmTisGgEUwX0VQpYlbtfy0+Yysc5ybF2HmQTPzURQ0qkcQXZONmJ2CSJVrMiu4q/KLSHOAjZnsRGJfzY+gidGmiCwwf7j/FUzRfZeR3IOxUX1H04oWIGiX3Y0tNT8qolVQPEVrRAuIaMgD6L5odYwPArZD4ADqwMy+11T1AKILgL1HYsCTzM5B5OYSeKDemuKn7wX11b0Blo+hGbsz/90AAAAASUVORK5CYII=" />
                      </button>
                    </div>
                    {/* end of card */}
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {showModal ? <Modaladdlink setShowModal={setShowModal} url={url} setUrl={setUrl} namelink={namelink} setNameLink={setNameLink} handleFormSubmit={handleFormSubmit} /> : null}
      </>
    );
  }
}
