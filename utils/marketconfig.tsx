import { ChainId } from '@aave/contract-helpers';

export const marketConfig = {
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
    },
    polygon: 
    {
    chainId: ChainId.polygon,
    publicJsonRPCUrl: 'https://polygon-rpc.com',
    LENDING_POOL_ADDRESS_PROVIDER: '0xd05e3E715d945B59290df0ae8eF85c1BdB684744',
    UI_POOL_DATA_PROVIDER: '0x67acdB3469580185811E5769113509c6e8B6Cba5',
    marketName: 'proto_polygon'
    },
    ethamm: 
    {
    chainId: ChainId.mainnet,
    publicJsonRPCUrl: 'https://eth-mainnet.alchemyapi.io/v2/demo',
    LENDING_POOL_ADDRESS_PROVIDER: '0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5',
    UI_POOL_DATA_PROVIDER: '0x548e95Ce38B8cb1D91FD82A9F094F26295840277',
    marketName: 'amm_mainnet'
    },
    arbitrum: 
    {
    chainId: ChainId.arbitrum_one,
    publicJsonRPCUrl: 'https://arb1.arbitrum.io/rpc',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0x3f960bB91e85Ae2dB561BDd01B515C5A5c65802b',
    marketName: 'proto_arbitrum_v3'
    },
    optimism: 
    {
    chainId: ChainId.optimism,
    publicJsonRPCUrl: 'https://mainnet.optimism.io',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0x64f558d4BFC1c03a8c8B2ff84976fF04c762b51f',
    marketName: 'proto_optimism_v3'
    },
    avalanchev3: 
    {
    chainId: ChainId.avalanche,
    publicJsonRPCUrl: 'https://api.avax.network/ext/bc/C/rpc',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0xdBbFaFC45983B4659E368a3025b81f69Ab6E5093',
    marketName: 'proto_avalanche_v3'
    },
    polygonv3: 
    {
    chainId: ChainId.polygon,
    publicJsonRPCUrl: 'https://polygon-rpc.com',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0x8F1AD487C9413d7e81aB5B4E88B024Ae3b5637D0',
    marketName: 'proto_polygon_v3'
    },
    harmony: 
    {
    chainId: ChainId.harmony,
    publicJsonRPCUrl: 'https://api.harmony.one',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0xBC3c351349f6A919A419EE1e57F85f3e07E59dd1',
    marketName: 'proto_harmony_v3'
    },
    fantom: 
    {
    chainId: ChainId.fantom,
    publicJsonRPCUrl: 'https://rpc.ftm.tools',
    LENDING_POOL_ADDRESS_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
    UI_POOL_DATA_PROVIDER: '0x1CCbfeC508da8D5242D5C1b368694Ab0066b39f1',
    marketName: 'proto_fantom_v3'
    }
  
}
