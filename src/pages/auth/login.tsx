import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  loginDataSchema,
  TLoginRequest
} from '@/types/auth/login/TLoginRequest';
// import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/redux/api/auth/auth.api';

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
  console.log('render login');
  return (
    <div className='flex h-full min-h-screen w-full items-center justify-center bg-white'>
      <form onSubmit={onSubmit} method='post' className='w-[400px]'>
        <div className='mt-8 grid w-full grid-cols-1 gap-y-6'>
          {/* Title */}
          <h1>Login</h1>
          {/* Login Name */}
          <div className='flex flex-row'>
            <label
              htmlFor='loginName'
              className='flex flex-[0.3] items-center justify-start'
            >
              Username
            </label>
            <input
              type='text'
              className={`flex-[0.6] `}
              placeholder='username'
              autoComplete='on'
              {...register('username')}
            />
          </div>

          {/* Password*/}
          <div className='relative flex flex-row'>
            <label
              htmlFor='password'
              className='flex flex-[0.3] items-center justify-start'
            >
              Password
            </label>
            <input
              type={show ? 'text' : 'password'}
              className={`flex-[0.6] `}
              placeholder={'Password'}
              autoComplete='on'
              {...register('password')}
            />
          </div>
          <button
            className='right-[12%] top-[20%] cursor-pointer flex justify-center'
            onClick={e => console.log(errors)}
          >
            Summit
          </button>
        </div>
        <p
          className='mt-6 text-center text-sm text-blue-500 underline hover:cursor-pointer'
          onClick={e => e}
        ></p>
      </form>
    </div>
  );
}
