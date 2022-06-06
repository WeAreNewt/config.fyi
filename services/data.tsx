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
  }
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
      ({
        symbol: n.symbol, 
        usageAsCollateral: n.usageAsCollateralEnabled ? 'True' : 'False',
        baseLTVasCollateral: parseInt(n.baseLTVasCollateral)/100 + '%', 
        reserveLiquidationThreshold: parseInt(n.reserveLiquidationThreshold)/100 + '%',
        liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3))/100 + '%',
        reserveFactor: parseInt(n.reserveFactor)/100 + '%',
        varBorrowRate: 
        ((((1 + ((parseInt(n.variableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        stableBorrowRate:
        ((((1 + ((parseInt(n.stableBorrowRate)/(10**27)) / 31536000)) ** 31536000) - 1 ) * 100).toFixed(2) + '%'
        ,
        stableRateShare: parseInt(n.totalDebtUSD) === 0 || parseInt(n.totalStableDebtUSD) === 0  ? '0%' : ((parseInt(n.totalStableDebtUSD)/parseInt(n.totalDebtUSD)) * 100).toFixed(2) + '%' , 
        optimalUsageRatio: ((parseInt(n.optimalUsageRatio)/(10**27)) * 100 ).toFixed(0) + '%',
        canBorrow: n.borrowingEnabled ? 'True' : 'False',
        stableBorrowingEnabled: n.stableBorrowRateEnabled ? 'True' : 'False',
        assetLink: 'https://app.aave.com/reserve-overview/?underlyingAsset=' + n.id.slice(n.id.indexOf('-') + 1, n.id.lastIndexOf('-')) + '&marketName=' + config.marketName,
        debtCeiling: (parseInt(n.debtCeiling) / 10**8).toFixed(2) + 'M',
        supplyCap: (parseInt(n.supplyCap) / 10**9).toFixed(2) + 'B',
        borrowCap: (parseInt(n.borrowCap) / 10**9).toFixed(2) + 'B',
        eModeLiquidationBonus: parseInt((n.eModeLiquidationBonus).toString().slice(-3))/100 + '%',
        eModeLiquidationThereshold: n.eModeLiquidationThreshold/100 + '%',
        eModeLtv: n.eModeLtv/100 + '%'
      }));
    
    return reservesArray
  } catch (e){
    console.log(e)
  }
  
}

export default {
  fetchReservesAny: fetchReservesAny
}