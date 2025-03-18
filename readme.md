# My Monorepo Project

This monorepo contains the backend and frontend code for my application.

## Project Structure

my-monorepo/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── ...
│   │   ├── package.json
│   │   └── ...
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── ...
│   │   ├── package.json
│   │   └── ...
├── package.json
├── README.md
└── .gitignore

* `packages/backend/`: Contains the Node.js/Express.js backend.
* `packages/frontend/`: Contains the React (or your chosen framework) frontend.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pedro092692/monorepoapp.git
    cd my-monorepo
    ```

2.  **Install dependencies:**

    ```bash
    npm install --workspaces
    ```

    or

    ```bash
    yarn install
    ```

3.  **Configure environment variables:**

    * Create `.env` files in `packages/backend/` and `packages/frontend/` as needed.
    * Add your environment variables to these files.

4.  **Start the development servers:**

    ```bash
    npm run dev:all
    ```

    or to start them separately:

    ```bash
    npm run dev:backend
    npm run dev:frontend
    ```

5.  **Access the application:**

    * Backend: `http://localhost:4000`
    * Frontend: `http://localhost:3000`

## Building for Production

1.  **Build the frontend:**

    ```bash
    npm run build:frontend
    ```

2.  **Build the backend:**

    ```bash
    npm run build:backend
    ```

3.  **Start the production server:**

    * Follow the instructions in the `packages/backend/` README or documentation.

## Running Tests

To run tests for all packages:

```bash
npm run test:all