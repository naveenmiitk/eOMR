import { api } from '@/lib/trpc/api';
import React from 'react'
import TestCardComponent from './TestCardComponent';

interface ModuleToTestProps {
    moduleId : string;
}

const ModuleToTest:React.FC<ModuleToTestProps> = async ({moduleId}) => {
    const test = await api.users.getAllTestsOfAModuleTrpc.query(moduleId);
  return (
    <div className="space-y-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
        {test.map((item, index) => (
          <div key={index} className="p-4 space-y-4  ">
            <TestCardComponent test={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleToTest
