export type DriveType = 'Prednji' | 'Zadnji' | '4x4'

export interface Car {
  id: number
  manufacturer: string
  type: string
  fuelType: string
  manufactureDate: string
  numberOfDoors: number
  driveType: DriveType
}

export type CarPayload = Omit<Car, 'id'>
