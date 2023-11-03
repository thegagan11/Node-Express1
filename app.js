// const express = require('express');
// let axios = require('axios');
// var app = express();

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);

const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Route to get information about developers
app.post('/', async function(req, res, next) {
  try {
    // Wait for all the GitHub API requests to complete
    const results = await Promise.all(req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`)));
    const out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (err) {
    next(err); // Forward error to the error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
