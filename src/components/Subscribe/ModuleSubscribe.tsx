import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import examcongress from "../../../public/coachings/examcongress.jpg";
import { coachingImageLinks } from '@/lib/rawdata';

interface ModuleSubscribeProps {
  module: {
    id: string;
    name: string;
    moduleNo: number;
    examType:
      "UPSC"
      | "SSC"
      | "JEE"
      | "NEET"
      | "GATE"
      | "IBPS"
      | "CET"
      | "CAT"
      | "RAS"
      | "BPSC"
      | "UPPSC"
      | "MPPSC"
      | "HSC";
    testType: string | null;
    coaching: string | null;
    createdAt: Date;
  };
}

const ModuleSubscribe:React.FC<ModuleSubscribeProps> = ({module}) => {
  return (
    <div className="flex flex-col gap-[0.6rem] min-h-[16rem] min-w-[16rem] border-[2px] border-black/20 p-4 rounded-lg">
      <h1 className='text-center font-semibold'>{module.name}</h1>
      <h1 className='text-center'>{module.coaching}</h1>
      {/* <h1>
        {module.createdAt ? new Date(module.createdAt).toDateString() : ""}
      </h1> */}

      {/* {isAttempted.length > 0 ? (
        <Link href={`/result/${test.id}`}>
          <Button className="bg-emerald-500 hover:bg-emerald-500/80 w-full">
            Check Result
          </Button>
        </Link>
      ) : (
        <Link href={`/testseries/${test.id}`}>
          <Button className="w-full">Start Test</Button>
        </Link>
      )} */}
      <Image src={coachingImageLinks(module.coaching!)} className='w-28 h-28 rounded-full border-2 border-neutral-200 mx-auto' alt='coaching'/>
      <Link href={`/subscribe/module/${module.id}`}>
        <Button className="w-full" asChild>
          <div className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            <h1>Subscribe</h1>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default ModuleSubscribe
