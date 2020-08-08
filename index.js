const express = require("express");
const postsRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());
server.use(postsRouter);

server.get("/", (req,res) =>{
    res.json({message: "Sup"});
});

server.listen(3000, ()=>{
    console.log(`server listening on port 3000`);
});