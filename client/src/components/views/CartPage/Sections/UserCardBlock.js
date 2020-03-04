import React from 'react'
import {useSelector} from 'react-redux';
function UserCardBlock(props) {

    const user = useSelector(state => state.user)


    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images)} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td>
                <button 
                onClick={()=> props.removeItem(product._id)}
                >Remove </button> 
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> Image</th>
                        <th>Quantity </th>
                        <th>Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock



// {(user.userData && user.userData.isAdmin === true) 