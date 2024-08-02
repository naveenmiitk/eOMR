import CreateModule from '@/components/module/CreateModule'
import React from 'react'

const CreateNewModulePage = () => {
  return (
    <div className="flex flex-col min-h-screen space-y-8 lg:m-[2rem]">
      <div className="flex items-center justify-center mt-10">
        <h1>Create New Module</h1>
      </div>

      <CreateModule />
    </div>
  );
}

export default CreateNewModulePage
