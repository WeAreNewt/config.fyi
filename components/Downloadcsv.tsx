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


const DownloadCsv = (props: { protocol: string; riskParams: Asset[] | undefined; marketSelected: boolean; }) => {
    const { CSVDownloader, Type } = useCSVDownloader()
    
    return (
      <Box sx={{ width: props.protocol === 'v3' ? '90%' : '80%', 
        margin:'auto', display:'flex', justifyContent: 'flex-end' }}>
      
      <CSVDownloader
        type={Type.Link}
        filename={'riskparameters'}
        bom={true}
        config={{
          delimiter: ';',
        }}
        data={props.riskParams}

      >
      <Button color="inherit"  variant="outlined" disabled={!props.marketSelected} size='small' style={{textTransform: 'none'}} >
        <Typography variant="h6" >
        download csv
        </Typography>
      </Button>
      </CSVDownloader>
      </Box>
    )
  }

export default DownloadCsv