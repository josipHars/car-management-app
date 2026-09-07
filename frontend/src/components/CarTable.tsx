import type { Car } from '../types/car'

type CarTableProps = {
  cars: Car[]
  onEdit: (car: Car) => void
}

function formatDate(value: string): string {
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}.`
}

export function CarTable({ cars, onEdit }: CarTableProps) {
  if (cars.length === 0) {
    return <p className="empty-state">Trenutno nema unesenih auta.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="cars-table">
        <thead>
          <tr>
            <th>Proizvođač</th>
            <th>Tip</th>
            <th>Gorivo</th>
            <th>Datum proizvodnje</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.manufacturer}</td>
              <td>{car.type}</td>
              <td>{car.fuelType}</td>
              <td>{formatDate(car.manufactureDate)}</td>
              <td>
                <button type="button" className="secondary-button" onClick={() => onEdit(car)}>
                  Uredi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
