# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port that the application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]
