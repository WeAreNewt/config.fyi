import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import dataService from '../services/data'
import { marketConfig } from '../utils/marketconfig';
import { CssBaseline, SelectChangeEvent } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Loading from '../components/Loading';
import DownloadCsv from '../components/Downloadcsv';
import Info from '../components/Info';
import Dropdown from '../components/Dropdown';
import Header from '../components/Header';
import Tablev2 from '../components/Tablev2';
import Tablev3 from '../components/Tablev3';


const Home: NextPage = () => {
  const [ riskParams, setRiskParams ] = useState<Asset[] | undefined>([]);
  const [ market, setMarket ] = useState<any >()
  const [ selectedMarket, setSelectedMarket ] = useState<string>('')
  const [ protocol, setProtocol ] = useState<string >('')
  const [ protocolSelected, setProtocolSelected ] = useState<boolean>(false)
  const [ marketSelected, setMarketSelected ] = useState<boolean>(false)
  const [ marketLoading, setMarketLoading ] = useState<boolean>(false)
  const [ missingProtocol, setMissingProtocol ] = useState<boolean>(false)
  const [ darkMode, setDarkMode ] = useState<boolean>(true)


  const handleProtocolChange = (event: SelectChangeEvent) => {
    setProtocol(event.target.value)
    setSelectedMarket('')
    setRiskParams(undefined)
    setProtocolSelected(true)
    setMarketSelected(false)
    setMissingProtocol(false)

    if(event.target.value === 'v2')setMarket(markets.v2)
    if(event.target.value === 'v3')setMarket(markets.v3)
    if(event.target.value === 'univ3'){
      setMarket(markets.univ3)
      setMissingProtocol(true)
    }
    if(event.target.value === 'crvv2'){
      setMarket(markets.crvv2)
      setMissingProtocol(true)
    }

  }

  const handleMarketChange = (event: SelectChangeEvent) => {
    setSelectedMarket('')
    setMarketSelected(true)
    setSelectedMarket(event.target.value)
    
    if(event.target.value === 'all') setMissingProtocol(true)

    if(!(event.target.value === 'all')){
      setMarketLoading(true)
      const mkt = market?.find((n: { name: string; }) => n.name === event.target.value)
      dataService.fetchReservesAny(mkt.config, protocol).then(data => {
        setRiskParams(data)
        
        setMarketLoading(false)
      })
    }
  }
  
  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.down('sm'));

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'IBM Plex Mono',
      fontSize: matches ? 9 : 11
     }
  });

  interface Asset {
    symbol: string,
    canCollateral: string,
    LTV: string,
    liqThereshold: string,
    liqBonus: string,
    reserveFactor: string,
    canBorrow: string,
    optimalUtilization: string,
    varBorrowRate: string,
    canBorrowStable: string,
    stableBorrowRate: string,
    shareOfStableRate: string,
    debtCeiling?: string,
    supplyCap?: string,
    borrowCap?: string,
    eModeLtv?: string
    eModeLiquidationThereshold?: string,
    eModeLiquidationBonus?: string,
    assetLink: string,
}

  const markets = {
    v2 : [
      {
        name: 'ethereum',
        config: marketConfig.ethereum
      },
      {
        name: 'eth amm',
        config: marketConfig.ethamm
      },
      {
        name: 'avalanche',
        config: marketConfig.avalanche
      },
      {
        name: 'polygon',
        config: marketConfig.polygon
      }
    ],
    v3 : [
      {
        name: 'arbitrum',
        config: marketConfig.arbitrum
      },
      {
        name: 'avalanche',
        config: marketConfig.avalanchev3
      },
      {
        name: 'fantom',
        config: marketConfig.fantom
      },
      {
        name: 'harmony',
        config: marketConfig.harmony
      },
      {
        name: 'optimism',
        config: marketConfig.optimism
      },
      {
        name: 'polygon',
        config: marketConfig.polygonv3
      }
    ],
    univ3 : [{
      name: 'all'
    }],
    crvv2 : [{
      name: 'all'
    }]
  }

  return (
    
    <div className={styles.container}>
      
      <ThemeProvider theme={theme} >
      <CssBaseline />
      <Head>
        <title>config.fyi</title>
      </Head>
      
      <Header matches={matches} darkMode={darkMode} onChange={() => setDarkMode(!darkMode)}/>
      
      <Dropdown matches={matches} protocol={protocol} handleProtocolChange={handleProtocolChange} selectedMarket={selectedMarket} protocolSelected={protocolSelected} market={market} handleMarketChange={handleMarketChange}/>
      
      {!matches && <DownloadCsv protocol={protocol} riskParams={riskParams} marketSelected={marketSelected} missingProtocol={missingProtocol}/>}
      
      {protocol === 'v3' ? <Tablev3 matches={matches} riskParams={riskParams}/> : <Tablev2 matches={matches} riskParams={riskParams}/>  }
      {marketLoading ?  <Loading marketLoading={marketLoading} /> : ''} 
      
      <Info marketSelected={marketSelected} missingProtocol={missingProtocol}/>

      </ThemeProvider>
    </div>
  )
}

export default Home
