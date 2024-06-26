# lightit-challenge

## Backend

- To start the database run `docker-compose up -d db`
- To run this locally the following command must be run: `pnpm start:dev`
- To run from javascript source run `pnpm build` `pnpm start`
- To run the application as a container run `docker-compose up -d dev` (Due to time constraints and docker connectivity issues the container can't access the database when run in this way)

## Frontend

- To start the application run `pnpm vite`
- To successfully create Patients ensure the backend is running as well as the database
- To emulate errors stop the database or api and create a patient
