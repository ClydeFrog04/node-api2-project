const express = require("express");
const db = require("/data/db");

const server = express();

server.use(express.json());

//post reqs
server.post("/api/posts", (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
});

server.post("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    if(!db.findById(id)) return res.status(404).json({ message: "The post with the specified ID does not exist." });
    else if(!req.body.text) return res.status(400).json({ errorMessage: "Please provide text for the comment." });
    db.insertComment({
        text: req.body.text,
        post_id: req.params.id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    }).then(comment => res.status(201).json(comment))
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
        });
});


//get reqs
server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

server.get("/api/posts/:id", (req, res) => {
    db.findById(req.params.id)
        .then(post =>{
            if(post) res.status(200).json(post);
            else res.status(404).json({ message: "The post with the specified ID does not exist." });
        })
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

server.get("/api/posts/:id/comments", (req, res) => {
    if(!db.findById(req.params.id)) return res.status(404).json({ message: "The post with the specified ID does not exist." });//this might not work since it's a promise
    db.findPostComments(req.params.id)
        .then(postComments => {
            res.status(200).json(postComments);
        })
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

//other reqs
server.delete("/api/posts/:id", (req, res) => {
    if(!db.findById(req.params.id)) return res.status(404).json({ message: "The post with the specified ID does not exist." });//this might not work since it's a promise
    const delPost = db.findById(req.params.id);
    db.remove(req.params.id)
        .then(response => res.status(200).json(delPost))
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({ error: "The post could not be removed" });
        });
});

server.put("/api/posts/:id", (req, res) => {
        if(!db.findById(req.params.id)) return res.status(404).json({ message: "The post with the specified ID does not exist." });
        else if(!req.body.title || !req.body.contents) return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        db.update(req.params.id, req.body)
            .then(newPost =>{
                res.status(200).json(newPost);
            })
            .catch(err =>{
                console.log(err.stack);
                res.status(500).json({ error: "The post information could not be modified." });
            });
});