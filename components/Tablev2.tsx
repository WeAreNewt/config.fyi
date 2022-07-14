import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { headers } from '../utils/headers';


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




const Datatable = (props: { protocol: string, matches: boolean; riskParams: Asset[] | undefined }) => {

type ObjectKey = keyof typeof headers

  return(
    <TableContainer sx={{ width: props.matches ? '100%' : '80%', margin: 'auto' , border: '1px dashed grey' , size: 'small', mt: 1}} >
      <Table size="small" aria-label="a dense table " >
        <TableHead>
          <TableRow>
          {headers[props.protocol as ObjectKey].map((n: string) => ( <TableCell align="center" key={headers[props.protocol as ObjectKey].indexOf(n)}> <b>{n}</b> </TableCell> ))}   
          </TableRow>
        </TableHead>
        
        <TableBody>
              {props.riskParams?.map((n) => (
              <TableRow
                key={props.riskParams?.indexOf(n)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(n).length === headers[props.protocol as ObjectKey].length ? Object.values(n).map(k => <TableCell align="center">{k}</TableCell>) : ''}
                
              </TableRow>
            )
            )
            }
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

export default Datatable