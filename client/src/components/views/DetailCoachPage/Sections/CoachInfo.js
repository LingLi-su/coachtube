
import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function CoachInfo(props) {

    const [Coach, setCoach] = useState({})

    useEffect(() => {

        setCoach(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Creator Info">
                <Descriptions.Item label="Price"> {Coach.price}</Descriptions.Item>
                <Descriptions.Item label="Lunched">{Coach.lunched}</Descriptions.Item>
                <Descriptions.Item label="Location"> {Coach.location}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Coach.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default CoachInfo