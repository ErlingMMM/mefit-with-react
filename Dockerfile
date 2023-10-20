# 1 - Base image for Node with version flag 20
FROM node:20
# 2 - Set working directory within you container for you application
WORKDIR /app
# 3 "COPY <source> <destination>" copy only package.json and package-lock.json first
COPY package*.json /app
# 4 - Install all dependencies
RUN npm install
# 5 - Now copy the rest of the application files
# Doing it this way makes it so the expensive npm install won't be re-run
# uneseccarily if changes have been made only to the source code and not the packages
COPY . /app
# 6 - Tell CMD to start and run npm start when container is run
CMD ["npm", "start"]
# 7 - Expose the port the app runs on
EXPOSE 3000
