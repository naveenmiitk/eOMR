import { getUserAuth } from '@/lib/auth/utils'
import { render } from '@react-email/render'
import React from 'react'

// interface SignUpMailProps {
//   data : {
//     name : string
//   }
// }

interface SignUpMailProps {
  name :string;
}


const SignUpMail: React.FC<SignUpMailProps> = ({name}) => {
  return (
    <div>
      <h3>Hi {name}, </h3>
      <h3>Welcome to eOMR</h3>
      <h3>We welcome you onboard eOMR. Attempt test to get Analysis.</h3>
      <h4>Thanks and Regards</h4>
      <h4>eOMR</h4>
    </div>
  )
}

export default SignUpMail


// export const SignupMailHTML = render(<SignUpMail data={data}/>)