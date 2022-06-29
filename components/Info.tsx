import { Typography } from "@mui/material"

const Info = (props: { marketSelected: boolean; missingProtocol: boolean }) => {
    return(
      <Typography align='center' variant="h6" sx={{ display:"flex" , alignItems:"center", justifyContent:"center" , p: 8}}>
        {!props.marketSelected ? 'please select protocol and market for table to populate' : ''}
        {props.missingProtocol ? 'want to see config for another protocol? contribute to the'  : ''} 
        &nbsp;
        {props.missingProtocol ? <u>GitHub</u>   : ''} 
      </Typography>        
    )
  }

  export default Info