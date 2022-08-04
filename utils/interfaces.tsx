interface Aavev2 {
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
    assetLink: string,
}

interface Aavev3 {
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
    debtCeiling: string,
    supplyCap: string,
    borrowCap: string,
    eModeLtv: string
    eModeLiquidationThereshold: string,
    eModeLiquidationBonus: string,
    assetLink: string,
}

export type assetType = (Aavev2 | Aavev3)

export type {
    Aavev2,
    Aavev3
}
