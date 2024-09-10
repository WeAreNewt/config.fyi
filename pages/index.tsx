import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { CssBaseline, SelectChangeEvent } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Loading from "../components/Loading";
import DownloadCsv from "../components/Downloadcsv";
import Info from "../components/Info";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Datatable from "../components/Datatable";
import { markets } from "../utils/markets";
import { assetType } from "../utils/interfaces";

import aaveService from "../services/aave";
import benqiService from "../services/benqi";
import zerolendService from "../services/zerolend";

const Home: NextPage = () => {
  const [tableData, setTableData] = useState<assetType[] | undefined>([]);
  const [market, setMarket] = useState<any>();
  const [selectedMarket, setSelectedMarket] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("v3");
  const [protocolSelected, setProtocolSelected] = useState<boolean>(true);
  const [marketSelected, setMarketSelected] = useState<boolean>(false);
  const [marketLoading, setMarketLoading] = useState<boolean>(false);
  const [missingProtocol, setMissingProtocol] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    setMarket(markets.v3);
    setSelectedMarket("ethereum main");
    const ethereum: any = markets.v3.find(
      (n: { name: string }) => n.name === "ethereum main"
    );

    aaveService(ethereum.config, protocol).then((data) => {
      setTableData(data);
      setMarketSelected(true);
    });
  }, []);

  const handleProtocolChange = (event: SelectChangeEvent) => {
    setProtocol(event.target.value);
    setSelectedMarket("");
    setTableData(undefined);

    setProtocolSelected(true);
    setMarketSelected(false);
    setMissingProtocol(false);

    if (event.target.value === "v2") setMarket(markets.v2);
    if (event.target.value === "v3") setMarket(markets.v3);
    if (event.target.value == "benqi") setMarket(markets.benqi);
    if (event.target.value == "zerolend") setMarket(markets.zerolend);
    if (event.target.value === "univ3") {
      setMarket(markets.univ3);
      setMissingProtocol(true);
    }
    if (event.target.value === "crvv2") {
      setMarket(markets.crvv2);
      setMissingProtocol(true);
    }
  };

  const handleMarketChange = (event: SelectChangeEvent) => {
    setSelectedMarket("");
    setMarketSelected(true);
    setSelectedMarket(event.target.value);

    if (event.target.value === "all") setMissingProtocol(true);

    if (!(event.target.value === "all")) {
      setMarketLoading(true);

      if (protocol === "v2" || protocol === "v3") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === event.target.value
        );
        aaveService(mkt.config, protocol).then((data) => {
          setTableData(data);
          setMarketLoading(false);
        });
      } else if (protocol === "benqi") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === "avalanche"
        );
        benqiService(mkt.config).then((data) => {
          console.log(data);
          setTableData(data);
          setMarketLoading(false);
        });
      } else if (protocol === "zerolend") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === event.target.value
        );
        zerolendService(mkt.config, protocol).then((data) => {
          setTableData(data);
          setMarketLoading(false);
        });
      }
    }
  };

  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.down("sm"));

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "IBM Plex Mono",
      fontSize: matches ? 9 : 11,
    },
  });

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>config.fyi</title>
        </Head>

        <Header
          matches={matches}
          darkMode={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />

        <Dropdown
          matches={matches}
          protocol={protocol}
          handleProtocolChange={handleProtocolChange}
          selectedMarket={selectedMarket}
          protocolSelected={protocolSelected}
          market={market}
          handleMarketChange={handleMarketChange}
        />

        {!matches && (
          <DownloadCsv
            protocol={protocol}
            riskParams={tableData}
            marketSelected={marketSelected}
            missingProtocol={missingProtocol}
          />
        )}

        <Datatable
          protocol={protocol}
          matches={matches}
          riskParams={tableData}
        />
        {marketLoading ? <Loading marketLoading={marketLoading} /> : ""}

        <Info
          marketSelected={marketSelected}
          missingProtocol={missingProtocol}
        />
      </ThemeProvider>
    </div>
  );
};

export default Home;
