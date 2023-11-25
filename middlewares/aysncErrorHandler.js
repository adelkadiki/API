
const asyncErrorHander = (func)=>{

    return  (req, res, next)=>{
    
       func(req, res).catch(err => next(err)) ;
        
    }

}

module.exports = asyncErrorHander;