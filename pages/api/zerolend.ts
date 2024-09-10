import { NextApiRequest, NextApiResponse } from "next";
import { Contract, ethers } from "ethers";
import { UiPoolDataProvider } from "@aave/contract-helpers";
import { formatReserves } from "@aave/math-utils";
import dayjs from "dayjs";

const chainIdToRPCProvider: Record<number, string> = {
  1: "https://eth-mainnet.alchemyapi.io/v2/demo",
  324: "https://mainnet.era.zksync.io",
  169: "https://pacific-rpc.manta.network/http",
  81457: "https://rpc.ankr.com/blast",
  59144: "https://rpc.linea.build",
};

type configInterface = {
  chainId: string;
  marketName: string;
  protocol: string;
  lendingPoolAddressProvider: string;
  uiDataProvider: string;
  pool: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config: configInterface = {
    chainId: req.query.chainId as string,
    marketName: req.query.marketName as string,
    protocol: req.query.protocol as string,
    lendingPoolAddressProvider: req.query.lendingPoolAddressProvider as string,
    uiDataProvider: req.query.uiDataProvider as string,
    pool: req.query.pool as string,
  };

  const currentTimestamp = dayjs().unix();

  const lendingPoolAddressProvider = config.lendingPoolAddressProvider;

  const chainId: number = parseInt(config.chainId, 10);

  const provider = new ethers.providers.StaticJsonRpcProvider(
    chainIdToRPCProvider[chainId],
    chainId
  );

  try {
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: config.uiDataProvider,
      provider,
      chainId,
    });

    let paused = false;
    if (config.protocol === "v2") {
      const abi = ["function paused() public view returns (bool)"];
      const poolContract = new Contract(config.pool, abi, provider);
      paused = await poolContract.paused();
    }

    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider,
    });

    const formattedPoolReserves = formatReserves({
      reserves: reserves.reservesData,
      currentTimestamp,
      marketReferenceCurrencyDecimals:
        reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd:
        reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    });

    const reservesArray = formattedPoolReserves.map((n) => ({
      symbol: n.symbol,
      frozen: n.isFrozen ? "True" : "False",
      paused: n.isPaused ? "True" : "False",
      canCollateral: n.usageAsCollateralEnabled ? "True" : "False",
      LTV: parseInt(n.baseLTVasCollateral) / 100 + "%",
      liqThereshold: parseInt(n.reserveLiquidationThreshold) / 100 + "%",
      liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3)) / 100 + "%",
      reserveFactor: parseFloat(n.reserveFactor) * 100 + "%",
      canBorrow: n.borrowingEnabled ? "True" : "False",
      optimalUtilization:
        ((parseInt(n.optimalUsageRatio) / 10 ** 27) * 100).toFixed(0) + "%",
      varBorrowRate: (parseFloat(n.variableBorrowAPY) * 100).toFixed(2) + "%",
      canBorrowStable: n.stableBorrowRateEnabled ? "True" : "False",
      stableBorrowRate: (parseFloat(n.stableBorrowAPY) * 100).toFixed(2) + "%",
      shareOfStableRate:
        parseInt(n.totalDebtUSD) === 0 || parseInt(n.totalStableDebtUSD) === 0
          ? "0%"
          : (
              (parseInt(n.totalStableDebtUSD) / parseInt(n.totalDebtUSD)) *
              100
            ).toFixed(2) + "%",
      isIsolated: n.debtCeiling === "0" ? "False" : "True",
      debtCeiling:
        n.debtCeiling === "0"
          ? "N/A"
          : (parseInt(n.debtCeiling) / 10 ** 8).toFixed(3) + "M",
      supplyCap:
        n.supplyCap === "0"
          ? "N/A"
          : (parseInt(n.supplyCap) / 10 ** 9).toFixed(4) + "B",
      borrowCap:
        n.borrowCap === "0"
          ? "N/A"
          : (parseInt(n.borrowCap) / 10 ** 9).toFixed(4) + "B",
      eModeLtv: n.eModeLtv / 100 + "%",
      eModeLiquidationThereshold: n.eModeLiquidationThreshold / 100 + "%",
      eModeLiquidationBonus:
        parseInt(n.eModeLiquidationBonus.toString().slice(-3)) / 100 + "%",
      borrowableInIsolation: n.borrowableInIsolation ? "True" : "False",
      flashloanEnabled: n.flashLoanEnabled ? "True" : "False",
      assetLink:
        "https://app.aave.com/reserve-overview/?underlyingAsset=" +
        n.id.slice(n.id.indexOf("-") + 1, n.id.lastIndexOf("-")) +
        "&marketName=" +
        config.marketName,
    }));

    res.status(200).json({ data: reservesArray });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "failed to fetch data" });
  }
}
