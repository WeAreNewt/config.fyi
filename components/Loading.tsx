import { Backdrop, Box, CircularProgress } from "@mui/material"

const Loading = (props: { marketLoading: boolean }) => {
    return (
        <Box sx={{height: 15, p: 5}}>
          <Backdrop open={props.marketLoading} exit={true}> 
          <CircularProgress  sx={{margin: 'auto', display: 'flex', width: '100%'}} color="inherit"/>
          </Backdrop>
        </Box>
    )
  }
 
  export default Loading