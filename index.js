const express = require("express");
const postsRouter = require("./posts/postsRouter");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use(postsRouter);

server.get("/", (req,res) =>{
    res.json({message: "Sup"});
});

server.listen(process.env.PORT, ()=>{
    console.log(`server listening on port ${process.env.PORT}`);
});