import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { headers } from '../utils/headers'
import { Aavev2, Aavev3 } from '../utils/interfaces'


type assetType = Aavev2 | Aavev3


const Datatable = (props: { protocol: string, matches: boolean; riskParams: assetType[] | undefined }) => {
  type ObjectKey = keyof typeof headers
  const headerKeys : string[] = headers[props.protocol as ObjectKey]

  return(
    <TableContainer sx={{ width: props.matches ? '100%' : props.protocol === 'v3' ? '90%' : '80%', margin: 'auto' , border: '1px dashed grey' , size: 'small', mt: 1}} >
      <Table size="small" aria-label="a dense table " >
        <TableHead>
          <TableRow>
            {headers[props.protocol as ObjectKey].map((n: string, index: number) => ( <TableCell align="center" key={index}> <b>{n}</b> </TableCell> ))}   
          </TableRow>
        </TableHead>
        <TableBody>
          {props.riskParams?.map((n) => (
            <TableRow
              key={props.riskParams?.indexOf(n)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {Object.keys(n).length === headers[props.protocol as ObjectKey].length ? Object.values(n).map((k, index) => (index === (Object.keys(n).length - 1)) ? '' : <TableCell align="center" key={index}>{k}</TableCell>) : ''} 
            <TableCell align="center"><a href={n.assetLink} target="_blank"  rel="noreferrer"  ><u>more info</u></a></TableCell> 
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Datatable