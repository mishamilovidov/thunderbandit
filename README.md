# Thunder Bandit 🎧 🙌

This project is for [thunderbandit.com](https://thunderbandit.com). You can find
Thunder Bandit on 📷 Instagram [@thunderbandit](https://www.instagram.com/thunderbandit/),
🐦 Twitter [@imthunderbandit](https://twitter.com/imthunderbandit), and
🎵 [SoundCloud](https://soundcloud.com/user-544895508).

## Local Setup

You can get this project up and running using either Node.js via npm or Docker 
via Docker Compose. 

### 🐢 Node.js via npm

* Install [Node.js](http://nodejs.org/) (v8 or newer)
* Clone repository
* Change to repository root
* Run `npm install` to install packages
* Run `npm start` to get local server up and running on port 3000

### 🐳 Docker via Docker Compose

* Install [Docker](https://hub.docker.com/search/?q=docker%20desktop&type=edition&offering=community) based on your operating system 
* Install Docker Compose based on your operating system (comes with Docker Desktop for Mac and Windows)
* Add `127.0.0.1    thunderbandit.construo.us` to local hosts file
* Change to the repository root
* Run `docker-compose up --build`
* Navigate to http://thunderbandit.construo.us in your local browser
* To stop docker compose, run `docker-compose down -v`


## Deployment

The site is hosting using Firebase Hosting and is deploy via Google Cloud Build.
A build is trigger anytime the master branch is changed. Build steps are outlined
in the [cloudbuild.yaml](cloudbuild.yaml) file in the root of the repo.
