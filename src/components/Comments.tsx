import type { CommentData } from "../types";

type CommentsProps = {
    comments: CommentData[]
}

function Comments({comments}:CommentsProps){
    return(
        <div>
            {
                comments.map((comment, index) => (
                    <div>
                        <h5>{comment.username}</h5>
                        <p>{comment.text}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Comments;