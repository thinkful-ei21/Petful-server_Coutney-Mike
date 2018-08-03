'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const queue = require('./queue');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const dog = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Goldie',
    sex: 'Female',
    age: 7,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'A happy husky puppy sitting outside',
    name: 'Curtis',
    sex: 'Male',
    age: 2,
    breed: 'Husky',
    story: 'Abandoned'
  },
  {
    imageURL: 'https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'A happy beagle with a treat.',
    name: 'Mingus',
    sex: 'Male',
    age: 3,
    breed: 'Beagle',
    story: 'Owner moved away'
  },
  {
    imageURL: 'https://images.pexels.com/photos/776078/pexels-photo-776078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'Frenchie puppy chewing on a stick',
    name: 'Blaze',
    sex: 'Male',
    age: 1,
    breed: 'French Bulldog',
    story: 'Abandoned'
  }
];

const cat = [
  {
    imageURL:'https://images.pexels.com/photos/326875/pexels-photo-326875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'Siamese cat sitting on porch table.',
    name: 'Lady',
    sex: 'Female',
    age: 5,
    breed: 'Siamese',
    story: 'Thrown on the street'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Owner moved away'
  },
  {
    imageURL:'https://images.pexels.com/photos/17773/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'Bashful Calico kitten hanging out outside.',
    name: 'Spot',
    sex: 'Female',
    age: 1,
    breed: 'Calico',
    story: 'Abandoned'
  },
  {
    imageURL:'https://images.pexels.com/photos/751050/pexels-photo-751050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    imageDescription: 'Fluffy orange tabby sitting on a couch.',
    name: 'Sebastian',
    sex: 'Male',
    age: 15,
    breed: 'Tabby',
    story: 'Terminally ill'
  }
];

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/', (req, res) => {
  res.json({
    message: "Server up and running!"
  })
})

app.get('/api/cat', (req, res) => {
  res.json(cat);
})

app.get('/api/dog', (req, res) => {
  res.json(dog);
})

app.delete('/api/dog', (req,res) => {
  dog.shift();
  res.sendStatus(204);
})

app.delete('/api/cat', (req,res) => {
  cat.shift();
  res.sendStatus(204);
})

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
