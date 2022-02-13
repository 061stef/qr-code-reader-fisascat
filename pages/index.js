import Head from 'next/head'
import { useEffect, useState } from 'react'
import Login from '../components/Login/Login'
import ReaderQr from '../components/QrReader/QrReader'
import { checkLogged, TOKEN_NAME } from '../lib/utils'

export default function Home() {

  const [logged, setLogged] = useState(false)

  useEffect(async () => {
    const token = localStorage.getItem(TOKEN_NAME)
    const isLogged = await checkLogged(token)
    console.log(isLogged);
  })
  
  const cb = () => {
    setLogged(true)
  }

  return (
    <div className="container">
      <Head>
        <title>XX Congresso - QrReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!logged ? <Login callback={cb} /> : <ReaderQr />}
    </div>
  )
}
