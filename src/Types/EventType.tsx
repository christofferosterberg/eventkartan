export interface EventType {
    title: String,
    time: String,
    place: String,
    shortDescription: String,
    book: String,
    img: string,
    position: {
        lat: number,
        lng: number
    }
}