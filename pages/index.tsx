import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import dataService from '../services/data'


const Home: NextPage = () => {

  interface Asset {
    symbol: string,
    baseLTVasCollateral: string,
    reserveLiquidationThreshold: string
}
  // Risk parameters for assets on ethereum mainnet
  const [riskParams, setRiskParams] = useState<Asset[] | undefined>([]);

  const getData = async () => {
    const result = await dataService.fetchReserves().then(res => res)
    return result
  }
  
  useEffect(() => {
    dataService.fetchReserves().then(data => setRiskParams(data))
    
  }, []);
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Configexperiment</title>
      </Head>
    
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Configexperiment
         
        </h1>

        <p className={styles.description}>
          Risk parameters from top DeFi protocols
        </p>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
