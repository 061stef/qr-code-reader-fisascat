import Head from 'next/head'
import { useState } from 'react'

export default function Home() {

  const [logged, setLogged] = useState(null)

  if(!logged){
    return(
      <div>Loading</div>
    )
  }
  return (
    <div className="container">
      <Head>
        <title>XX Congresso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {logged ? <div>logged</div> : <div>Not logged</div>}
    </div>
  )
}
