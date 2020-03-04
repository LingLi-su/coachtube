import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Radio, Result, Avatar } from 'antd';
import FileUpload from '../utils/FileUpload'
import Axios from 'axios';
import Paypal from '../utils/Paypal';
import { useDispatch } from 'react-redux';
import {
    onSuccessBuy
} from '../../_actions/user_actions';

const { Title } = Typography;
const { TextArea } = Input;





function Chat(props) {


    const Prices = [
        { key: 1, value: 20, content: 'Mini Bounty'},
        { key: 2, value: 50, content: 'Small Bounty' },
        { key: 3, value: 70, content: 'Medium Bounty'},
        { key: 4, value: 100, content: 'Large Bounty' },
    ]

    const [DescriptionValue, setDescriptionValue] = useState("")
    
    const [PriceValue, setPriceValue] = useState()

    const [Images, setImages] = useState([])

    const [newPage, setNewPage] = useState(false)



    const dispatch = useDispatch();
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

   

   

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    
    const onPricesSelectChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onPaymentPage = (event) => {
        event.preventDefault();
        if (!DescriptionValue) {
            return alert('fill all the fields first!')
        }
        setNewPage(true);

    }
    const onSubmit = (event) => {
        event.preventDefault();


        // if (!DescriptionValue) {
        //     return alert('fill all the fields first!')
        // }
        // setNewPage(true);

        const variables = {
            writer: props.user.userData._id,
            description: DescriptionValue,
            images: Images,
            price: PriceValue
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                
                } else {
                    alert('Failed to upload Product')
                }
            })


    }


    const transactionSuccess = (data) => {

        let variables = {
            cartDetail: PriceValue, paymentData: data
        }

        Axios.post('/api/users/successBuy', variables)
            .then(response => {
                if (response.data.success) {
                    setShowSuccess(true)
                    setShowTotal(false)

                    dispatch(onSuccessBuy({
                        cart: response.data.cart,
                        cartDetail: response.data.cartDetail
                    }))

                } else {
                    alert('Failed to buy it')
                }
            })

    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }



    return (

       
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Avatar style={{}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                <Title level={2}> Ask Me</Title>
            </div>


            <Form onSubmit={onSubmit} style= {{position:'relative'}}>

                {/* DropZone */}
                

                
                { newPage === false  ?
                <div>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                    style ={{height:'15rem', position:'relative'}}
                    
                />
                <div style={{width:'100%', height:'3rem',display:'flex'
            }}>
                <FileUpload refreshFunction={updateImages} style={{position:'absolute'}}/>
                </div>
                <br />
                
               
                   
                        
                <Button
                    onClick={onPaymentPage} style={{position:'absolute', right:'0'}}
                >
                    Continue
                </Button>
                </div>
                : 
                
                
                <div style={{display:'flex'}}>     
                <br /><br />
                <Form>
                <Radio.Group>
                {Prices.map(item => (
                    <Radio onClick={onPricesSelectChange} key={item.key} value={item.value} style={{width:'40%', marginLeft:'3rem'}}>${item.value} <h3>{item.content}</h3></Radio>
                ))}
                </Radio.Group>
                
               
                <br />
                <br />
                        
                <Button
                    onClick={onSubmit} style={{marginLeft:'20rem'}}
                >
                    Submit
                </Button>
                
                </Form>
                </div>
                
                
            
            }

                
            </Form>
        </div>
        
    )
}

export default Chat



// <Paypal toPay={PriceValue}
                // onSuccess={transactionSuccess}
                // transactionError={transactionError}
                // transactionCanceled={transactionCanceled}
                // />










