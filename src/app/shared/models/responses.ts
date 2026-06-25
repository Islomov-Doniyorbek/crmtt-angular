export interface RespLogin {
    token: string
    user: Userr
}
export interface Userr {
    username: string
    role: string
    banned: boolean
}
export interface User {
    id: string
    username: string
    password: string
    role: string
    banned: boolean
    created_at: string
}
export interface RespUsers {
    status: number
    users: User[]
}
export interface RespUpdateUser {
    status: number
    result: User
}



export interface RespEmpl {
    status: number
    employees: Employee[]
}
export interface Employee {
    id: string
    user_id: string
    name: string
    email: string
    role: string
    status: string
}