const http = require('http');
const fs = require('fs');
const express = require('express');


// const file = fs.readFileSync("./files/file2.txt", "utf-8");
// console.log(file);

// const server = http.createServer( (req, res)=>{

//      fs.readFile('./files/file2.txt', 'utf8', (err, data)=>{

//             if(err){ 

//                     res.writeHead(500, {'Content-Type': 'text/plain'});
//                     res.end('Error');

//             } else {

//                     res.writeHead(200, {'Content-Type': 'text/plain'});
//                     res.end(data);
//             }


//      });
// });

// server.listen(3000, ()=>{
//     console.log('Server is running');
// })


const app = new express();

app.listen(3000, ()=>{

        console.log('Server is running');
});

// app.get('/', (req, res)=>{

//         res.status(200).end('Server message');
// });