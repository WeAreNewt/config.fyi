import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import dataService from '../services/data'
import {
  ChainId
} from '@aave/contract-helpers';
import { marketConfig } from '../utils/marketconfig';

const Home: NextPage = () => {

  interface Asset {
    symbol: string,
    baseLTVasCollateral: string,
    reserveLiquidationThreshold: string,
    liqBonus: string,
    collRatio: string,
    reserveFactor: string,
    varBorrowRate: string,
    stableBorrowRate: string,
    avgStableBorrowRate: string,
    canBorrow: string,
    stableBorrowingEnabled: string
}
  // Risk parameters for assets on ethereum mainnet
  const [riskParamsEthereum, setRiskParamsEthereum] = useState<Asset[] | undefined>([]);
  const [riskParamsAvalanche, setRiskParamsAvalanche] = useState<Asset[] | undefined>([]);
  const [riskParamsPolygon, setRiskParamsPolygon] = useState<Asset[] | undefined>([]);
  const [riskParamsEthAMM, setRiskParamsEthAMM] = useState<Asset[] | undefined>([]);
  
  useEffect(() => {
    dataService.fetchReservesAny(marketConfig.ethereum).then(data => setRiskParamsEthereum(data))
    dataService.fetchReservesAny(marketConfig.avalanche).then(data => setRiskParamsAvalanche(data))
    dataService.fetchReservesAny(marketConfig.polygon).then(data => setRiskParamsPolygon(data))
    dataService.fetchReservesAny(marketConfig.ethamm).then(data => setRiskParamsEthAMM(data))
    
  }, []);

  const listItems = riskParamsEthereum?.map(n =>
     <li key = {n.symbol}>
       {n.symbol + ', '} 
       {'LTV -> ' + n.baseLTVasCollateral + ' '}
       {'Liquidation Thereshold -> ' + n.reserveLiquidationThreshold + ' '}
       {'Liquidation Bonus -> ' + n.liqBonus + ' '}
       {'Collateralization Ratio -> ' + n.collRatio + ' '}
       {'Can be borrowed -> ' + n.canBorrow + ' '}
       {'Variable Borrow Rate -> ' + n.varBorrowRate + ' '}
       {'Stable Borrow Rate -> ' + n.stableBorrowRate}</li>)
       

  const listItemsAvalanche = riskParamsAvalanche?.map(n =>
    <li key = {n.symbol}>
      {n.symbol + ', '} 
      {'LTV -> ' + n.baseLTVasCollateral + ' '}
      {'Liquidation Thereshold -> ' + n.reserveLiquidationThreshold}</li>)

  const listItemsPolygon = riskParamsPolygon?.map(n =>
    <li key = {n.symbol}>
      {n.symbol + ', '} 
      {'LTV -> ' + n.baseLTVasCollateral + ' '}
      {'Liquidation Thereshold -> ' + n.reserveLiquidationThreshold}</li>)

  const listItemsEthAMM = riskParamsEthAMM?.map(n =>
    <li key = {n.symbol}>
      {n.symbol + ', '} 
      {'LTV -> ' + n.baseLTVasCollateral + ' '}
      {'Liquidation Thereshold -> ' + n.reserveLiquidationThreshold}</li>)
  

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

        <h1>Aave</h1>
        <ul>{listItems}</ul>

        <h1>Avalanche</h1>
        <ul>{listItemsAvalanche}</ul>

        <h1>Polygon</h1>
        <ul>{listItemsPolygon}</ul>
        
        <h1>ETH AMM</h1>
        <ul>{listItemsEthAMM}</ul>

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
