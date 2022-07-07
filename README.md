## Overview

config.fyi is a frontend that displays the main parameters of major DeFi protocols. For now, the UI has AAVE Protocol V2 and AAVE Protocol V3 parameters for all deployed chains (e.g., Ethereum, Avalanche, Polygon, Optimism, etc.)

config.fyi is also built with a data abstraction framework that easily and quickly allows for the support of other DeFi protocols' parameters, including Uniswap V3 and Curve V2, amongst any other protocol that a developer wants to include into the UI.

## How It Works

config.fyi uses the [Aave SDK](https://docs.aave.com/developers/v/2.0/getting-started/sdks) in order to read parameters from Aave Protocol V2 and V3.

Here are the methods that it calls:
- method1 to retrieve data1
- method2 to retrieve data2
- method3 to retrieve data3


## How to Add More Protocols

First, familiarize yourself with the smart contracts within the protocol that you wish to include into config.fyi. This can be done by going through the developer documentation of the protocols' websites and finding the relevant smart contracts.

Next, research the best method for retrieving formatted data from the smart contracts. This can be done:
- directly from the contracts
- from a relevant subgraph
- from the protocol's SDK (if available)

Then, you can insert this formatted data into the relevant places in the config.fyi frontend code.

## Getting Started (could delete)

First, install the dependencies using npm

```bash
npm install
```

Then serve the app to your local server using npn

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
