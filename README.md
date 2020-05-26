# Web Tenderos

Manages the users of the application, this is a dashboard that is ready to implement new administrative tools.

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [Da Team](#team)
* [Technology Stack](#technology-stack)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Running the stack for development](#running-the-stack-for-development)
* [Stop the project](#stop-the-project)
* [Restoring the database](#restoring-the-database)
* [Debugging](#debugging)
* [Running specs](#running-specs)
* [Checking code for potential issues](#checking-code-for-potential-issues)


### Client Details

| Name               | Email             		| Role 					|
| ------------------ | ------------------------ | ---------------------	|
| Aldo Lares   		 | alares@bluepeople.com 	| Senior Sales Analyst 	|


### Environment URLS

* **Production** - [TBD](TBD)
* **Development** - [TBD](TBD)

### Da team

| Name          		   | Email             			| Role        |
| ------------------------ | -------------------------- | ----------- |
| Arturo Cantú Cisneros    | a0119641@gmail.com 		| Development |
| Esteban Arocha Ortuño    | estebanarocha1@gmail.com 	| Development |
| Samantha Solis Pascacio  | a01039412@itesm.mx 		| Development |
| Valentin Trujillo García | alexandro4v@gmail.com 		| Development |

### Technology Stack
| Technology     | Version      |
| -------------- | -------------|
| NodeJS         | 10.16.0      |
| React          | 16.13.1      |
| Firebase    	 | 7.14.4		    |
| Firebase Admin | 8.12.1		    |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/tenderos_web)
* [Backlog](https://teams.microsoft.com/_#/school/tab::66092c4e-5ee6-4852-99d1-607f82abf948/Proyecto?threadId=19:242005db4c744d77bed8da3072cb3e82@thread.tacv2&ctx=channel)
* [Documentation](https://drive.google.com/drive/u/0/folders/1LIWhHVsdTVLpmetW2GNYXAYw_jIL3jgw)

## Development

### Changelog v0.1 - Admin Dashboard
- Added HU012 User Admin Dashboard

### Rules of Git

Using a branch for each use case and an extra branch for general development and testing the team will work on a specific part of the project. Each use case branch will be named after the use case code and the general branch will be named development. 


### Setup the project

For this project you will need to install NodeJS version 10.

After installing these please you can follow these simple steps:

1. Clone this repository into your local machine.

```bash
$ git clone git@github.com:ProyectoIntegrador2018/tenderos_web.git
```

2. Create a .evn file and add the firebase credentials as follows:
  REACT_APP_API_KEY="XXXXXXXXXXX"
  REACT_APP_AUTH_DOMAIN=XXXXXXXXXXX
  REACT_APP_DATABASE_URL=XXXXXXXXXXX
  REACT_APP_PROJECT_ID=XXXXXXXXXXX
  REACT_APP_STORAGE_BUCKET=XXXXXXXXXXX
  REACT_APP_MESSAGING_SENDER_ID=XXXXXXXXXXX
  REACT_APP_APP_ID="XXXXXXXXXXX"
  REACT_APP_MEASUREMENT_ID=XXXXXXXXXXX

You now have your setup ready to open and run the project. 


### Running the stack for Development

1. Run "npm install" on the terminal, to install all node modules

2. Run "npm run local" to run the project in localhost:3000


### Stop the project

To stop the project it is needed to kill the terminal process.
