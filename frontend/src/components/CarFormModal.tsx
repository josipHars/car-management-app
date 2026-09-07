import { useState } from 'react'
import type { FormEvent } from 'react'

import type { Car, CarPayload, DriveType } from '../types/car'

const driveTypeOptions: DriveType[] = ['Prednji', 'Zadnji', '4x4']

type CarFormModalProps = {
  initialCar?: Car
  mode: 'create' | 'edit'
  onClose: () => void
  onSave: (car: CarPayload) => Promise<void>
}

type CarFormState = {
  manufacturer: string
  type: string
  fuelType: string
  manufactureDate: string
  numberOfDoors: string
  driveType: DriveType
}

function createInitialState(initialCar?: Car): CarFormState {
  return {
    manufacturer: initialCar?.manufacturer ?? '',
    type: initialCar?.type ?? '',
    fuelType: initialCar?.fuelType ?? '',
    manufactureDate: initialCar?.manufactureDate ?? '',
    numberOfDoors: initialCar ? String(initialCar.numberOfDoors) : '',
    driveType: initialCar?.driveType ?? 'Prednji',
  }
}

export function CarFormModal({ initialCar, mode, onClose, onSave }: CarFormModalProps) {
  const [formState, setFormState] = useState<CarFormState>(() => createInitialState(initialCar))
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const title = mode === 'create' ? 'Dodaj auto' : 'Uredi auto'

  function updateField<K extends keyof CarFormState>(field: K, value: CarFormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numberOfDoors = Number(formState.numberOfDoors)
    const manufacturer = formState.manufacturer.trim()
    const carType = formState.type.trim()
    const fuelType = formState.fuelType.trim()

    if (!manufacturer || !carType || !fuelType || !formState.manufactureDate) {
      setErrorMessage('Sva polja su obavezna.')
      return
    }

    if (!Number.isInteger(numberOfDoors) || numberOfDoors < 1) {
      setErrorMessage('Broj vrata mora biti pozitivan cijeli broj.')
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    try {
      await onSave({
        manufacturer,
        type: carType,
        fuelType,
        manufactureDate: formState.manufactureDate,
        numberOfDoors,
        driveType: formState.driveType,
      })
      onClose()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Spremanje auta nije uspjelo. Pokušaj ponovo.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="car-form-title">{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Zatvori">
            ×
          </button>
        </div>

        <form className="car-form" onSubmit={handleSubmit}>
          <label>
            Proizvođač
            <input
              value={formState.manufacturer}
              onChange={(event) => updateField('manufacturer', event.target.value)}
              required
            />
          </label>

          <label>
            Tip
            <input
              value={formState.type}
              onChange={(event) => updateField('type', event.target.value)}
              required
            />
          </label>

          <label>
            Gorivo
            <input
              value={formState.fuelType}
              onChange={(event) => updateField('fuelType', event.target.value)}
              required
            />
          </label>

          <label>
            Datum proizvodnje
            <input
              type="date"
              value={formState.manufactureDate}
              onChange={(event) => updateField('manufactureDate', event.target.value)}
              required
            />
          </label>

          <label>
            Broj vrata
            <input
              type="text"
              value={formState.numberOfDoors}
              onChange={(event) => updateField('numberOfDoors', event.target.value)}
              required
            />
          </label>

          <label>
            Vrsta pogona
            <select
              value={formState.driveType}
              onChange={(event) => updateField('driveType', event.target.value as DriveType)}
            >
              {driveTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose} disabled={isSaving}>
              Odustani
            </button>
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? 'Spremanje...' : 'Spremi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
