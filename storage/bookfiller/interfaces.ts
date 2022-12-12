export interface ExecutionFormBookFiller {
    name: string
    side: string,
    api_key_id: number
    pair_token: string
    order_size: number
    number_of_orders: number
    budget: number
    user_ref_price: number
}

export interface ResponseCreateExecutionBookfiller extends ExecutionFormBookFiller{
    id: number
    created_at: string
    updated_at: string
    user_id: number,
    api_key: number
}