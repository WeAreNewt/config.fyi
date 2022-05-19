import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import dayjs from 'dayjs';

const riskParameters: string[] = []

const fetchStats = async (address: string, endpointURL: string) => {
  const thirtyDaysAgo = dayjs().subtract(45, 'day').unix();
  //console.log(thirtyDaysAgo)
  try {
    const result = await fetch(
      `${endpointURL}?reserveId=${address}&from=${thirtyDaysAgo}&resolutionInHours=6`
    );
    const json = await result.json();
    
    return json;
  } catch (e) {
    return [];
  }
};
const fetchReservesAny = async (
  config:{
    chainId: ChainId,
    publicJsonRPCUrl: string, 
    LENDING_POOL_ADDRESS_PROVIDER: string,
    UI_POOL_DATA_PROVIDER: string, 
  }
  ) => {

  const asd = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20xB53C1a33016B2DC2fF3653530bfF1848a515c8c5' //0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'
  //fetchStats(asd, 'https://aave-api-v2.aave.com/data/rates-history').then(console.log)

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
    //console.log(reserves)
    const reservesArray = reserves.reservesData.map(n => 
      ({
        symbol: n.symbol, 
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%',
        liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3))/100 + '%',
        collRatio: parseInt(n.baseLTVasCollateral) === 0 ? '0' : (1 / (parseInt(n.baseLTVasCollateral)/1000000)).toFixed(2) + '%',
        reserveFactor: parseInt(n.reserveFactor)/100 + '%',
        varBorrowRate: 
        ((((1 + ((parseInt(n.variableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        stableBorrowRate:
        ((((1 + ((parseInt(n.stableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        avgStableBorrowRate: ((((1 + ((parseInt(n.averageStableRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%' , 
        optimalUsageRatio: (parseInt(n.optimalUsageRatio)/(10**27)).toFixed(2),
        canBorrow: n.borrowingEnabled ? 'True' : 'False',
        stableBorrowingEnabled: n.stableBorrowRateEnabled ? 'True' : 'False'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default {
  fetchReservesAny: fetchReservesAny
}