import { Move } from "./move.model"

export interface User {
    _id: string
    fullName : string
    // email: string
    // address:{
    //     street: string
    //     city: string
    //     state: string
    //     country: string
    //     zip: string
    // }
    bitcoinBalance: number
    // _id: string
    moves:Move[]
    // dateOfBirth: number
    // newsletterSubscription: boolean
}
