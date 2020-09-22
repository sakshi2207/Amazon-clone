exports=(x,y,callback)=>{
    if(x<=0||y<=0)
    setTimeout(()=>{
        callback(new Error("rect dimension error"),null),2000);
        else setTimeout(()=>
        callback(null,{
            parameter:()=>(2*(x+y)),
            area:()=>(x*y)
        }),2000);
}