import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col, List } from 'antd';
import CoachImage from './Sections/CoachImage';
import CoachInfo from './Sections/CoachInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes'
import { useSelector } from 'react-redux';


function DetailCoachPage(props) {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const coachId = props.match.params.coachId
    const [Coach, setCoach] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const coachVariable = {
        coachId: coachId
    }
   

    useEffect(() => {
        Axios.get(`/api/coach/coaches_by_id?id=${coachId}&type=single`)
            .then(response => {
                setCoach(response.data[0])
            })

        Axios.post(`/api/comment/getComments`, coachVariable)
            .then(response => {
                if(response.data.success){
                    setCommentLists(response.data.comments)
                } else {
                    alert('failed to get comments')
                }
            })

    }, [])

    const addToCartHandler = (coachId) => {
        dispatch(addToCart(coachId))
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }
    if(Coach.writer){
    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Coach.name}</h1>
                <List.Item actions={[<LikeDislikes coach coachId={coachId} userId={localStorage.getItem('userId')}  />]}
                >
                </List.Item>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <CoachImage detail={Coach} />
                </Col>
                <Col lg={12} xs={24}>
                    <CoachInfo
                        addToCart={addToCartHandler}
                        detail={Coach} />
                </Col>
                

            </Row>
            <Comments CommentLists = {CommentLists} postId = {Coach._id} refreshFunction={updateComment}/>
        </div>
        
    )} else{
        return (
            <div>
        Loading
        </div>
        )
    }
}


    export default DetailCoachPage

