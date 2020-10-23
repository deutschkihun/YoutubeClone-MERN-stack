import React,{useEffect,useState} from 'react'
import {Row,Col,Avatar , List} from 'antd';
import Axios from 'axios';
import SideVideo from './SideVideo';
import { UserOutlined } from '@ant-design/icons';
import Subscribe from './Subscribe';
import Comment from './Comment';

function VideoDetailPage(props) {
    
    const videoId = props.match.params.videoId
    const variable = {videoId: videoId}
    const [comments, setcomments] = useState("")

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
     
        Axios.post('/api/video/getVideoDetail',variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert('Fail to get video from db')
                }
            })


        Axios.post('/api/comments/getComments',variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.comments)
                setcomments(response.data.comments)
            }else { 
                alert('fail to get comment')
            }
        })

    }, [])

    if (VideoDetail.writer) {
        console.log(VideoDetail)

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userForm={localStorage.getItem('userId')}/>

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[subscribeButton]}     
                        >
                            <List.Item.Meta
                                avatar={
                                <Avatar style={{backgroundColor: '#87d068'}}
                                        icon={<UserOutlined />}
                                        src={VideoDetail.writer && VideoDetail.writer.image} 
                                        />
                                    }
                                title={<a href="https://ant.design">Title : {VideoDetail.title}</a>}
                                description={<a href="https://ant.design"> Description : {VideoDetail.description}</a>}
                            />
                            <div></div>
                        </List.Item>

                        {/*Comment */}                  
                        <Comment CommentList={comments} videoId={videoId}/>

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage
