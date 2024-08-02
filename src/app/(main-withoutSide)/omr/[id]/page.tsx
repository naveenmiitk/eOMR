import OMRCardComponent from '@/components/omr/OMRCardComponent';
import { getUserAuth } from '@/lib/auth/utils';
import { api } from '@/lib/trpc/api';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    id: string;
  };
};


const OMRTestPage = async ({ params: { id } }: Props) => {
    const {session} = await getUserAuth();
    const user = session?.user;

    if(!user) redirect("/sign-in");

    const testdata = await api.users.getTestByIdTrpc.query(id);

    // console.log(testdata);
 
    if(!testdata.length ) return (
      <div className='flex flex-col items-center justify-center space-y-4 min-h-screen'>
        <h1 className='text-lg font-semibold'>This test doesn&apos;t exists.</h1>
      </div>
    );
   const test = testdata[0];

  return (
    <main className='max-w-5xl mx-auto'>
      <section className='p-[1rem]'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          {/* <h1>OMR Test : {id}</h1> */}
          <h1 className="text-red-500 font-semibold">
            Note : Don&apos;t Close the window. Don&apos;t Press Back button
            while attempting Test.{" "}
          </h1>
        </div>
        <div>
            <OMRCardComponent id={id} userId={user.id} test={test}/>
        </div>
      </section>
    </main>
  );
};

export default OMRTestPage
