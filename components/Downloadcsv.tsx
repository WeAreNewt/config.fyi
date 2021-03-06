import { Box, Button, Typography } from "@mui/material"
import { useCSVDownloader } from 'react-papaparse';


interface Asset {
  symbol: string,
  canCollateral: string,
  LTV: string,
  liqThereshold: string,
  liqBonus: string,
  reserveFactor: string,
  canBorrow: string,
  optimalUtilization: string,
  varBorrowRate: string,
  canBorrowStable: string,
  stableBorrowRate: string,
  shareOfStableRate: string,
  debtCeiling?: string,
  supplyCap?: string,
  borrowCap?: string,
  eModeLtv?: string
  eModeLiquidationThereshold?: string,
  eModeLiquidationBonus?: string,
  assetLink: string,
}


const DownloadCsv = (props: { protocol: string; riskParams: Asset[] | undefined; marketSelected: boolean; missingProtocol: boolean; }) => {
    const { CSVDownloader, Type } = useCSVDownloader()
   
    return (
      <Box sx={{ width: props.protocol === 'v3' ? '90%' : '80%', height:33.13,
        margin:'auto', display:'flex', justifyContent: 'flex-end' }}>
         
      {!props.marketSelected || props.missingProtocol ? '' : <CSVDownloader
        type={Type.Link}
        filename={'riskparameters'}
        bom={true}
        config={{
          delimiter: ';',
        }}
        data={props.riskParams}
        disabled={true}

      >
      <Button color="inherit"  variant="outlined" disabled={!props.marketSelected || props.missingProtocol} size='small' style={{textTransform: 'none'}} >
        <Typography variant="h6" >
        download csv
        </Typography>
      </Button>
      </CSVDownloader>}
   
      </Box>
    )
  }

export default DownloadCsv