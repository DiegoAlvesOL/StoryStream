
# DESCRIPTION: This file defines the environment for the StoryStream web app.
# PURPOSE: It packages our HTML, CSS, JS, and JSON data into an Nginx server.


# The FROM instruction defines the base image. 
# We use nginx:alpine because it is extremely small, secure, and fast.
# Alpine is a very lightweight Linux distribution.
FROM nginx:alpine

# The WORKDIR instruction sets the folder inside the container where 
# the following commands will take place. This is the default folder for Nginx.
WORKDIR /usr/share/nginx/html

# The COPY instruction takes files from your local machine (Macbook) 
# and places them inside the container's file system.
# The first dot (.) is the source (your project folder).
# The second dot (.) is the destination (the WORKDIR defined above).
COPY . .

# The EXPOSE instruction is a form of documentation. It informs that 
# the container intends to use network port 80 (standard for HTTP).
EXPOSE 80

# NOTE: Nginx starts automatically when the container is launched, 
# so we do not need an explicit start command here.