import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000000}
                
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '2rem', height: '2rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="picture" style={{ fontSize: '2rem'}} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)} style={{position:'absolute'}}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px', marginLeft:'10rem' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
