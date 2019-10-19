# walhall-debug

A container that excercises functionality in Walhall to aid with debugging issues.

**NOTE: This module will expose _all_ the environment to the user including secrets.**

## Running on Walhall

1. Fork this repository into your organization linked to Walhall.
2. Create a new application and add this module as the only module.
3. In the module details, ensure that the expose on external URL is selected with inboud port to 8080 and outboud to 80.
4. Deploy the application
5. Click the generated url to see the debug report.

## Functionality
* The module exposes a human readable HTML report on `/` and a machine readable JSON report on `/json`
* The module produces log messages at INFO and ERROR levels for every request (visible in container logs.)
* The entire query string of both endpoints is included in the INFO and ERROR logs. For example:
```
GET /json?SomeStringXYZ
...
This is an INFO level message. [SomeStringXYZ]
This is an ERROR level message. [SomeStringXYZ]
```
* A connection is made to the database and a simple query is executed.
* The port the container runs on can be configured by the `PORT` environmental variable.

## Running Locally
Before the code can be run, dependancies need to be installed via npm:
```
npm install
```
The tool can then be run locally with this command:
```
node index.js
```
The frontend can be accessed in a browser with the following URL:
```
http://localhost:8080/
```

## Building & Running the Docker Image
To build the docker image, use the following command in the root of the repository:
```
docker build . -t walhall-debug
```
The container can then be run with the command:
```
docker run \
	-p8080:8080 \
	--name walhall-debug \
	walhall-debug
```
The container can be stopped with the following command:
```
docker stop walhall-debug
```
