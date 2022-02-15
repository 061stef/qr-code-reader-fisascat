import Head from 'next/head'
import { useEffect, useState } from 'react'
import LoadingOverlay from 'react-loading-overlay'
import Login from '../components/Login/Login'
import ModalResponse from '../components/ModalResponse/ModalResponse'
import ReaderQr from '../components/QrReader/QrReader'
import { apiCall, BASE_PATH, checkLogged, TOKEN_NAME } from '../lib/utils'
import { FaBeer, FaExclamationTriangle } from 'react-icons/fa';

const setting = {
  spinner: (base) => ({
    ...base,
    width: '100px',
    height: '100vh',
    
  })
}

export default function Home() {

  const [logged, setLogged] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [loader, setLoader] = useState(false);
  const [responseStatus, setResponseStatus] = useState(500);
  const [responseMessage, setRespMessage] = useState('Delegato inesistente per questa regione');

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
      const json = await response.json();
      setResponseStatus(response.status);
      setRespMessage(json); 

    } catch (err) {
      setResponseStatus(500);
      setRespMessage(err); 
    }
    setShowResponse(true);
  }

  const closeResp = () => {
    setShowResponse(false);
  }

  return (
    <LoadingOverlay active={loader} spinner
      text='Loading your content...' styles={setting}>
      <div className="container">
        <Head>
          <title>XX Congresso - QrReader</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></link>
        </Head>
        <img src="https://fisascat.it/congresso-logo.png" className={'img-logo'} />
        {!logged ? <Login callback={cb} /> : !showResponse ? <ReaderQr callback={resCb} /> : <ModalResponse callback={closeResp} status={responseStatus} message={responseMessage}  />}
      </div>
    </LoadingOverlay >
  )
}
