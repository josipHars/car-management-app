import { useEffect, useState } from 'react'

import './App.css'
import { CarFormModal } from './components/CarFormModal'
import { CarTable } from './components/CarTable'
import { carService } from './services/carService'
import type { Car, CarPayload } from './types/car'

function App() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined)

  async function loadCars(showLoader = true) {
    if (showLoader) {
      setIsLoading(true)
    }

    try {
      const items = await carService.getCars()
      setErrorMessage('')
      setCars(items)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Podatke nije moguće dohvatiti u ovom trenutku.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadCars(false)
  }, [])

  function openCreateModal() {
    setSelectedCar(undefined)
    setModalMode('create')
  }

  function openEditModal(car: Car) {
    setSelectedCar(car)
    setModalMode('edit')
  }

  function closeModal() {
    setModalMode(null)
    setSelectedCar(undefined)
  }

  async function handleCreate(car: CarPayload) {
    await carService.createCar(car)
    await loadCars()
  }

  async function handleEdit(car: CarPayload) {
    if (!selectedCar) {
      return
    }

    await carService.updateCar(selectedCar.id, car)
    await loadCars()
  }

  return (
    <main className="page-shell">
      <section className="content-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">React + TypeScript + .NET 10</p>
            <h1>Car Management</h1>
            <p className="page-description">
              Jednostavan primjer aplikacije za prikaz i uređivanje auta kroz .NET Core API.
            </p>
          </div>
          <button type="button" className="primary-button" onClick={openCreateModal}>
            Dodaj auto
          </button>
        </div>

        {errorMessage ? <p className="page-error">{errorMessage}</p> : null}

        {isLoading ? (
          <p className="empty-state">Učitavanje podataka...</p>
        ) : (
          <CarTable cars={cars} onEdit={openEditModal} />
        )}
      </section>

      {modalMode ? (
        <CarFormModal
          key={selectedCar?.id ?? 'new'}
          initialCar={selectedCar}
          mode={modalMode}
          onClose={closeModal}
          onSave={modalMode === 'create' ? handleCreate : handleEdit}
        />
      ) : null}
    </main>
  )
}

export default App
