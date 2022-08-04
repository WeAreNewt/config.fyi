import { Test } from "../utils/interfaces"

const getTestData = async () => {

   return ([
    {
        aaa: 'aa',
        bbb: 'bb'
    },
    {
        aaa: 'cc',
        bbb: 'dd'
    }
   ] as Test[])
}

export default getTestData