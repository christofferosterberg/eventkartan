export interface EventType {
    id: number
    address: string
    book: string
    date: string
    host: string
    // img: string
    latitude: number
    longitude: number
    longDescription: string
    shortDescription: string
    title: string
}

export function makeEvent(data:any) {
    const event: EventType = {
        address: data.address,
        book: data.book,
        date: data.date,
        host: data.host,
        id: data.id,
        // img: data.img,
        latitude: data.latitude,
        longitude: data.longitude,
        longDescription: data.longDescription,
        shortDescription: data.shortDescription,
        title: data.title
    }
    return event
}