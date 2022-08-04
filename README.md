## Overview

config.fyi is a frontend that displays the main parameters of major DeFi protocols. For now, the UI has AAVE Protocol V2 and AAVE Protocol V3 parameters for all deployed chains (e.g., Ethereum, Avalanche, Polygon, Optimism, etc.)

config.fyi is also built with a data abstraction framework that easily and quickly allows for the support of other DeFi protocols' parameters, including Uniswap V3 and Curve V2, amongst any other protocol that a developer wants to include into the UI.

## How to Add More Protocols

First, familiarize yourself with the smart contracts within the protocol that you wish to include into config.fyi. This can be done by going through the developer documentation of the protocols' websites and finding the relevant smart contracts.

Next, research the best method for retrieving formatted data from the smart contracts. This can be done:
- directly from the contracts
- from a relevant subgraph
- from the protocol's SDK (if available)

Then, you can insert this formatted data into the relevant places in the config.fyi frontend code which are:

Create an interface for the data that you will return and register it into the types

```utils/interfaces.tsx```

```ts
interface Test {
    aaa: string,
    bbb: string,
    assetLink?: string
}
```

```utils/interfaces.tsx```

```ts
export type assetType = (Aavev2 | Aavev3 | Test)
```

```utils/interfaces.tsx```

```ts
export type {
  Aavev2,
  Aavev3,
  Test
}
```

The most important part is creating a service that will fetch the data from your source (contracts, subgraph, sdk, ...), in this demo we will just use a simple json as a service

```services/test.tsx```
```ts
import { Test } from "../utils/interfaces"

const getTestData = async () => {

  return ([
    {
        aaa: 'aa',
        bbb: 'bb'
    },
    {
        aaa: 'cc',
        bbb: 'dd'
    }
  ] as Test[])
}

export default getTestData
```

Then you need to add your protocol into the dropdown (the value will be the "protocolId")

```components/Dropdown.tsx```

```ts
<MenuItem value='test'>test</MenuItem>
```

After that you should add the table headers that you want to use:

```utils/headers.tsx```

```ts
test: ['header1', 'header2']
````

And also set the markets that you want to use:

```utils/markets.tsx```
```ts
test : [{
    name: 'test'
}] 
```

Then we need to handle the dropdown changes on the index:

pages/index.tsx (inside ```handleProtocolChange```)

```ts
if(event.target.value === 'test') setMarket(markets.test)
```

```pages/index.tsx``` (inside ```handleMarketChange```)

```ts
...
} else if (protocol === 'test') {
  testService().then(data=> {
    setTableData(data)
    setMarketLoading(false)
  })
  setMarketLoading(false)
}
```
You can check the diff between this demo and main [here](https://github.com/WeAreNewt/config.fyi/compare/demo/adding-protocol) and check the live demo [here](https://config-experiment-git-demo-adding-protocol-avara-newt.vercel.app/)

## How the aave integration works

config.fyi uses the [Aave utilities SDK](https://github.com/aave/aave-utilities#aave-utilities) in order to read parameters from Aave Protocol V2 and V3. 


Here are the methods that it calls:
- formatReserves, returns an array of formatted data for each reserve in an Aave market, this function requires input data as  ```reserves: reservesArray ```

```ts
import { formatReserves } from '@aave/math-utils';
import dayjs from 'dayjs';

// reserves input from Fetching Protocol Data section

const reservesArray = reserves.reservesData;
const baseCurrencyData = reserves.baseCurrencyData;

const currentTimestamp = dayjs().unix();

/*
- @param `reserves` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.reservesArray`
- @param `currentTimestamp` Current UNIX timestamp in seconds
- @param `marketReferencePriceInUsd` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferencePriceInUsd`
- @param `marketReferenceCurrencyDecimals` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferenceCurrencyDecimals`
*/
const formattedPoolReserves = formatReserves({
  reserves: reservesArray,
  currentTimestamp,
  marketReferenceCurrencyDecimals:
    baseCurrencyData.marketReferenceCurrencyDecimals,
  marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
});
```

- getReservesHumanized, this gives ```reserves: reservesArray``` data

```ts
import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
} from '@aave/contract-helpers';

// Sample RPC address for querying ETH mainnet
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/demo',
);

// This is the provider used in Aave UI, it checks the chainId locally to reduce RPC calls with frequent network switches, but requires that the rpc url and chainId to remain consistent with the request being sent from the wallet (i.e. actively detecting the active chainId)

const provider = new ethers.providers.StaticJsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/demo',
  ChainId.mainnet,
);

// Aave protocol contract addresses, will be different for each market and can be found at https://docs.aave.com/developers/deployed-contracts/deployed-contracts

const uiPoolDataProviderAddress = '0xa2DC1422E0cE89E1074A6cd7e2481e8e9c4415A6';
const uiIncentiveDataProviderAddress =
  '0xD01ab9a6577E1D84F142e44D49380e23A340387d';
const lendingPoolAddressProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';

// View contract used to fetch all reserves data (including market base currency data), and user reserves
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress,
  provider,
  chainId: ChainId.mainnet,
});

// Object containing array of pool reserves and market base currency data
// { reservesArray, baseCurrencyData }

const reserves = await poolDataProviderContract.getReservesHumanized({
  lendingPoolAddressProvider,
});

```
Each market market needs specific configuration parameters that the functions use. 
For example the ethereum and avalache markets on aave v2 protocol have parameters:

 ```ts
ethereum: 
    {
    chainId: ChainId.mainnet,
    publicJsonRPCUrl: 'https://eth-mainnet.alchemyapi.io/v2/demo',
    LENDING_POOL_ADDRESS_PROVIDER: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    UI_POOL_DATA_PROVIDER: '0x548e95Ce38B8cb1D91FD82A9F094F26295840277',
    marketName: 'proto_mainnet'
    },
avalanche: 
    {
    chainId: ChainId.avalanche,
    publicJsonRPCUrl: 'https://api.avax.network/ext/bc/C/rpc',
    LENDING_POOL_ADDRESS_PROVIDER: '0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f',
    UI_POOL_DATA_PROVIDER: '0x88be7eC36719fadAbdE4307ec61EAB6fda788CEF',
    marketName: 'proto_avalanche'
    }
 ```

## License

[Link to code license](LICENSE.md)
