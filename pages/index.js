import Head from 'next/head'
import { useState } from 'react'
import Login from '../components/Login/Login'

export default function Home() {

  const [logged, setLogged] = useState(true)

  if(!logged){
    return(
      <a href="/reader" ><div >Loading</div></a>
    )
  }
  return (
    <div className="container">
      <Head>
        <title>XX Congresso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Login />
    </div>
  )
}
