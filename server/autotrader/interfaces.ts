export interface AutoTraderConfig {
    name: string
    description: string
    api_key_id: number,
    user_id: number,
    pair_token: string,
    user_ref_price: number,
    trade_candle: number,
    trade_amount: number
}

export interface AutoTraderCreateForm {
    name: string
    description: string
    api_key_id: number,
    pair_token: string,
    user_ref_price: number,
    trade_candle: number,
    trade_amount: number
}
