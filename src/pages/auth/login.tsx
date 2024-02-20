import { useForm } from 'react-hook-form';
import { MouseEventHandler, startTransition, useState } from 'react';
import { useRouter } from 'next/router';
import {
  loginDataSchema,
  TLoginRequest
} from '@/types/auth/login/TLoginRequest';
// import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/redux/api/auth/auth.api';
import dynamic from 'next/dynamic';

const VisibilityIcon = dynamic(() => import('@mui/icons-material/Visibility'));
const VisibilityOffIcon = dynamic(
  () => import('@mui/icons-material/VisibilityOff')
);

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<TLoginRequest>({
    defaultValues: {
      username: '',
      password: '',
      role: '2'
    },
    resolver: zodResolver(loginDataSchema)
  });
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = handleSubmit(async data => {
    console.log('data login ne', { data });
    try {
      const payload = await login(data).unwrap();
      if (payload.success) {
        console.log('sucess payload');
        router.push('/report/main', '/report/main', { scroll: true });
        console.log('sucess push');
      }
    } catch (error) {
      console.log('login loi r', { error });
    }
  });
  const handleShowPassword:
    | MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.preventDefault();

    startTransition(() => {
      setShow(!show);
    });
  };
  console.log('render login');
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        ></a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form
              onSubmit={onSubmit}
              method='post'
              className='space-y-4 md:space-y-6'
              action='#'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your name
                </label>
                <input
                  type='text'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  {...register('username')}
                />
                {errors.username?.message && (
                  <p className='text-red-500'>
                    {errors.username?.message.toString() ===
                      'userNameRequired' && 'Enter your name'}
                  </p>
                )}
              </div>
              <div className='relative'>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  id='password'
                  placeholder='Enter your passwords'
                  className='flex-[0.6] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('password')}
                />
                <button
                  className='absolute right-[3%] top-[50%] cursor-pointer'
                  onClick={e => handleShowPassword(e)}
                >
                  {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-[#3b82f6] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
