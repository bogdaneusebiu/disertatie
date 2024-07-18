export interface IUser {
  email: string
  displayName: string
  token: string
  roles?: string
  phoneNumber?: string
}

export interface IUserWithAddress {
  email: string
  displayName: string
  phoneNumber: string
  firstName: string
  lastName: string
  street: string
  city: string
  judet: string
  zipCode: string
}
