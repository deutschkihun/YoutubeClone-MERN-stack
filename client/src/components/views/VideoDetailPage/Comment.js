import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios';
import SingleComment from './SingleComment';

function Comment(props) {
    const videoId = props.videoId // get videoId from parant(VideoDetailPage)
                                  // If you try to get videoId directly from this part "get params undefined error"
    const user = useSelector(state => state.user)  
    const [commentvalue, setcommentvalue] = useState("")

      const handleClick = (event) => { 
        setcommentvalue(event.currentTarget.value)
    }

    const onSubmit = (event) => { 
        event.preventDefault();
        // refresh(default) prevent

        const variable = {
            content : commentvalue,
            writer : user.userData._id, // redux 
            // use localstorage => writer : localstorage.getItem("userId")  
            videoId : videoId
        }

        Axios.post('/api/comments/saveComment',variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                }else{
                    alert('Faild to submit')
                }
            })
    }



    return (
        <div>
            <br /> 
            <p> Replies</p>
            <hr/>


            {/* Comment Lists*/}
            {props.CommentList && props.CommentList.map((comment,index) => (
                <SingleComment comment={comment} key={index} videoId={videoId}/>
            ))}

            {/* Root Comment Form */}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentvalue}
                    placeholder="write your comment"
                />
                <br />
                <button style={{ width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
