import * as React from 'react'
import 'antd/dist/antd.css'
import 'styles/global.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}