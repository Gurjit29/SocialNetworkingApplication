var express=require('express');

const app = express()


const PORT = 3000;

app.get('/',(req,res)=> {
    console.log("Server has started!");
    res.send(`Node/Express server is listening at port : ${PORT}`);
})



app.listen(PORT);