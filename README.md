# JamOut

## JamOut at a Glance

JamOut is a full stack PERN app that allows users to find other musicians within a selected radius of an inputted zipcode, filtered by the instruments they play and the genres they are interested in. Logged in users can favorite other users and instant message with other other users, by way of the socket.io library. Users can also upload songs to their profile pages to demonstrate the types of music they like to make. Currently, JamOut is only seeded with users in the Southern California area, particularly Los Angeles County, the Inland Empire, and San Diego County.

## Application Architecture

JamOut is built on a React frontend with and Express backend, using PostgreSQL as a database. The PostGIS PostgreSQL extension is also used to allow for distance queries.

## Frontend Overview

JamOut does the vast majority of its application logic on the backend, but display login on the frontend is managed using several technologies.

### Frontend Technologies Used

#### React 

JamOut is a React application. All display logic is handled by the React libraries.

#### Redux

JamOut makes extensive use of Redux. All state management is handled with Redux, with thunks making API calls to the backend server for data. 

#### Socket.io

Socket.io is used to emit messages to the backend, so that users can receive chat messages instantly.

#### Amazon Serverless Image Handler

Amazon Serverless Image Handler is used to transform user profile pictures into the sizes appropriate for display on Jamout, without having to worry about whether the image is being cropped correctly or not. This allows for users to be able to upload any image as a profile picture and ensuring that the relevant portion of the picture will be displayed on the site.

#### React H5 Audio Player

The React H5 Audio Player library was used to allow users to play songs that have been uploaded to other user profiles. While the audio player manages playing and pausing tracks, the skip track forward, skip track backward, the now playing feature, and song library had to be implemented from scratch.


## Backend Overview

JamOut uses an Express server with a PostgreSQL database, with the PostGIS extension enabled in order to allow for distance queries. 

### Backend Technologies Used

#### ExpressJS

Express was an easy choice to make for the JamOut server. The simple data flow from the frontend to the backend with JavaScript at the core of both made for quick, easy development, with little worry about the data types being sent and received.

#### PostgreSQL

PostgreSQL was the database of choice because it is simple to work with, and is easily manipulable using Sequelize.

#### PostGIS

The PostGIS PostgreSQL extension is enabled in JamOut to allow for the use of geography points in the database, which allow for spatial queries. This allows users to search for other users within a particular user-supplied zip code when searching for other musicians.

#### Sequelize

Sequelize was the ORM of choice for JamOut because of how nicely it integrates with PostgreSQL. All table management and data seeding was handled neatly and simply by way of Sequelize.

#### Google Geocoder API

The Google Geocoder API is used when users sign up for accounts and update their account information. The Geocoder takes the zip code the user provides for their location and transforms it into latitude and longitude coordinates. Those coordinates are used by PostGIS in the backend to create a geography point, which is used when users perform searches, allowing users to limit search results to users within a particular radius of a zip code supplied in the search. The Geocoder API also translates the zip code supplied in searches into latitudes and longitues.

#### Socket.io

Socket.io was used on the backend to manage incoming messages and to distribute messages over sockets to the appropriate chat windows for instant messaging.

#### AWS S3

Amazon Web Services S3 was used to allow users to upload both songs and images to be used on JamOut.

#### Faker

The npm faker library was used extensively to create users for JamOut.

## Conclusion and Next Steps

While I am largely happy with JamOut's functionality, there are a number of design issues I'm unhappy with. As I have little design experience, I had to make choices that were functional, but not necessarily great, and I would like to take the time to redesign some of the visual aspects of the site so that it is more appealing to look at. Beyond that, I plan to implement the ability for users to edit and delete instant messages, which they currently cannot do. I also plan to implement zip code verification when users search and create/update profiles, as real zip codes are necessary for proper site functionality. 