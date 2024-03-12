# TecDataExercise

Welcome to TecDataExercise, an integrated project that showcases a comprehensive stack including a MariaDB database, a backend developed with NestJS, and a frontend crafted using Angular. This setup is designed to run within Docker containers, facilitating both deployment and local testing through an encapsulated and consistent environment.

## Prerequisites

To ensure a smooth experience with TecDataExercise, you'll need Docker installed on your system. Docker orchestrates the containers for the database, backend, and frontend services, allowing them to communicate seamlessly.

### Installing Docker

- **Windows Users**: Grab Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop). Follow the instructions there to install it on your machine.

- **Linux Users**: Installation varies by distribution. For Ubuntu, you might run:
  
  ```bash
  sudo apt update
  sudo apt install docker.io
  ```

  Don't forget to start and enable the Docker service:
  
  ```bash
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

## Running the Project

Get your local version of TecDataExercise up and running by navigating to the project's root directory and executing:

```bash
docker-compose up --build
```

This will build and initiate containers for the MariaDB database, the NestJS backend, and the Angular frontend, making the full application accessible locally in the next URL [browser to local development](http://localhost:4200/).

## Running Tests

With the containers up, you can proceed to run frontend tests. Simply execute the following at the root of the project:

```bash
ng test
```

## Cleanup

After testing or running the project, you might want to clean up the environment. Do so by running:

```bash
docker-compose down -v
```

This command halts and removes all containers, along with their associated volumes, ensuring a clean slate.
