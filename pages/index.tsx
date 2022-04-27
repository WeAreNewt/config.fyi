import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useEffect, useState } from 'react';



const Home: NextPage = () => {

  interface Asset {
    name: string,
    ltv: string
  }
  
  // LTV and liquidaton thereshold for assets on ethereum mainnet
  const [ltvETH, setLtvETH] = useState<Array<Asset>>([]);
  const [liqTheresholdETH, setliqTheresholdETH] = useState<Array<Asset>>([]);

  const alchemy_url = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
  const web3 = new Web3(alchemy_url);
  const abi : AbiItem = require('../abis/abi.json')
  const lendingPoolAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'

  const ethereumMainnetAssets = 
  [
    {name: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'},
    {name: 'TUST', address: '0x0000000000085d4780B73119b644AE5ecd22b376'},
    {name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},
    {name: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {name: 'AAVE', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'},
    {name: 'BAL', address: '0xba100000625a3754423978a60c9317c58a424e3D'},
    {name: 'BAT', address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF'},
    {name: 'CRV', address: '0xD533a949740bb3306d119CC777fa900bA034cd52'},
    {name: 'DPI', address: '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b'},
    {name: 'ENJ', address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c'},
    {name: 'KNC', address: '0xdd974D5C2e2928deA5F71b9825b8b646686BD200'},
    {name: 'LINK', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA'},
    {name: 'MANA', address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'},
    {name: 'REN', address: '0x408e41876cCCDC0F92210600ef50372656052a38'},
    {name: 'SNX', address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'},
    {name: 'UNI', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'},
    {name: 'WBTC', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'},
    {name: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'},
    {name: 'XSUSHI', address: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272'},
    {name: 'YFI', address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'},
    {name: 'ZRX', address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498'}
  ]

  
  const getData = () => {

    const tempLtv: Asset[] = []
    const tempLiq: Asset[] = []
    const contract = new web3.eth.Contract(abi, lendingPoolAddress)
    
    for (var i = 0; i < ethereumMainnetAssets.length; i += 1){
      contract.methods.getReserveData(ethereumMainnetAssets[i].address).call().then((response : any) => {

        const binaryValue1 = BigInt(response[0].data).toString(2).slice(-32).slice(-15) //bits 16-31
        const binaryValue2 = BigInt(response[0].data).toString(2).slice(-32).slice(0,16) //bits 16-31

        const ltvValue = parseInt(binaryValue1,2)/100 + '%'
        const liq = parseInt(binaryValue2,2)/100 + '%'

        tempLtv.push({name: ethereumMainnetAssets[i].name, ltv: ltvValue})
        tempLiq.push({name: ethereumMainnetAssets[i].name, ltv: liq})
      })
      
    }
    setLtvETH(tempLtv)
    setliqTheresholdETH(tempLiq)
  }

  useEffect(() => {
    getData() 
    
  }, []);
  useEffect(() => {
    console.log(ltvETH)
    console.log(liqTheresholdETH)
  }, [ltvETH,liqTheresholdETH]);



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
