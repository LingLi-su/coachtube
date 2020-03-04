import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { categories, price } from './Sections/Datas'
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { useDispatch } from 'react-redux';





const { Meta } = Card;


function CoachLandingPage(props) {

    const [Coaches, setCoaches] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
   

    const [Filters, setFilters] = useState({
        categories: [],
        price: []
    })
    const coachId = props.match.params.coachId

    const coachVariable = {
        coachId: coachId
    }

    
    
    

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getCoaches(variables)

       

    }, [])

    const getCoaches = (variables) => {
        Axios.post('/api/coach/getCoaches', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setCoaches([...Coaches, ...response.data.coaches])
                    } else {
                        setCoaches(response.data.coaches)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch coach datas')
                }
            })
    }

    // const deleteCoaches = () => {

    //     Axios.delete(`/api/coach/coaches_by_id?id=${coachId}&type=single`)
    //         .then(response => {
    //             if(response.data.success) {
                    

    //                 alert("success")
    //             }else {
    //                 alert('Failed to delete coach')
    //             }
    //         })
    //     }
   
        

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true

        }
        getCoaches(variables)
        setSkip(skip)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getCoaches(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }


    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getCoaches(variables)
    }

   

    const renderCards = Coaches.map((coach, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                
                cover={<a href={`/coach/${coach._id}`} > <ImageSlider images={coach.images} /></a>}
            >
           
                <Meta
                    title={coach.name}
                    description={`$${coach.price}`}
                />

            </Card>
        </Col>
    })


    


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Creators  <Icon type="rocket" />  </h2>
            </div>


            {/* Filter  */}

        <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
           <CheckBox list={categories}
           handleFilters={filters => handleFilters(filters, "category")}/>
            </Col>

            
            <Col lg={12} xs={24}>
          <RadioBox list = {price}
          handleFilters={filters => handleFilters(filters, "price")}/>
            </Col>
        </Row>  

        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>
            {Coaches.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                        
                    </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}

export default CoachLandingPage
