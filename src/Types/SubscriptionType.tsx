export interface SubscriptionType {
    id: number;
    eventQuantity: number;
    price: number;
    recurring: boolean
}

export function subscription(id: string, fetchedSubscription:any) {
    const subscription:SubscriptionType = {
        id: +id,
        eventQuantity: fetchedSubscription.eventQuantity,
        price: fetchedSubscription.price,
        recurring: fetchedSubscription.recurring
    }
    return subscription
}