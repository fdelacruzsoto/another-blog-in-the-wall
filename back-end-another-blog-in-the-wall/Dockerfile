# Create image based on the official node 9.10 image from dockerhub
FROM node:9.10-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Build the node code
RUN npm run build-src

# Expose the port the app runs in
EXPOSE 3333 3333

# Serve the app
CMD ["npm", "start"]