import { marketConfig } from "../utils/marketconfig";

export const markets = {
  v2: [
    {
      name: "ethereum",
      config: marketConfig.ethereum,
    },
    {
      name: "eth amm",
      config: marketConfig.ethamm,
    },
    {
      name: "avalanche",
      config: marketConfig.avalanche,
    },
    {
      name: "polygon",
      config: marketConfig.polygon,
    },
  ],
  v3: [
    {
      name: "ethereum",
      config: marketConfig.ethereumv3,
    },
    {
      name: "arbitrum",
      config: marketConfig.arbitrum,
    },
    {
      name: "avalanche",
      config: marketConfig.avalanchev3,
    },
    {
      name: "fantom",
      config: marketConfig.fantom,
    },
    {
      name: "harmony",
      config: marketConfig.harmony,
    },
    {
      name: "optimism",
      config: marketConfig.optimism,
    },
    {
      name: "polygon",
      config: marketConfig.polygonv3,
    },
    {
      name: "metis",
      config: marketConfig.metis,
    },
    {
      name: "base",
      config: marketConfig.base,
    },
    {
      name: "gnosis",
      config: marketConfig.gnosis,
    },
  ],
  benqi: [
    {
      name: "avalanche",
    },
  ],
  univ3: [
    {
      name: "all",
    },
  ],
  crvv2: [
    {
      name: "all",
    },
  ],
};
