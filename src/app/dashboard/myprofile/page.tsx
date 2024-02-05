import Profile from '@/components/profile/Profile'
import { cookies } from 'next/headers';
import React from 'react'

const ProfilePage = () => {
  const cookie = cookies();
  const token:any = cookie.get("token");
  return (
    <div  className='bg-slate-200 h-screen'>
      <Profile details={token}/>
    </div>
  )
}

export default ProfilePage
