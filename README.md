# APL-prep

The effective adventure
![Python Lint](https://github.com/adr29truck/APL-prep/workflows/Lint/badge.svg)

## Table of Contents

- [APL-prep](#apl-prep)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
      - [Docker installation (Recommended)](#docker-installation-recommended)
      - [Non Docker installation](#non-docker-installation)
    - [Running](#running)
      - [Using Docker](#using-docker)
      - [Not using Docker](#not-using-docker)
  - [Usage](#usage)
  - [Deploying](#deploying)

## About

Ever woundered how much time you are wasting in a year?
Well now you can know. This is a service that you can use to track what you are up to on an hourly basis.

This started as a small project to learn react and python.
Thank you r/dataisbeautiful

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

- Python3
- Node.js
- Yarn (or npm)
- Docker

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone the repository to your local machine

```console
git clone https://github.com/adr29truck/APL-prep.git
```

#### Docker installation (Recommended)

Run the following to get up and running

```console
docker-compose up
```

To create the correct database you are also required to run

```console
docker-compose exec backend python seeder.py
```

or if the container is not currently running.

```console
docker-compose run backend python seeder.py
```

#### Non Docker installation

Install all dependencies

Frontend:

```console
yarn install
```

Backend:
I recommend using python's virtual environment for installing ease of use.

```console
python3 -m venv venv
. venv/bin/activate
pip3 install -r requirements.txt
```

### Running

#### Using Docker

```console
docker-compose up
```

Requires the installation instructions for docker to have been followed.

#### Not using Docker

Frontend:

```console
yarn start
```

database:

```console
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres
```

Backend:

```console
flask run -p 5000 --host=0.0.0.0
```

## Usage

If it's not self explanatory, then maybe the UI need's some rework.. Just open an issue and I'll check in.

Example curl for retriving a JWT token / signing in

```bash
curl http://localhost:5000/api/login -X POST \
         -d '{"username":"admin", "password":"admin"}'
```

## Deploying

Well it's not deployed yet so this isn't documented.
Please hang tight.
