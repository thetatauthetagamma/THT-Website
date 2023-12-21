import React, { useEffect, useState } from 'react'
import Cookies
 from 'js-cookie'
export default function profile() {
  const [userEmail, setUserEmail] = useState();

  useEffect(() =>
  {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session) {
          setUserEmail(session.data.session?.user.email || '')
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
  }, [])


  return (
    <div>
        Hello Hari
    </div>
  )
}
