const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');


 const app = new express();

 app.set('view engine', 'ejs');

 //app.listen(3000);

 // Mongo DB connection
 const dbURI = 'mongodb+srv://adel:adel1975@cluster0.o7em083.mongodb.net/Project1?retryWrites=true&w=majority';
 mongoose.set('strictQuery', false);
 mongoose.connect(dbURI)
 .then( (data)=>{console.log('Seccessful DB connection'); app.listen(3000);} )
 .catch(err => console.log(err));
 
 app.use(express.urlencoded({extended: true}));

 // Adding new user
app.get('/add', (req, res)=>{

        const newUser = new User({ name: 'Samira', department: 'Marketing'});
        newUser.save()
        .then((data) =>{
            res.send(data);
        }).catch((err)=>{
            console.log(err);
        });
});

// Get all users
 app.get('/all', (req, res)=>{


    User.find()
    .then(data=>{

        res.send(data);
    }).catch(err=>{ console.log(err);});

 });

app.get('/user/:id', (req, res)=>{

    const id = req.params.id;
    User.findById(id).
    then(data => {
            console.log(data);

    }).catch(err =>{
        console.log(err);
    });

});

app.post('/newuser', (req, res)=>{

    const newUser = new User(req.body);
    newUser.save().
    then(data =>{
        
        res.redirect('/');
    }).
    catch(err =>{
        console.log(err);
    });

});

app.get('/', (req, res)=>{

    //res.send('<h3> Home page </>');

   // res.sendFile('./files/index.html', {root: __dirname});

   User.find()
   .then(data=>{
      // res.send(data);
      res.render('index', {info:data});
   }).catch(err=>{ console.log(err);});

//    res.render('index', {data});
});

app.use((req, res)=>{

    console.log('Host : ', req.hostname);
    console.log('Path : ', req.path);
    console.log('Method : ', req.method);

});

app.get('/about', (req, res)=>{

    //res.send('<h3> about page </>');

    //res.sendFile('./files/about.html', {root: __dirname});
    res.render('about');

});

app.delete('/delete/:id', (req, res)=>{
    var id = req.params.id;
    console.log(id);
});

// // Redirect
// app.get('/about-us', (req, res)=>{

//     res.redirect('/about');
// });

// // Not found

app.use((req, res)=>{

    res.status(404).render('404');
});


// fs.readFile('./files/file1.txt', (err, data)=>{

//     if(err) console.log(err);

//     console.log(data.toString());
// });

// fs.writeFile('./files/file2.txt', 'The new line for the file2 file', ()=>{
//     console.log('the file was written');
// });

// making a folder

// if(fs.existsSync('./files/file1.txt')){

//     fs.unlink('./files/file1.txt', (err)=>{
//         if(err) console.log(err);
//         console.log('File deleted');

//     });
    
// } else {
//     fs.writeFile('./files/file1.txt', 'The new data to file 1', (err)=>{
//         if(err) console.log(err);
//         console.log('File created');
//     }

//     );
// }

// read data stream

// const readStream = fs.createReadStream('./files/file2.txt', 'utf8'); // buffuring the data
// const writeStream = fs.createWriteStream('./files/newFile.pdf');

// readStream.on('data', (chunk)=>{  // reading the data
//      writeStream.write(chunk);
// })

