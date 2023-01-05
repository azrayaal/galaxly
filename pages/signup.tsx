import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';

export default function Loginpage() {
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    displayname: '',
    email: '',
    password: '',
  });

  const route = useRouter();

  const handleSignUP = async (e: any) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password, data.displayname);
      route.push('/loginpage');
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Galaxly | Signup Page</title>
        <meta name="description" content="Shortner Link Url" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/galaxly-logo-removebg-preview.png" />
      </Head>
      <main className="main justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign up to your account</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUP}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                  </label>
                  <input
                    type="name"
                    name="text"
                    id="name"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        displayname: e.target.value,
                      })
                    }
                    value={data.displayname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="azrayaal"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        email: e.target.value,
                      })
                    }
                    value={data.email}
                    id="email"
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
                    onChange={(e: any) =>
                      setData({
                        ...data,
                        password: e.target.value,
                      })
                    }
                    value={data.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="sm:mx-auto w-full mx-0 lg:mx-0 font-semibold rounded-xl py-2 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-slate-700"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
