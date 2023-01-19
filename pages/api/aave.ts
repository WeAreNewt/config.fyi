import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { UiPoolDataProvider, ChainId } from "@aave/contract-helpers";
import { formatReserves } from "@aave/math-utils";
import dayjs from "dayjs";

const chainIdToRPCProvider: Record<number, string> = {
  1: `https://eth-mainnet.moneta.fyi/${process.env.ETH_RPC_TOKEN}/`,
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  100: "xDAI",
  137: `https://polygon-mainnet.moneta.fyi/${process.env.POLYGON_RPC_TOKEN}/`,
  80001: "mumbai",
  43114: "https://api.avax.network/ext/bc/C/rpc",
  43113: "fuji",
  42161: "https://arb1.arbitrum.io/rpc",
  421611: "arbitrum_rinkeby",
  421613: "arbitrum_goerli",
  250: "https://rpc.ftm.tools",
  4002: "fantom_testnet",
  // 10: "https://mainnet.optimism.io",
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISM_RPC_TOKEN}`, // NOTE: Alchemy for now
  69: "optimism_kovan",
  420: "optimism_goerli",
  1666600000: "https://api.harmony.one",
  1666700000: "harmony_testnet",
};

type configInterface = {
  chainId: string;
  marketName: string;
  protocol: string;
  lendingPoolAddressProvider: string;
  uiDataProvider: string;
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

    const reservesArray = formattedPoolReserves.map((n) =>
      config.protocol === "v3"
        ? {
            symbol: n.symbol,
            canCollateral: n.usageAsCollateralEnabled ? "True" : "False",
            LTV: parseInt(n.baseLTVasCollateral) / 100 + "%",
            liqThereshold: parseInt(n.reserveLiquidationThreshold) / 100 + "%",
            liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3)) / 100 + "%",
            reserveFactor: parseFloat(n.reserveFactor) * 100 + "%",
            canBorrow: n.borrowingEnabled ? "True" : "False",
            optimalUtilization:
              ((parseInt(n.optimalUsageRatio) / 10 ** 27) * 100).toFixed(0) +
              "%",
            varBorrowRate:
              (parseFloat(n.variableBorrowAPY) * 100).toFixed(2) + "%",
            canBorrowStable: n.stableBorrowRateEnabled ? "True" : "False",
            stableBorrowRate:
              (parseFloat(n.stableBorrowAPY) * 100).toFixed(2) + "%",
            shareOfStableRate:
              parseInt(n.totalDebtUSD) === 0 ||
              parseInt(n.totalStableDebtUSD) === 0
                ? "0%"
                : (
                    (parseInt(n.totalStableDebtUSD) /
                      parseInt(n.totalDebtUSD)) *
                    100
                  ).toFixed(2) + "%",
            debtCeiling: (parseInt(n.debtCeiling) / 10 ** 8).toFixed(2) + "M",
            supplyCap: (parseInt(n.supplyCap) / 10 ** 9).toFixed(2) + "B",
            borrowCap: (parseInt(n.borrowCap) / 10 ** 9).toFixed(2) + "B",
            eModeLtv: n.eModeLtv / 100 + "%",
            eModeLiquidationThereshold: n.eModeLiquidationThreshold / 100 + "%",
            eModeLiquidationBonus:
              parseInt(n.eModeLiquidationBonus.toString().slice(-3)) / 100 +
              "%",
            assetLink:
              "https://app.aave.com/reserve-overview/?underlyingAsset=" +
              n.id.slice(n.id.indexOf("-") + 1, n.id.lastIndexOf("-")) +
              "&marketName=" +
              config.marketName,
          }
        : {
            symbol: n.symbol,
            canCollateral: n.usageAsCollateralEnabled ? "True" : "False",
            LTV: parseInt(n.baseLTVasCollateral) / 100 + "%",
            liqThereshold: parseInt(n.reserveLiquidationThreshold) / 100 + "%",
            liqBonus: parseInt(n.reserveLiquidationBonus.slice(-3)) / 100 + "%",
            reserveFactor: parseFloat(n.reserveFactor) * 100 + "%",
            canBorrow: n.borrowingEnabled ? "True" : "False",
            optimalUtilization:
              ((parseInt(n.optimalUsageRatio) / 10 ** 27) * 100).toFixed(0) +
              "%",
            varBorrowRate:
              (parseFloat(n.variableBorrowAPY) * 100).toFixed(2) + "%",
            canBorrowStable: n.stableBorrowRateEnabled ? "True" : "False",
            stableBorrowRate:
              (parseFloat(n.stableBorrowAPY) * 100).toFixed(2) + "%",
            shareOfStableRate:
              parseInt(n.totalDebtUSD) === 0 ||
              parseInt(n.totalStableDebtUSD) === 0
                ? "0%"
                : (
                    (parseInt(n.totalStableDebtUSD) /
                      parseInt(n.totalDebtUSD)) *
                    100
                  ).toFixed(2) + "%",
            assetLink:
              "https://app.aave.com/reserve-overview/?underlyingAsset=" +
              n.id.slice(n.id.indexOf("-") + 1, n.id.lastIndexOf("-")) +
              "&marketName=" +
              config.marketName,
          }
    );

    res.status(200).json({ data: reservesArray });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "failed to fetch data" });
  }
}
