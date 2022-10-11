export interface User {
    id: number,
    name: string,
    email: string,
    number: string,
    address:{
        city: string,
        postalCode: number,
        street: string
    },
    password: string
}
