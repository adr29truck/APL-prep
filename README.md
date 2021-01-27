# APL-prep

The effective adventure

![Lint](https://github.com/adr29truck/APL-prep/workflows/Lint/badge.svg)
![Unit](https://github.com/adr29truck/APL-prep/workflows/Unit/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/12666/projects/15706/branches/317669/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12666&pid=15706&bid=317669)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adr29truck/APL-prep.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adr29truck/APL-prep/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/adr29truck/APL-prep.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adr29truck/APL-prep/alerts/)
[![Test Coverage Frontend](https://api.codeclimate.com/v1/badges/02362a268188d962d77d/test_coverage)](https://codeclimate.com/github/adr29truck/APL-prep/test_coverage)

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
      - [Without docker*](#without-docker)
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
I recommend using python's virtual environment for installation and ease of use.

```console
python3 -m venv venv
. venv/bin/activate
pip3 install -r requirements.txt
```

### Running

#### Using Docker

Requires the installation instructions for docker to have been followed.

```console
docker-compose up
```

#### Without docker*

Frontend:

```console
yarn start
```

Database:

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
