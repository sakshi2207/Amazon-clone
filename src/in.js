const rect =require('./rec')
function solve(l,b) {
    rect(l,b,(err,rec)=>{
        if(err){
        console.log("Error:"err.message);
        }
        else{
            console.log("this is area "+rec.area()+" & parameter is "+rec.parameter);

        }
    })
    
    
}
solve(20,10);
solve(4,2);