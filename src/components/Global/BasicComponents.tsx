import Link from 'next/link'
import React from 'react'

const BasicComponents = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default BasicComponents


export const Heading = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl text-indigo-800 font-bold">{children}</h1>
      <div className="h-1 w-10 bg-emerald-500 "></div>
    </div>
  );
}

export const BlueLink = ({children , href} : {children: React.ReactNode, href: string}) => {
  return (
    <Link
      href={href}
      className="underline text-indigo-700 underline-offset-4"
      target="_blank"
    >
      {children}
    </Link>
  );
}

export const Bold = ({children} : {children: React.ReactNode}) => {
  return (
    <span className="font-semibold">{children}</span>
  );
}
