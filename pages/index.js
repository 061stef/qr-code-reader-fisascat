import Head from 'next/head'
import { useEffect, useState } from 'react'
import Login from '../components/Login/Login'
import ReaderQr from '../components/QrReader/QrReader'
import { apiCall, BASE_PATH, checkLogged, TOKEN_NAME } from '../lib/utils'

export default function Home() {

  const [logged, setLogged] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    const token = localStorage.getItem(TOKEN_NAME)
    const isLogged = await checkLogged(token)
    console.log(isLogged);
  })

  const cb = () => {
    setLogged(true)
  }
  const resCb = async (object) => {
    console.log('object', object);
    const token = localStorage.getItem(TOKEN_NAME);
    try {
      const response = apiCall(BASE_PATH + '/check', 'POST', { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });

    } catch (err) {

    }
    setShowResponse(true);
  }

  return (
    <div className="container">
      <Head>
        <title>XX Congresso - QrReader</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Head>
      <img src="https://fisascat.it/congresso-logo.png" className={'img-logo'} />
      {!logged ? <Login callback={cb} /> : <ReaderQr callback={resCb} />}

    </div>
  )
}
