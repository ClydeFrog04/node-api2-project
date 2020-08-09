import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PostCard from "./PostCard";
import PostCards from "./PostCards";

function App() {
    const baseurl = "http://localhost:3000";
    const [posts, setPosts] = useState([]);
    useEffect(() =>{
        axios.get(`${baseurl}/api/posts`)
            .then(res =>{
                console.log(res);
                setPosts(res.data);
            })
            .catch(err =>{
                console.log("Error fetching posts: ", err);
            })
    });

    return (
        <div className="App">
            <PostCards posts={posts}/>
        </div>
    );
}

export default App;
