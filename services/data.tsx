import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';




const riskParameters: string[] = []

const fetchReserves = async () => {
  const uiPoolDataProviderAddress  = '0x548e95Ce38B8cb1D91FD82A9F094F26295840277';
  const lendingPoolAddressProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';

  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://eth-mainnet.alchemyapi.io/v2/demo',
    ChainId.mainnet,
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: uiPoolDataProviderAddress,
      provider,
      chainId: ChainId.mainnet
    });
  
    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider,
    });
    
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

const fetchReservesAvalancheL1 = async () => {

  const uiPoolDataProviderAddress  = '0x88be7eC36719fadAbdE4307ec61EAB6fda788CEF';
  const lendingPoolAddressProvider = '0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f';

  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://api.avax.network/ext/bc/C/rpc',
    ChainId.avalanche,
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: uiPoolDataProviderAddress,
      provider,
      chainId: ChainId.avalanche
    });
  
    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider,
    });
    console.log(reserves)
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

const fetchReservesPolygonL1 = async () => {

  const uiPoolDataProviderAddress  = '0x67acdB3469580185811E5769113509c6e8B6Cba5';
  const lendingPoolAddressProvider = '0xd05e3E715d945B59290df0ae8eF85c1BdB684744';

  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://polygon-rpc.com',
    ChainId.polygon,
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: uiPoolDataProviderAddress,
      provider,
      chainId: ChainId.polygon
    });
  
    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider,
    });
    console.log(reserves)
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}


const fetchReservesEthAMM = async () => {

  const uiPoolDataProviderAddress  = '0x548e95Ce38B8cb1D91FD82A9F094F26295840277';
  const lendingPoolAddressProvider = '0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5';

  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://eth-mainnet.alchemyapi.io/v2/demo',
    ChainId.mainnet,
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: uiPoolDataProviderAddress,
      provider,
      chainId: ChainId.mainnet
    });
  
    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider,
    });
    console.log(reserves)
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default {
  fetchReserves: fetchReserves,
  fetchReservesAvalancheL1: fetchReservesAvalancheL1,
  fetchReservesPolygonL1: fetchReservesPolygonL1,
  fetchReservesEthAMM: fetchReservesEthAMM
}