import { Box, Button, Typography } from "@mui/material"
import { useCSVDownloader } from 'react-papaparse';
import { assetType } from '../utils/interfaces'

const DownloadCsv = (props: { protocol: string; riskParams: assetType[] | undefined; marketSelected: boolean; missingProtocol: boolean; }) => {
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