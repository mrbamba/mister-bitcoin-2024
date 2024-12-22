export interface User {
    fullName : string
    email: string
    address:{
        street: string
        city: string
        state: string
        country: string
        zip: string
    }
    bitcoinBalance: number
    _id: string
    moves:[]
    dateOfBirth: number
    newsletterSubscription: boolean
}
