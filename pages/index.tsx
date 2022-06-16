import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import dataService from '../services/data'
import { marketConfig } from '../utils/marketconfig';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, CssBaseline, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCSVDownloader } from 'react-papaparse';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const Home: NextPage = () => {
  const [ riskParamsEthereum, setRiskParamsEthereum ] = useState<Asset[] | undefined>([]);
  const [ market, setMarket ] = useState<any []>()
  const [ selectedMarket, setSelectedMarket ] = useState<string>('')
  const [ protocol, setProtocol ] = useState<string >('')
  const [ protocolSelected, setProtocolSelected ] = useState<boolean>(false)
  const [ marketSelected, setMarketSelected ] = useState<boolean>(false)
  const [ marketLoading, setMarketLoading ] = useState<boolean>(false)
  const [ darkMode, setDarkMode ] = useState<boolean>(true)

  const { CSVDownloader, Type } = useCSVDownloader()

  const handleProtocolChange = (event: SelectChangeEvent) => {
    setProtocol(event.target.value)
    setSelectedMarket('')
    setRiskParamsEthereum(undefined)
    setProtocolSelected(true)
    setMarketSelected(false)
    
    if(event.target.value === 'v2')setMarket(markets.v2)
    if(event.target.value === 'v3')setMarket(markets.v3)
  }

  const handleMarketChange = (event: SelectChangeEvent) => {
    setSelectedMarket('')
    setMarketSelected(true)
    setMarketLoading(true)
    setSelectedMarket(event.target.value)
    const mkt = market?.find(n => n.name === event.target.value)
    dataService.fetchReservesAny(mkt.config, protocol).then(data => {
      
      setRiskParamsEthereum(data)
      setMarketLoading(false)
    })
    
   
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'IBM Plex Mono',
      fontSize: 11
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
    ]
  }
  
  const DownloadCsv = () => {
    return (
      <Box sx={{p: 1}}>
      <CSVDownloader
        type={Type.Link}
        filename={'riskparameters'}
        bom={true}
        config={{
          delimiter: ';',
        }}
        data={riskParamsEthereum}
       
      >
      <Button color="inherit"  variant="outlined" disabled={!marketSelected} size='small' style={{textTransform: 'none'}} >
        <Typography variant="h6" >
        download csv
        </Typography>
      </Button>
      </CSVDownloader>
      </Box>
    )
  }

  const ProgressBar = () => {
    return (
        <Box sx={{height: 15, p: 5}}>
          <Backdrop open={marketLoading} exit={true}> 
          <CircularProgress  sx={{margin: 'auto', display: 'flex', width: '100%'}} color="inherit"/>
          </Backdrop>
        </Box>
    )
  }
 
  
  const Tablev2 = () => {
    return(
      <TableContainer sx={{ width: 1300, margin: 'auto' , border: '1px dashed grey' , size: 'small'}} >
        <Table size="small" aria-label="a dense table " >
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>asset</b></TableCell>
              <TableCell align="center"><b>can collateral</b></TableCell>
              <TableCell align="center"><b>LTV</b></TableCell>
              <TableCell align="center"><b>liquidation thereshold</b></TableCell>
              <TableCell align="center"><b>liquidation bonus</b></TableCell>
              <TableCell align="center"><b>reserve factor</b></TableCell>
              <TableCell align="center"><b>can borrow?</b></TableCell>
              <TableCell align="center"><b>optimal utilization</b></TableCell>
              <TableCell align="center"><b>variable borrow rate</b></TableCell>
              <TableCell align="center"><b>can borrow stable?</b></TableCell>
              <TableCell align="center"><b>stable borrow rate</b></TableCell>
              <TableCell align="center"><b>share of stable rate</b></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {riskParamsEthereum?.map((n) => (
              <TableRow
                key={riskParamsEthereum.indexOf(n)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{n.symbol}
                </TableCell>
                <TableCell align="center">{n.canCollateral}</TableCell>
                <TableCell align="center">{n.LTV}</TableCell>
                <TableCell align="center">{n.liqThereshold}</TableCell>
                <TableCell align="center">{n.liqBonus}</TableCell>
                <TableCell align="center">{n.reserveFactor}</TableCell>
                <TableCell align="center">{n.canBorrow}</TableCell>
                <TableCell align="center">{n.optimalUtilization}</TableCell>
                <TableCell align="center">{n.varBorrowRate}</TableCell>
                <TableCell align="center">{n.canBorrowStable}</TableCell>
                <TableCell align="center">{n.stableBorrowRate}</TableCell>
                <TableCell align="center">{n.shareOfStableRate}</TableCell>
                <TableCell align="center"><a href={n.assetLink} target="_blank"  rel="noreferrer"  ><u>more info</u></a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }



  const Tablev3 = () => {
    return(
      <TableContainer sx={{ border: '1px dashed grey', width: 1440, margin: 'auto'}}>
        <Table sx={{tableLayout:'fixed'}} size="small" aria-label="a dense table " >
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>asset</b></TableCell>
              <TableCell align="center"><b>can collateral</b></TableCell>
              <TableCell align="center"><b>LTV</b></TableCell>
              <TableCell align="center"><b>liq thereshold</b></TableCell>
              <TableCell align="center"><b>liq bonus</b></TableCell>
              <TableCell align="center"><b>reserve factor</b></TableCell>
              <TableCell align="center"><b>can borrow?</b></TableCell>
              <TableCell align="center"><b>optimal utilization</b></TableCell>
              <TableCell align="center"><b>variable borrow rate</b></TableCell>
              <TableCell align="center"><b>can borrow stable?</b></TableCell>
              <TableCell align="center"><b>stable borrow rate</b></TableCell>
              <TableCell align="center"><b>share of stable rate</b></TableCell>
              <TableCell align="center"><b>debt ceiling</b></TableCell>
              <TableCell align="center"><b>supply cap</b></TableCell>
              <TableCell align="center"><b>borrow cap</b></TableCell>
              <TableCell align="center"><b>emode LTV</b></TableCell>
              <TableCell align="center"><b>emode liq thereshold</b></TableCell>
              <TableCell align="center"><b>emode liq bonus</b></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {riskParamsEthereum?.map((n) => (
              <TableRow
                key={riskParamsEthereum.indexOf(n)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{n.symbol}
                </TableCell>
                <TableCell align="center">{n.canCollateral}</TableCell>
                <TableCell align="center">{n.LTV}</TableCell>
                <TableCell align="center">{n.liqThereshold}</TableCell>
                <TableCell align="center">{n.liqBonus}</TableCell>
                <TableCell align="center">{n.reserveFactor}</TableCell>
                <TableCell align="center">{n.canBorrow}</TableCell>
                <TableCell align="center">{n.optimalUtilization}</TableCell>
                <TableCell align="center">{n.varBorrowRate}</TableCell>
                <TableCell align="center">{n.canBorrowStable}</TableCell>
                <TableCell align="center">{n.stableBorrowRate}</TableCell>
                <TableCell align="center">{n.shareOfStableRate}</TableCell>
                <TableCell align="center">{n.debtCeiling}</TableCell>
                <TableCell align="center">{n.supplyCap}</TableCell>
                <TableCell align="center">{n.borrowCap}</TableCell>
                <TableCell align="center">{n.eModeLtv}</TableCell>
                <TableCell align="center">{n.eModeLiquidationThereshold}</TableCell>
                <TableCell align="center">{n.eModeLiquidationBonus}</TableCell>
                <TableCell align="center"><a href={n.assetLink} target="_blank"  rel="noreferrer"  ><u>more info</u></a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
    )
  }  
 
  return (
    
    <div className={styles.container}>
      
      <ThemeProvider theme={theme} >
      <CssBaseline />
      <Head>
        <title>config.fyi</title>
      </Head>
      
      <Box sx={{p: 1, display:"flex", }}>      
        <Typography variant="h6"  >
          config.fyi
        </Typography>
      </Box>
      
      
      <Box sx={{ display:"flex" ,  justifyContent: 'flex-end'}}>
        <Typography variant="h6">
        dark mode
        <Switch  color="default" checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch> 
        </Typography>
      </Box> 

      <Box sx={{ display:"flex" ,  justifyContent: 'flex-end', mr:6}}>
        <Typography variant="h6"  >
            <a href='https://github.com/WeAreNewt/config.fyi' target="_blank"  rel="noreferrer"  > <u>GitHub</u></a>
          
        </Typography>
     
      </Box> 
      
      <Box sx={{ display:"flex" ,  justifyContent: 'flex-end'}}>
        <DownloadCsv/>
      </Box> 
      
      <Box sx={{ display: 'flex' , margin: 'auto' , width: 500, p: 5}}>
    
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
          <Select sx={{ width: 200 }} value={protocol} onChange={handleProtocolChange} label='Protocol'>
            <MenuItem value='v2'>aave v2</MenuItem>
            <MenuItem value='v3'>aave v3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Market</InputLabel>
            <Select  sx={{ width: 200 }} value={selectedMarket} disabled={!protocolSelected} onChange={handleMarketChange} label='Market'>
              {market?.map((n) => (
                <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>
              ))}
               
            </Select>
        </FormControl>  
      </Box>
      
      
      {protocol === 'v3' ? <Tablev3/> : <Tablev2/>  }
      {marketLoading ?  <ProgressBar/> : ''} 
      
      <Typography variant="h6" sx={{ display:"flex" , alignItems:"center", justifyContent:"center" , p: 8}}>
        {!marketSelected ? 'please select protocol and market for table to populate' : ''}
      </Typography>        
      
      
     
      </ThemeProvider>
    </div>
  )
}

export default Home
