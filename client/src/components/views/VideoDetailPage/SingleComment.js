import React,{useState} from 'react'
import {Comment, Avatar,Button,Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux'

function SingleComment(props) {

    const user = useSelector(state => state.user)
   
    const [OpenReply, setOpenReply] = useState(false)  // true false = > &&   , null / notnull => ? 
    const [commentValue, setcommentValue] = useState("")
    const onClickReplayOpen = () => {
        setOpenReply(!OpenReply)
    }
   
    const actions = [
        <span onClick={onClickReplayOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    const HandlerClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => { 
        event.preventDefault();
        // refresh(default) prevent

        // const variable = {
        //     content : commentValue,
        //     writer : user.userData._id, 
        //     videoId : props.videoId
        // }

        // Axios.post('/api/comments/saveComment',variable)
        //     .then(response => {
        //         if(response.data.success){
        //         }else{
        //             alert('Faild to submit')
        //         }
        //     })
    }

    
   
   
    return (
        <div>

            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar= {<Avatar src={props.comment.writer.image} alt="avatar" />}
                content= {<p> {props.comment.content}</p>}
            />

        {OpenReply && 
            <form style={{display:'flex'}} onSubmit={onSubmit}>
            <textarea
                style={{ width: '100%', borderRadius:'5px'}}
                onChange={HandlerClick}
                value={commentValue}
                placeholder="write your comment"
            />
            <br />
            <Button style={{ width:'20%', height:'52px'}} onClick={onSubmit} >Submit</Button>
            </form>
        }
        </div>
    )
}

export default SingleComment
