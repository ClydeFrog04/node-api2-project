import * as React from "react";
import { Card, CardText } from "reactstrap";
import {IPost} from "./interfaces/postInterfaces";

interface PostCardProps {
    post: IPost;
}


const PostCard: React.FC<PostCardProps> = ({post}) =>{



    return (
        <div className="postCard mt-3 mb-3">
            <Card body inverse color="info">
                <CardText>{post.title}</CardText>
            </Card>
        </div>
    );
}

export default PostCard;