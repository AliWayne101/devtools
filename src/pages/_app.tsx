import '@/scss/index.scss';
import type { AppProps } from 'next/app'
import { Inter, Fira_Code } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ["latin"], weight: ["300", "500", "700"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });


export default function App({
  Component,
  pageProps: {
    session, ...pageProps
  }
}: AppProps) {
  return (
    <>
      <style jsx global>{`:root{
      --inter: ${inter.style.fontFamily};
      --fira-code: ${firaCode.style.fontFamily};
    }`}</style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
