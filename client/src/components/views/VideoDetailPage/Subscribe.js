import React,{useState,useEffect} from 'react'
import Axios from 'axios';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)


    useEffect(() => {

        let variable = {userTo: props.userTo}
        let subscribedVariable = {userTo: props.userTo, userForm:localStorage.getItem('userId')} 
    
        // in this case we need one more property which is userForm because user wants to know his subscription information


        Axios.post('/api/subscribe/subscribeNumber',variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('Fail to get subscribe number')
                }
            })


        Axios.post('/api/subscribe/subscribed',subscribedVariable)
        .then(response => {
            if(response.data.success){
               console.log(response.data)
               setSubscribed(response.data.subscribed)
            }else{
                alert('Fail to get subscribed information')
            }
        })
    }, [])


    const onClickSubscribe = () => { 

    
        let subscribedVariable = {

            userTo : props.userTo,
            userForm : props.userForm
        }

       
        if(!Subscribed){
            Axios.post('/api/subscribe/unSubscribe',subscribedVariable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setSubscribeNumber(SubscribeNumber+1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('Fail to remove from subscribe list')
                }
            })
        } else {
        
        Axios.post('/api/subscribe/addSubscribe',subscribedVariable)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setSubscribeNumber(SubscribeNumber-1)
                setSubscribed(!Subscribed)
            } else {
                alert('Fail to add into subscribe list')
            }
        })
    }
}

    return (
        <div>
            <button style={{backgroundColor:`${Subscribe ? '#CC0000' : '#AAAAAA'}`,borderRadius:'4px',
                            color:'white',padding: '10px 16px', fontWeight:'500',
                            fontSize:'1rem',textTransform:'uppercase'}}
                    onClick={onClickSubscribe}>
                {SubscribeNumber} {Subscribed ? "Unsubscribe" : "Subscribe"}
            </button>
        </div>
    )
}

export default Subscribe
