import React from "react";
import PostCard from "./PostCard";
import {IPost} from "./interfaces/postInterfaces";
import {Col, Container} from "reactstrap";

interface PostCardsProps {
    posts: IPost[];
}

const PostCards: React.FC<PostCardsProps> = ({posts}) => {

    return (
        <Container>
            <div className="postCards text-center w-50 mx-auto">
                <Col>
                    {posts.map((post, index) => {
                        return <PostCard key={index} post={post}/>;
                    })}
                </Col>
            </div>
        </Container>
    );
}

export default PostCards;