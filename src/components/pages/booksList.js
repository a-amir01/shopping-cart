"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';



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
                        price={booksArr.price} />
                </Col>
            )
        });

        console.log("accessing state? ", this.props.books);
        return (
            <Grid>
                <Row>
                    <Cart/>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <BooksForm/>
                    </Col>
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