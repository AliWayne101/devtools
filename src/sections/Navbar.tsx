import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaSignInAlt, FaSignOutAlt, FaWrench, FaCode } from 'react-icons/fa';
import { CgChevronDown, CgDatabase } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { Menu, Transition } from '@headlessui/react';
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const navLinks = [
    { name: "Dashboard", link: "/profile", ico: <RiDashboardFill size={16} /> },
    { name: "Campaigns", link: "/campaigns", ico: <CgDatabase size={16} /> },
    { name: "Account", link: "/account", ico: <FaWrench size={16} /> },
    { name: "API", link: "/api", ico: <FaCode size={16} /> },
    { name: "Logout", link: "/logout", ico: "null" },
  ];

  console.log(session);
  return (
    <>
      <div className="flex sticky top-0 w-full justify-between bg-secondary p-6 nav">
        <div className="text-[var(--tsemilarge)] fira-code">
          <Link href={'/'} className="fira-code text-[var(--tsemilarge)]">DevTools</Link>
        </div>
        <div className="flex mr-10">

          {
            session ? (
              session.user && (
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-[var(--light-slate)]'>
                      {
                        <Image className='rounded-full' height={25} width={25} src={session.user.image!} alt={session.user.name!} />
                      }
                      <span className="pt-1">{session.user.name}</span>
                      <CgChevronDown className="mt-1" />
                    </Menu.Button>
                  </div>
                  <Menu.Items className='absolute right-0 z-10 mt-2 p-2 w-56 origin-top-right rounded-md bg-secondary border-4 border-indigo-500/50'>
                    <div className="py-1">
                      {
                        navLinks.map((data, index) => (
                          data.name === 'Logout' ? (
                            <Menu.Item>
                              <div className="flex cursor-pointer text-[var(--slate)] block px-4 py-2" onClick={() => signOut()}>
                                <FaSignOutAlt size={16} />
                                <span className="pl-2">Sign out</span>
                              </div>
                            </Menu.Item>
                          ) : (
                            <Menu.Item>
                              <Link href={data.link} className="flex text-[var(--slate)] block px-4 py-2 hover:text-[var(--light-slate)]">
                                {data.ico}
                                <span className="pl-2">{data.name}</span>
                              </Link>
                            </Menu.Item>
                          )
                        ))
                      }
                    </div>
                  </Menu.Items>
                </Menu>
              )
            ) : (
              <div className="flex cursor-pointer" onClick={() => signIn()}>
                <FaSignInAlt size={16} />
                <span className="pl-2">Sign In</span>
              </div>
            )
          }

        </div>
      </div >
    </>
  )
}

export default Navbar