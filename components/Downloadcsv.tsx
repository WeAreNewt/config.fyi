import { Box, Button, Typography } from "@mui/material"
import { FC } from "react";
import { useCSVDownloader } from 'react-papaparse';

const { CSVDownloader, Type } = useCSVDownloader()



const DownloadCsv = (props: { protocol: string; riskParamsEthereum: any; marketSelected: any; }) => {
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
        data={props.riskParamsEthereum}

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