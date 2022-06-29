// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/styles.css'
import TopNav from '../components/TopNav'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider} from "../context"

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <Provider>
    <ToastContainer position="top-center" />
    <TopNav />
    <Component {...pageProps} />
  
    </Provider>
  )
}

export default MyApp
