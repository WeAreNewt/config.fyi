import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';

const riskParameters: string[] = []

const fetchReservesAny = async (
  config:{
    chainId: ChainId,
    publicJsonRPCUrl: string, 
    LENDING_POOL_ADDRESS_PROVIDER: string,
    UI_POOL_DATA_PROVIDER: string, 
  }
  ) => {

  const lendingPoolAddressProvider = config.LENDING_POOL_ADDRESS_PROVIDER
  const chainId = config.chainId

  const provider = new ethers.providers.StaticJsonRpcProvider(
    config.publicJsonRPCUrl,
    config.chainId,
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: config.UI_POOL_DATA_PROVIDER,
      provider,
      chainId
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

export default {
  fetchReservesAny: fetchReservesAny
}