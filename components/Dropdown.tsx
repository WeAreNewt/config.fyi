import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"

const Dropdown = (props: { matches: boolean; protocol: string; handleProtocolChange: ((event: SelectChangeEvent<any>, child: ReactNode) => void) | undefined; selectedMarket: string; protocolSelected: boolean; handleMarketChange: ((event: SelectChangeEvent<any>, child: ReactNode) => void) | undefined; market: any[] }) => {
    return(
      <Box sx={{display: 'flex' , margin: 'auto' , width: props.matches ? '90%' : 500, p:3}}>
        <FormControl sx={{ width: 200 , display: 'flex' , margin: 'auto' }} fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
          <Select sx={{ width: '95%', margin: 'auto'}} value={props.protocol} onChange={props.handleProtocolChange} label='Protocol'>
            <MenuItem value='v2'>aave v2</MenuItem>
            <MenuItem value='v3'>aave v3</MenuItem>
            <MenuItem value='benqi'>benqi</MenuItem>
            <MenuItem value='univ3'>uniswap v3</MenuItem>
            <MenuItem value='crvv2'>curve v2</MenuItem>
            <MenuItem value='zerolend'>zerolend</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 , display: 'flex' , margin: 'auto' }} fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Market</InputLabel>
            <Select  sx={{ width: '95%', margin: 'auto' }} value={props.selectedMarket} disabled={!props.protocolSelected} onChange={props.handleMarketChange} label='Market'>
              {props.market?.map((n : any) => (
                <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>
              ))}
            </Select>
        </FormControl>
      </Box>
    )
  }

  export default Dropdown
