export interface SubscriptionType {
    id: number;
    name: string;
    eventQuantity: number;
    price: number;
    recurring: boolean;
    type: number;
}

export function subscription(fetchedSubscription:any) {
    const subscription:SubscriptionType = {
        id: fetchedSubscription.id,
        eventQuantity: fetchedSubscription.eventQuantity,
        price: fetchedSubscription.price,
        recurring: fetchedSubscription.recurring,
        name: fetchedSubscription.name,
        type: fetchedSubscription.type
    }
    return subscription
}