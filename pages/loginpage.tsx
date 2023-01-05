import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../firebase/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Loginpage() {
  const [isLogin, seIsLogin] = useState(false);
  const { user, login, logout } = useAuth();
  const route = useRouter();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('dataUser');
    if (dataFromLocal) {
      seIsLogin(true);
    }
  }, []);

  const signOut = () => {
    localStorage.clear();
    logout();
    window.location.reload();
  };

  // const signInWithGoogle = async () => {
  //   await signInWithPopup(auth, provider).then((data) => {
  //     localStorage.setItem('tokenfb', JSON.stringify(data.user));
  //     // console.log('datadarigoogle', data.user);
  //   });
  //   route.push('/dashboard');
  // };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login(data.email, data.password);
      localStorage.setItem('dataUser', JSON.stringify(res.user));
      // window.location.reload();
      seIsLogin(true);
      route.push('/dashboard');
      console.log('userdrhandle', res);
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, { theme: 'colored' });
    }
    console.log(data);
  };

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Galaxly | Logout Page</title>
          <meta name="description" content="Shortner Link Url" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/galaxly-logo-removebg-preview.png" />
        </Head>
        <main className="main justify-center">
          <div className=" ">
            <button
              onClick={signOut}
              className="sm:mx-auto mx-0 lg:mx-0 font-semibold rounded-xl py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700"
              style={{ display: 'inline-block' }}
            >
              <span>Sign Out </span>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARFJREFUSEvtlUGSgjAQRX/jxqU30LnBJIu2XMlNdG4aV5ZZAN5Ab5ALYFuhlGIwgFhkZ3Z00/81nfBDiLwosj7eBmTWFgCWQmQSEQPgoJh9rHeNAUhAyQ0Bg4DMWt/hNtQaAX8CpBBJQbRsvVNoZtWMdQFC3VZ1mrmuyY/HFWaztAICu3beP/cCmmKZtRW0GWt22pX/AuopTTqiPM8XXlkp5Z6ESQHZ6XQBkWjmnzgAax1EnF6vV1EA1fmfz120EYX+8En34AvAc56hUbyYXZJsb0QpAfsxZtdt1yL7h6B30PqYPpo5a+bfQbvu28R/OZEriAwBBmVp1GZzadeOudEKiCyGBD8GDN29Xfm3v+BTwB0dD/UZ7esXPAAAAABJRU5ErkJggg=="
                style={{ verticalAlign: 'middle', display: 'inline-block' }}
              />
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Galaxly | Login Page</title>
          <meta name="description" content="Shortner Link Url" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/galaxly-logo-removebg-preview.png" />
        </Head>
        <main className="main justify-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          email: e.target.value,
                        })
                      }
                      value={data.email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          password: e.target.value,
                        })
                      }
                      value={data.password}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {/* <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                          Remember me
                        </label>
                      </div>
                    </div> */}
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="sm:mx-auto w-full mx-0 lg:mx-0 font-semibold rounded-xl py-2 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700"
                  >
                    Sign in
                  </button>
                  {/* <button
                    onClick={signInWithGoogle}
                    className="sm:mx-auto w-full mx-0 lg:mx-0 font-semibold rounded-xl py-2 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700"
                    style={{ display: 'inline-block' }}
                  >
                    <span>Sign in with google </span>
                    <svg style={{ verticalAlign: 'middle', display: 'inline-block' }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                  </button> */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
        <ToastContainer />
      </>
    );
  }
}
