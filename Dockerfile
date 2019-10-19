# Base the image on the node base image
FROM node:10-alpine

# Define container where the app will be placed
WORKDIR /usr/src/app

# Copy the index.js file into the working directory
COPY . .

RUN npm install

# Define which port should be exposed on the container
EXPOSE 8080

# The command to run when the container starts
CMD ["node", "./index.js"]
