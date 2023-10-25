
# Set the default Node.js version to use
ARG NODE_VERSION=18

# Use the official Node.js image as the base image
FROM node:${NODE_VERSION}-alpine3.18

# Create a directory for the node application and change the owner to the node user
RUN mkdir -p /node-app && chown -R node:node /node-app

# Set the working directory for the container
WORKDIR /node-app

# Copy package.json and package-lock.json to the container
COPY package*.json ./


# Install Node.js dependencies
RUN npm install

# Copy the current directory to the /node-app directory in the container
COPY . /node-app

# Set the user to 'node' for security reasons
USER node

# Copy the current directory to the container's working directory
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "run", "start"]
