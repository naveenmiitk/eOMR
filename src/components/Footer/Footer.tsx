import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-[1rem] px-[2rem] bg-[#f5f5f5] dark:bg-neutral-800 space-y-[1rem]">
      <div className="flex items-center space-x-[1rem]">
        <h1>
          An <span className="font-semibold">AUTOMATIC</span> mix
        </h1>
      </div>
      <div className="space-x-[1rem] flex flex-col md:flex-row space-y-[1rem] md:space-y-[0.2rem] items-center">
        <Link href="/refund" className="font-semibold">
          Refund Policy
        </Link>
        <Link href="/terms" className="font-semibold">
          Terms of Use
        </Link>
        <Link href="/privacy" className="font-semibold">
          Privacy
        </Link>
      </div>
    </div>
  );
}

export default Footer
