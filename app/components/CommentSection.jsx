import Comment from "@/app/components/Comment";
import CreateComment from "@/app/components/CreateComment";

import { useEffect, useState } from "react";

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const response = await fetch(`https://bloggyapi.onrender.com/comment/getCommentsByPost${postId}`);
            const data = await response.json();
            setComments(data);
        }
        fetchComments();
    }, [postId]);

    return (
        <div className="flex w-full flex-col rounded-sm gap-2">
            <CreateComment postId={postId} />
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}

export default CommentSection;
