export interface AutoTraderConfig {
    id: number,
    photo?: string,
    name: string
    description: string
    pair_token: string,
    user_ref_price: number,
    side: number,
    trade_candle: number,
    trade_amount: number
    api_key: number,
    user_id: number,
    created_at: string,
    updated_at: string,
    status: string
}

export interface AutoTraderCreateForm {
    name: string
    description: string
    api_key_id: number,
    side: number,
    pair_token: string,
    user_ref_price: number,
    trade_candle: number,
    trade_amount: number
}

export interface ControlStateResponse {
    state: string
}