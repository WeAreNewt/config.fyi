import { Typography } from "@mui/material"

const Info = (props: { marketSelected: boolean; missingProtocol: boolean }) => {
    return(
      <Typography align='center' variant="h6" sx={{ display:"flex" , alignItems:"center", justifyContent:"center" , p: 8}}>
        {!props.marketSelected && !props.missingProtocol ? 'please select protocol and market for table to populate' : ''}
        {props.missingProtocol ? 'want to see config for another protocol? contribute to the github'  : ''} 
      </Typography>        
    )
  }

  export default Info