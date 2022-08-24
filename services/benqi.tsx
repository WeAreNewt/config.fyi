import { ethers } from 'ethers';
import comptroller from '../abis/comptroller.json';
import axios from 'axios';
import { Benqi } from '../utils/interfaces';

const fetchBenqi = async ( 
        config:{
            publicJsonRPCUrl: string
        }
    ) => {

  const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/vfmKAWpkZKjAm-6NWVEJ9Iudm7en9QO2');

  let data: Benqi[] = [];

    const contract = new ethers.Contract('0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', comptroller, provider);

    const closeFactor = await contract.closeFactorMantissa.call();
    const liquidationIncentive = await contract.liquidationIncentiveMantissa();
    const markets = await contract.getAllMarkets();

    const request = {
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        params: {
            addresses: markets,
            block_timestamp: 0
        }
    }
    const res = await axios.get('https://api.compound.finance/api/v2/ctoken', request);

    res.data.cToken.forEach(function (token: any) {
        const tmp: Benqi = {
            symbol: token.symbol, 
            collateralFactor: String(Number(token.collateral_factor.value) * 100) + '%', 
            reserveFactor: String(Number(token.reserve_factor.value) * 100) + '%',
            closeFactor: (Number(closeFactor) / 1000000000000000000)  + '%',
            liquidationIncentive: (Number(liquidationIncentive) / 1000000000000000000)  + '%',
        }
        data.push(tmp)
    })
    

  return data;
  
}

export default fetchBenqi