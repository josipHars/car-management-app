import type { Car, CarPayload } from '../types/car'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5160/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Došlo je do greške prilikom komunikacije sa serverom.')
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const carService = {
  getCars: () => request<Car[]>('/cars'),
  createCar: (car: CarPayload) =>
    request<Car>('/cars', {
      method: 'POST',
      body: JSON.stringify(car),
    }),
  updateCar: (id: number, car: CarPayload) =>
    request<Car>(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
    }),
}
