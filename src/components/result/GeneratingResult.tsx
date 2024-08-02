"use client";

import { trpc } from '@/lib/trpc/client';
import { sleep } from '@/lib/utils';
import { Loader2 } from 'lucide-react'
import React from 'react'

interface GeneratingResultProps {
    omrId: string
}

const GeneratingResult:React.FC<GeneratingResultProps> = ({omrId}) => {
    const calcuateMarks = trpc.users.getOMRDataByIdTrpc;
    const marks = calcuateMarks.useQuery(omrId);
    const data = marks.data;
    // console.log(data);
    console.log('generate result hit');
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
      <Loader2 className='w-10 h-10 animate-spin' />
      <h1 className='text-2xl'>Generating Your Result ...</h1>
    </div>
  )
}

export default GeneratingResult
