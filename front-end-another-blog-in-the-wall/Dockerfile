# Build environment
# Create image based on the official node 9.10 from dockerhub
FROM node:9.10-alpine as builder

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change the directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Add the node_modules directory to PATH 
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy dependency definitiosn
COPY package.json /usr/src/app/package.json

# Install dependencies 
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# Get all the code needed to run the app
COPY . /usr/src/app

# Build the node code
RUN npm run build

# Production environment
# Create image based on nginx
FROM nginx:1.13.9-alpine

# Copy the production code from the build environment
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose the port the app runs in
EXPOSE 80 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]