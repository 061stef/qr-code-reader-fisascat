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
  const [showResponse, setShowResponse] = useState(true);
  const [loader, setLoader] = useState(true);
  const [responseStatus, setResponseStatus] = useState(404);
  const [responseMessage, setRespMessage] = useState('Utente non Esistente');

  useEffect(async () => {
    const token = localStorage.getItem(TOKEN_NAME);
    const isLogged = await checkLogged(token)
    setLogged(isLogged);
    setLoader(false)
  })

  const cb = () => {
    setLogged(true)
  }

  const resCb = async (object) => {
    console.log('object', object);
    const token = localStorage.getItem(TOKEN_NAME);
    const data = object.split('§');
    console.log('mydata', data);
    const id = data[0];
    const email = data[1].replace(' ', '+');
    const regione = data[2];
    //const regione = data[3];
    try {
      const response = await apiCall(`${BASE_PATH}/users`, 'GET', { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, { email: email, id: id });
      console.log('response_user', response);
      if (!response.error) {
        const congressUser = response.data?.users?.find(user => user?.email === email && user?.id === id && user.region === regione);
        console.log(congressUser);
        if (congressUser) {
          if (congressUser.check_in && congressUser.check_in === true) {
            setResponseStatus(300);
            setRespMessage('Questo utente ha già effettuato il check-in alle ore ' + congressUser.check_in_data);
          } else {
            try {
              const option = {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ check_in: true, check_in_data: new Date() })
              }
              setResponseStatus(200);
              setRespMessage('OK');

            } catch (err) {
              console.error(err);
            }

          }

        } else {
          setResponseStatus(404);
          setRespMessage('Questo utente non esiste');
        }

      } else {
        setResponseStatus(404);
        setRespMessage('Not Found')
      }


    } catch (err) {
      setResponseStatus(500);
      setRespMessage(err);
    }
    setShowResponse(true);
  }

  const closeResp = () => {
    setShowResponse(false);
  }

  const logout = () => {

    localStorage.clear();
    setLogged(false);
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
          <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/manifest.json" />
        </Head>
        <img src="https://fisascat.it/congresso-logo.png" className={'img-logo'} />
        {!logged ? <Login callback={cb} /> : !showResponse ? <ReaderQr callback={resCb} logout={logout} /> : <ModalResponse callback={closeResp} status={responseStatus} message={responseMessage} />}
      </div>
    </LoadingOverlay >
  )
}
