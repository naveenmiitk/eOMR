import AddTestToModule from '@/components/module/AddTestToModule';
import SubscribeUserToModule from '@/components/module/SubscribeUserToModule';
import TableModule from '@/components/module/TableModule';
import { Button } from '@/components/ui/button';
import { getUserAuth } from '@/lib/auth/utils';
import { api } from '@/lib/trpc/api';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'


const page = async () => {
  unstable_noStore();
  const allModule = await api.admin.getAllModuleTrpc.query();
  const allTest = await api.users.getAllTestofUPSCTrpc.query();
    
  return (
    <main className="">
      <section className="min-h-screen p-[2rem] flex flex-col space-y-8">
        <div className="flex flex-col items-center justify-center py-8">
          <h1>Sign in as Admin Role!</h1>
        </div>
        <div className="flex items-center justify-around *:max-w-fit">
          <Button>
            <Link href="/create">Create New Test</Link>
          </Button>
          <Button>
            <Link href="/mod/module">Create New Module</Link>
          </Button>
        </div>
        <div>
          <h1 className="text-xl text-center">All Module</h1>
          <TableModule data={allModule} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h1 className="text-xl text-center">Link Test to Module</h1>
            <AddTestToModule data={allTest} moduleData={allModule} />
          </div>
          <div>
            <h1 className="text-xl text-center">Subscribe User to Module</h1>
            <SubscribeUserToModule data={allTest} moduleData={allModule} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default page
