import React,{useState} from 'react';
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import Dropzone from 'react-dropzone';
const {Title} = Typography;
const {TextArea} = Input;


const PrivateOptions = [
    {value:0,label:"private"},
    {value:1,label:"public"} 
]


const CategoryOptions = [
    {value:0, label:"Film & Animation"},
    {value:1, label:"Autos & Vehicle"},
    {value:2, label:"Music"},
    {value:3, label:"Pets & Animals"}
]



function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)  // private = 0 , public = 1
    const [Category, setCategory] = useState("Film & Animation")  // private = 0 , public = 1


    const onTitleChange = (event) => { 
        console.log(event.currentTarget)
        setVideoTitle(event.currentTarget.value)
    }

    
    const onDescriptionChange = (event) => { 
        console.log(event.currentTarget)
        setDescription(event.currentTarget.value)
    }

    const onPrivateChange = (event) => { 
        console.log(event.currentTarget)
        setPrivate(event.currentTarget.value)
    }

    const onCategoryChange = (event) => { 
        console.log(event.currentTarget)
        setCategory(event.currentTarget.value)
    }


    // reference : https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget


    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload video</Title>
            </div>


            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/*Drop zone*/}

                    <Dropzone
                        onDrop
                        multiple
                        maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}>
                        
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    <div>
                        <img src alt/>
                    </div>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input 
                
                    onChange={onTitleChange}
                    value = {VideoTitle}
                
                />
                <br />
                <br />
                <label>Description</label>

                <TextArea
                    onChange={onDescriptionChange}
                    value = {Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item,index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((options,index) =>(
                         <option key={index} value={options.value}>{options.label}</option>
                    ))}
                </select>
                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>

            </Form>


        </div>
    )
}

export default VideoUploadPage
