import SubscribeButton from '@/components/Subscribe/SubscribeButton';
import TableForTestModule from '@/components/Subscribe/TableForTestModule';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc/api';
import { Lock } from 'lucide-react';
import React from 'react'

type Props = {
  params: {
    id: string;
  };
};


const ModuleSubscribePage = async ({ params: { id } }: Props) => {
    const allTests = await api.users.getAllTestsOfAModuleTrpc.query(id);
  return (
    <div className="space-y-4">
      <h1>Module Id : {id}</h1>
      {/* <pre className="p-4 break-all rounded-sm shadow-sm bg-secondary text-secondary-foreground whitespace-break-spaces">
      {JSON.stringify(allTests, null, 2)}
    </pre> */}
      {allTests.length < 1 && <h1>No Tests uploaded yet.</h1>}
      {allTests.length > 0 && <h1>Total No of Tests : {allTests.length}</h1>}

      {allTests.length > 0 && (
        <>
          <TableForTestModule data={allTests} />
          <div className='flex max-w-4xl mx-auto justify-start'>
            <h1 className='font-semibold'>Price : Free</h1>
          </div>
          <SubscribeButton id={id} />
        </>
      )}
    </div>
  );
};

export default ModuleSubscribePage
