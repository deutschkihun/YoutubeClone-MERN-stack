import React,{useEffect,useState} from 'react'
import {Row,Col,Avatar , List} from 'antd';
import Axios from 'axios';
import SideVideo from './SideVideo';
import { UserOutlined } from '@ant-design/icons';
import Subscribe from './Subscribe';

function VideoDetailPage(props) {
    
    const videoId = props.match.params.videoId
    const variable = {videoId: videoId}

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
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={    [<Subscribe userTo={VideoDetail.writer._id} 
                                                     userForm={localStorage.getItem('userId')}
                                         />]}     
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
