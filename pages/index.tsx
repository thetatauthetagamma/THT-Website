import Head from 'next/head'

import Brotherhood from '../components/Brotherhood'

export default function Home() {
  return (
    <div>
      <Head>
      <title>Theta Tau Theta Gamma</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="favicon.png" />
     </Head>
      <div className="">
        <div className = "">
          <h1 className= "">
              THETA TAU THETA GAMMA
          </h1>
        </div>
        <div className = "">
          <Brotherhood />
        </div>
      </div>
    </div>
  )
}
