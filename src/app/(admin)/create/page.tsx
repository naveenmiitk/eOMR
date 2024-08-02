import CreateTestForm from '@/components/TestSeries/CreateTestForm'
import React from 'react'

const CreateTestPage = () => {
  return (
    <main>
        <section className='p-[1rem] lg:p-[2rem]'>
            <div>
                <h1>Create New Test</h1>
            </div>
            <div>
                <CreateTestForm />
            </div>
        </section>
    </main>
  )
}

export default CreateTestPage
