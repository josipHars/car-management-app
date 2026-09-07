# car-management-app

Car management application with a React + TypeScript frontend and a .NET 10 backend using Entity Framework Core with SQL Server.

## Project structure

```text
car-management-app/
├── backend/
│   ├── CarManagement.Api/
│   ├── CarManagement.Core/
│   ├── CarManagement.Data/
│   └── appsettings.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Features

- pregled svih auta u tablici
- unos novog auta kroz modal prozor
- uređivanje postojećeg auta kroz modal prozor
- spremanje podataka kroz .NET REST API
- SQL Server baza sa tablicom `Cars`

## Backend

REST API endpointi:

- `GET /api/cars`
- `GET /api/cars/{id}`
- `POST /api/cars`
- `PUT /api/cars/{id}`
- `DELETE /api/cars/{id}`

Model `Car` sadrži polja:

- `Id`
- `Manufacturer`
- `Type`
- `FuelType`
- `ManufactureDate`
- `NumberOfDoors`
- `DriveType`

## Pokretanje projekta

### 1. Pokreni SQL Server

Primjer sa Dockerom:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong!Passw0rd" \
  -p 1433:1433 --name car-management-sql -d mcr.microsoft.com/mssql/server:2022-latest
```

Zatim u `/home/runner/work/car-management-app/car-management-app/backend/appsettings.json` postavi stvarnu lozinku u connection stringu.

### 2. Pokreni backend

```bash
cd /home/runner/work/car-management-app/car-management-app/backend/CarManagement.Api
dotnet restore
dotnet run
```

API se po defaultu pokreće na `http://localhost:5160`.

### 3. Pokreni frontend

```bash
cd /home/runner/work/car-management-app/car-management-app/frontend
npm install
npm run dev
```

Frontend development server se po defaultu pokreće na `http://localhost:5173`.

Ako backend radi na drugom URL-u, postavi varijablu okruženja `VITE_API_BASE_URL`.

## Build provjera

### Backend

```bash
cd /home/runner/work/car-management-app/car-management-app/backend
dotnet build CarManagement.slnx
```

### Frontend

```bash
cd /home/runner/work/car-management-app/car-management-app/frontend
npm run build
npm run lint
```
