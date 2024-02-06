import Profile from '@/components/profile/Profile'
import { cookies } from 'next/headers';
import React from 'react'

const ProfilePage = () => {
  const cookie = cookies();
  const token:any = cookie.get("token");
  return (
    <div>
      <Profile details={token}/>
    </div>
  )
}

export default ProfilePage
