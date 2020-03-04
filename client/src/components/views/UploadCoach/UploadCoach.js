import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/ImageUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Category = [
    { key: 1, value: "Technology" },
    { key: 2, value: "Finance" },
    { key: 3, value: "Health" },
    { key: 4, value: "Relationship" },
    { key: 5, value: "News" },
    
]



function UploadCoachPage(props) {

    const [NameValue, setNameValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [CategoryValue, setCategoryValue] = useState(1)
    const [LocationValue, setLocationValue] = useState("")
    const [Images, setImages] = useState([])


    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onLocationChange = (event) => {
        setLocationValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategorySelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!NameValue || !DescriptionValue || !PriceValue ||
            !CategoryValue || !Images || !LocationValue) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            name: NameValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            category: CategoryValue,
            location: LocationValue,
        }

        const variableId = {
            writer: props.user.userData._id
        }
        Axios.post('/api/coach/uploadCoach', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Coach Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Coach')
                }
            })

        Axios.post('/api/users/becomeCoach', variableId)
        .then(response => {
            if (response.data.success) {
                
                props.history.push('/')
            } else {
                alert('Failed to upload Coach')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Creator Profile</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Name</label>
                <Input
                    onChange={onNameChange}
                    value={NameValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Location</label>
                <Input
                    onChange={onLocationChange}
                    value={LocationValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onCategorySelectChange}>
                    {Category.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadCoachPage