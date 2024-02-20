export interface EventType {
    address: string
    book: string
    date: Date
    host: string
    id: number
    img: string
    latitude: number
    longitude: number
    longDescription: string
    shortDescription: string
}

export function makeEvent(data:any) {
    const event: EventType = {
        address: data.address,
        book: data.book,
        date: data.date,
        host: data.host,
        id: data.id,
        img: data.img,
        latitude: data.latitude,
        longitude: data.longitude,
        longDescription: data.longDescription,
        shortDescription: data.shortDescription
    }
    return event
}