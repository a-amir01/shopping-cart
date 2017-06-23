"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

//import Carousel from 'react-responsive-carousel';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';


var Carousel = require('react-responsive-carousel').Carousel;


class BookList extends React.Component {
    componentDidMount(){
        //Dispatch an action
        this.props.getBooks();
    }
    render (){
        console.log("HOW STATE LOOKS LIKE", this.props.state);

        console.log("HOW STATE.BOOKS LOOKS LIKE", this.props.stateBooks);

        console.log("HOW STATE.BOOKS.BOOKS LOOKS LIKE", this.props.stateBooksBooks);
        const bookList = this.props.books.map((booksArr) => {
            console.log(booksArr._id);
            return (

                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price} />
                </Col>
            )
        });

        console.log("accessing state? ", this.props.books);
        return (
            <Grid className="test">
                <Row>
                    {/*<div className="pics">*/}
                        <Carousel axis="horizontal" interval={3000} showThumbs={false} autoPlay stopOnHover
                                  useKeyboardArrows infiniteLoop dynamicHeight emulateTouch>
                            <div>
                                <img width={1000} height={600} alt="900x400" src="/images/Ambassador of love.jpg"/>
                            </div>
                            <div>
                                <img width={1000} height={600} alt="900x400" src="/images/Jubilant.jpg"/>
                            </div>
                            <div>
                                <img width={1000} height={600} alt="900x400" src="/images/Dream.jpg"/>

                            </div>
                        </Carousel>
                        {/*<Carousel>*/}
                            {/*<Carousel.Item>*/}
                                {/*<img width={500} height={200} alt="900x300" src="/images/Ambassador of love.jpg"/>*/}
                                {/*<Carousel.Caption>*/}
                                    {/*<h3>Ambassador of love</h3>*/}
                                {/*</Carousel.Caption>*/}
                            {/*</Carousel.Item>*/}
                            {/*<Carousel.Item>*/}
                                {/*<img width={500} height={200} alt="900x300" src="/images/Dream.jpg"/>*/}
                                {/*<Carousel.Caption>*/}
                                    {/*<h3>Dream</h3>*/}
                                {/*</Carousel.Caption>*/}
                            {/*</Carousel.Item>*/}
                            {/*<Carousel.Item>*/}
                                {/*<img width={500} height={200} alt="900x300" src="/images/Regeneration.jpg"/>*/}
                                {/*<Carousel.Caption>*/}
                                    {/*<h3>Regeneration</h3>*/}
                                {/*</Carousel.Caption>*/}
                            {/*</Carousel.Item>*/}
                        {/*</Carousel>*/}
                    {/*</div>*/}
                 </Row>
                <Row>
                    <Cart/>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    {bookList}
                </Row>
            </Grid>
        )
    }
}

function mapStateProps(state) {
    return {
        books: state.booksReducer.books,

        state: state,

        stateBooks: state.booksReducer,

        stateBooksBooks: state.booksReducer.books
    }
}

function mapDispatchToProps(dispatch){
    //like calling the dispatch function
    return bindActionCreators({getBooks: getBooks}, dispatch);
}
export default connect(mapStateProps, mapDispatchToProps)(BookList);