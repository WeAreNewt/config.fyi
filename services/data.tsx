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
    console.log(reserves)
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%',
        liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3))/100 + '%',
        collRatio: parseInt(n.baseLTVasCollateral) === 0 ? 0 : (1 / (parseInt(n.baseLTVasCollateral)/1000000)).toFixed(2) + '%',
        reserveFactor: parseInt(n.reserveFactor)/1000 + '%',
        varBorrowRate: 
        ((((1 + ((parseInt(n.variableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        stableBorrowRate:
        ((((1 + ((parseInt(n.stableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        canBorrow: n.borrowingEnabled ? 'True' : 'False'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default {
  fetchReservesAny: fetchReservesAny
}