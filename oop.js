// class Test{

const { compareSync } = require("bcryptjs");

//     constructor(x, y){

//         this.x = x;
//         this.y = y;
       
//     }

//    static svar = 'The static variable';

//     result(){

//         return this.x * this.y;
//     }

//     static theStaticMethod(){

//         console.log('This is the static line method');
//     }

    
// }


// let test1= new Test(3,3);
//let result = test1.result();
//console.log(test1.result());
//Test.theStaticMethod();

// async function err(){

//     throw new Error('Error line');
    
// }

// err().catch(er =>console.log(er)).then(()=> console.log('The then line')) ;

// var arr = ['one', 'two', 'three'];

// let newArr = [...arr];

// console.log(newArr);

const obj = {a:'a vlue', b:'b value'};
Object.values(obj).map(e => e+' added part').map(e => console.log(e)) ;
