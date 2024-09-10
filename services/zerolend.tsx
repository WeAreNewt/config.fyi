import { ChainId } from "@aave/contract-helpers";

const fetchReservesAny = async (
  config: {
    chainId: ChainId;
    publicJsonRPCUrl: string;
    LENDING_POOL_ADDRESS_PROVIDER: string;
    UI_POOL_DATA_PROVIDER: string;
    POOL: string;
    marketName: string;
  },
  protocol: string
) => {
  try {
    const response = await fetch(
      `/api/zerolend?chainId=${config.chainId}&marketName=${config.marketName}&protocol=${protocol}&lendingPoolAddressProvider=${config.LENDING_POOL_ADDRESS_PROVIDER}&uiDataProvider=${config.UI_POOL_DATA_PROVIDER}&pool=${config.POOL}`
    );
    const reservesArray = await response.json();
    return reservesArray.data;
  } catch (err) {
    alert("something went wrong fetching data, please contact the team");
  }
};

export default fetchReservesAny;
