import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';

const uiPoolDataProviderAddress  = '0x548e95Ce38B8cb1D91FD82A9F094F26295840277';
const lendingPoolAddressProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';


const riskParameters: string[] = []

const fetchReserves = async () => {
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
        baseLTVasCollateral: n.baseLTVasCollateral, 
        reserveLiquidationThreshold: n.reserveLiquidationThreshold
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default {
  fetchReserves: fetchReserves
}