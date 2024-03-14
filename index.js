// const http = require('node:http');
// const hostname = '127.0.0.1';
// const port = 3001;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server runningsss at http://${hostname}:${port}/`);
// });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello Worlds!')
})

app.listen(port, () => {
  console.log(`Example app listing on port ${port}`)
})
