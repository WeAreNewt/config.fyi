import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"


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


const Tablev2 = (props: { matches: boolean; riskParams: Asset[] | undefined }) => {
    return(
      <TableContainer sx={{ width: props.matches ? '100%' : '80%', margin: 'auto' , border: '1px dashed grey' , size: 'small', mt: 1}} >
        <Table size="small" aria-label="a dense table " >
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>asset</b></TableCell>
              <TableCell align="center"><b>can collateral</b></TableCell>
              <TableCell align="center"><b>LTV</b></TableCell>
              <TableCell align="center"><b>liquidation thereshold</b></TableCell>
              <TableCell align="center"><b>liquidation bonus</b></TableCell>
              <TableCell align="center"><b>reserve factor</b></TableCell>
              <TableCell align="center"><b>can borrow?</b></TableCell>
              <TableCell align="center"><b>optimal utilization</b></TableCell>
              <TableCell align="center"><b>variable borrow rate</b></TableCell>
              <TableCell align="center"><b>can borrow stable?</b></TableCell>
              <TableCell align="center"><b>stable borrow rate</b></TableCell>
              <TableCell align="center"><b>share of stable rate</b></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.riskParams?.map((n) => (
              <TableRow
                key={props.riskParams?.indexOf(n)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{n.symbol}
                </TableCell>
                <TableCell align="center">{n.canCollateral}</TableCell>
                <TableCell align="center">{n.LTV}</TableCell>
                <TableCell align="center">{n.liqThereshold}</TableCell>
                <TableCell align="center">{n.liqBonus}</TableCell>
                <TableCell align="center">{n.reserveFactor}</TableCell>
                <TableCell align="center">{n.canBorrow}</TableCell>
                <TableCell align="center">{n.optimalUtilization}</TableCell>
                <TableCell align="center">{n.varBorrowRate}</TableCell>
                <TableCell align="center">{n.canBorrowStable}</TableCell>
                <TableCell align="center">{n.stableBorrowRate}</TableCell>
                <TableCell align="center">{n.shareOfStableRate}</TableCell>
                <TableCell align="center"><a href={n.assetLink} target="_blank"  rel="noreferrer"  ><u>more info</u></a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

export default Tablev2