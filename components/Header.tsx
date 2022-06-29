import { Box, Typography, Switch } from "@mui/material"
import { ChangeEvent } from "react"

 
  const Header = (props: { matches: boolean; darkMode: boolean ; onChange: ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined }) => {
    return (
      <Box sx={{mt: props.matches ? 2.5 : 5, ml: props.matches ?  0 : 5, mr: props.matches ?  0 : 5, display:"flex"}}>   
        <Typography variant="h6"  sx={{flexGrow: 1}}  >
          config.fyi
        </Typography>

        <Typography variant="h6" >
        dark mode
        </Typography>
        <Switch sx={{mt: props.matches ? -0.9 : -0.7}} color="default" checked={props.darkMode} onChange={props.onChange}></Switch> 

        <Typography variant="h6" sx={{ml: props.matches ? 2 : 3}} >
            <a href='https://github.com/WeAreNewt/config.fyi' target="_blank"  rel="noreferrer"  > <u>GitHub</u></a>
        </Typography>
      </Box>
    )
  }

  export default Header