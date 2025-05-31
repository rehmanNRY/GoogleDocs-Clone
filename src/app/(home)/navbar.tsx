import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './search-input'
import { UserButton, OrganizationSwitcher } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href={'/'} className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.svg"
            alt='logo'
            width={30}
            height={30}
            className="hover:scale-105 transition-transform"
          />
        </Link>
        <h3>Docs</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl={'/'}
          afterSelectPersonalUrl={'/'}
        />
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar