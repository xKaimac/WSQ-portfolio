import SideMenu from '@/components/nav/SideMenu';
import '@/styles/globals.css';

import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const router= useRouter()


  return (
    <>
    <SideMenu />
      <Component key={router.asPath}{...pageProps} />
    </>
  )
}

export default App
