/**
 * Created by amirassad on 6/13/17.
 */

"use strict";

import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';


class BooksForm extends React.Component {
    constructor(){
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount(){
        this.props.getBooks();
        axios.get('/api/images')
            .then((res)=>{
                this.setState({images: res.data})
            }//.bind(this) if we didnt use arrow
            )
            .catch((err)=>{
                this.setState({images: 'error loading image files from the server', img:''})
            }//.bind(this) if we didnt use arrow
            )
    }
    handleSubmit(){
        const title = findDOMNode(this.refs.title);
        const description = findDOMNode(this.refs.description);
        const images = findDOMNode(this.refs.image);
        const price = findDOMNode(this.refs.price);


        let set = false;
        if(title.value === ""){
            title.style.borderColor = '#ff3b11';
            set = true;
        }else{
            title.style.borderColor = '#fff';
        }

        if(description.value === ""){
            description.style.borderColor = '#ff3b11';
            set = true;
        }else{
            description.style.borderColor = '#fff';
        }
        if(images.value === ""){
            images.style.borderColor = '#ff3b11';
            set = true;
        }else{
            images.style.borderColor = '#fff';
        }
        if(price.value === ""){
            price.style.borderColor = '#ff3b11';
            set = true;
        }else{
            price.style.borderColor = '#fff';
        }

        if(set) return;

        const book =[{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        }];
        this.props.postBooks(book);
    }

    onDelete(){

        let bookId = findDOMNode(this.refs.delete).value;
        console.log("onDelete " + bookId );
        this.props.deleteBooks(bookId);
    }

    handleSelect(img){
        this.setState({
            img: '/images/' + img,
        });
    }

    resetForm(){
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img: ''})
    }
    render(){

        const booksList = this.props.books.map((booksArr)=>{
            return (
                <option key={booksArr._id}>{booksArr._id}</option>
            )
        });

        console.log(booksList);

        const imgList = this.state.images.map((imgArr, i)=>{
            console.log(i);
            const pic = "/images/" + imgArr.name;
            return (
                <MenuItem className="img" key={i} eventKey={imgArr.name} onClick={this.handleSelect.bind(this, imgArr.name)}>
                    <div style={{position: "relative"}}>
                        <img src={pic}/>
                    </div>
                    {/*<div style={{position: "absolute", bottom: "10px", color: "#000"}}>{imgArr.name}</div>*/}
                    <div style={{paddingTop: "5px"}}>{imgArr.name}</div>

                </MenuItem>
            )
        });

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6} >
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} /> <FormControl.Feedback/>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an Image"
                                    bsStyle="primary"
                                >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive/>
                        </Panel>
                    </Col>

                    <Col  xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price"/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <Button
                                onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this))}
                                bsStyle={(!this.props.style) ? ("primary") : (this.props.style)}>
                                {(!this.props.msg) ? ("Save book") : (this.props.msg)}
                            </Button>
                        </Panel>
                        <Panel style={{marginTop: '25px'}}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
                        </Panel>
                    </Col>
                </Row>

            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.booksReducer.books,
        msg:   state.booksReducer.msg,
        style: state.booksReducer.style,
        validation: state.booksReducer.validation,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({postBooks, deleteBooks, getBooks, resetButton}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);