import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import { formatReserves } from '@aave/math-utils';
import dayjs from 'dayjs';

const riskParameters: string[] = []


const fetchReservesAny = async (
  config:{
    chainId: ChainId,
    publicJsonRPCUrl: string, 
    LENDING_POOL_ADDRESS_PROVIDER: string,
    UI_POOL_DATA_PROVIDER: string,
    marketName: string
  },
  protocol: string
  ) => {

  const currentTimestamp = dayjs().unix();
  

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

   
    const formattedPoolReserves = formatReserves({
      reserves: reserves.reservesData,
      currentTimestamp,
      marketReferenceCurrencyDecimals:
        reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd: reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    });
    
    const reservesArray = formattedPoolReserves.map(n => 
      protocol === 'v3' ? 
      ({
        symbol: n.symbol, 
        canCollateral: n.usageAsCollateralEnabled ? 'True' : 'False',
        LTV: parseInt(n.baseLTVasCollateral)/100 + '%', 
        liqThereshold: parseInt(n.reserveLiquidationThreshold)/100 + '%',
        liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3))/100 + '%',
        reserveFactor: parseFloat(n.reserveFactor) * 100 +'%' ,
        canBorrow: n.borrowingEnabled ? 'True' : 'False',
        optimalUtilization: ((parseInt(n.optimalUsageRatio)/(10**27)) * 100 ).toFixed(0) + '%',
        varBorrowRate: (parseFloat(n.variableBorrowAPY) * 100).toFixed(2) + '%' ,
        canBorrowStable: n.stableBorrowRateEnabled ? 'True' : 'False',
        stableBorrowRate: (parseFloat(n.stableBorrowAPY) * 100).toFixed(2) + '%' ,
        shareOfStableRate: parseInt(n.totalDebtUSD) === 0 || parseInt(n.totalStableDebtUSD) === 0  ? '0%' : ((parseInt(n.totalStableDebtUSD)/parseInt(n.totalDebtUSD)) * 100).toFixed(2) + '%' , 
        debtCeiling: (parseInt(n.debtCeiling) / 10**8).toFixed(2) + 'M',
        supplyCap: (parseInt(n.supplyCap) / 10**9).toFixed(2) + 'B',
        borrowCap: (parseInt(n.borrowCap) / 10**9).toFixed(2) + 'B',
        eModeLtv: n.eModeLtv/100 + '%',
        eModeLiquidationThereshold: n.eModeLiquidationThreshold/100 + '%',
        eModeLiquidationBonus: parseInt((n.eModeLiquidationBonus).toString().slice(-3))/100 + '%',
        assetLink: 'https://app.aave.com/reserve-overview/?underlyingAsset=' + n.id.slice(n.id.indexOf('-') + 1, n.id.lastIndexOf('-')) + '&marketName=' + config.marketName,
      })
      :
      ({
        symbol: n.symbol, 
        canCollateral: n.usageAsCollateralEnabled ? 'True' : 'False',
        LTV: parseInt(n.baseLTVasCollateral)/100 + '%', 
        liqThereshold: parseInt(n.reserveLiquidationThreshold)/100 + '%',
        liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3))/100 + '%',
        reserveFactor: parseFloat(n.reserveFactor) * 100 +'%',
        canBorrow: n.borrowingEnabled ? 'True' : 'False',
        optimalUtilization: ((parseInt(n.optimalUsageRatio)/(10**27)) * 100 ).toFixed(0) + '%',
        varBorrowRate: (parseFloat(n.variableBorrowAPY) * 100).toFixed(2) + '%' 
        ,
        canBorrowStable: n.stableBorrowRateEnabled ? 'True' : 'False',
        stableBorrowRate: (parseFloat(n.stableBorrowAPY) * 100).toFixed(2) + '%' ,
        shareOfStableRate: parseInt(n.totalDebtUSD) === 0 || parseInt(n.totalStableDebtUSD) === 0  ? '0%' : ((parseInt(n.totalStableDebtUSD)/parseInt(n.totalDebtUSD)) * 100).toFixed(2) + '%' , 
        assetLink: 'https://app.aave.com/reserve-overview/?underlyingAsset=' + n.id.slice(n.id.indexOf('-') + 1, n.id.lastIndexOf('-')) + '&marketName=' + config.marketName
      }))
      

    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default fetchReservesAny