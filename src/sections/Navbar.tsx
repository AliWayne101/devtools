import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex sticky top-0 w-full justify-between bg-secondary p-6 nav">
        <div>Logo {session && (session.user?.email)}</div>
        <div className="flex mr-10">
          <div className="flex cursor-pointer" onClick={() => signIn()}>
            <FaSignInAlt size={16}/>
            <span className="pl-2">Sign In</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar