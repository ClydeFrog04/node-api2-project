import * as React from "react";
import {Card, CardText, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {IPost} from "./interfaces/postInterfaces";
import {useEffect, useState} from "react";
import classnames from "classnames";
import axios from "axios";
import {brotliCompress} from "zlib";

interface PostCardProps {
    post: IPost;
}

interface IComment {
    text: string;
    post_id: string
    created_at: string;
    updated_at: string;
}


const PostCard: React.FC<PostCardProps> = ({post}) => {

    const [activeTab, setActiveTab] = useState("1");
    const [comments, setComments] = useState<IComment[]>([]);

    const baseurl = "http://localhost:3000";
    useEffect(() => {
        axios.get(`${baseurl}/api/posts/${post.id}/comments`)
            .then(res => {
                console.log("post comments: ", res);
                setComments(res.data);
            })
            .catch(err => {
                console.log("Cannont find comments", err);
            });
    }, []);

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    return (
        <div className="postCard mt-3 mb-3 border rounded border-dark bg-secondary">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={activeTab === "1" ? "bg-dark text-white" : " text-white "
                            + classnames({active: activeTab === '1'}) + " navLink"}
                        onClick={() => {
                            toggle('1');
                        }}>
                        Post
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "2" ? "bg-dark text-white" : " text-white "
                            + classnames({active: activeTab === '2'}) + " navLink"}
                        onClick={() => {
                            toggle('2');
                        }}>
                        Comments
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent className="bg-success text-white border rounded" activeTab={activeTab}>
                <TabPane tabId={"1"}>
                    <Card body inverse color="info">
                        <CardTitle>Quote:</CardTitle>
                        <CardText>{post.title}</CardText>
                    </Card>
                </TabPane>
                <TabPane tabId={"2"}>
                    {comments.length > 0 ? comments.map((comment, index) => {
                        return (
                            <>
                                <h6>Comments:</h6>
                                <ul key={index}>
                                    <li>
                                        <p key={index}>{comment.text}</p>
                                    </li>
                                </ul>
                            </>
                        );
                    }) : <p>There are no comments yet!</p>}
                </TabPane>
            </TabContent>
        </div>
    );
}

export default PostCard;