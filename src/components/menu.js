/**
 * Created by amirassad on 6/19/17.
 */

"use strict";

import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class _Menu extends React.Component{
    // click(){
    //
    //     console.log("clicked\n\n\n\n\n\n");
    // }
    render(){
        console.log("dwkjnfneiufneiufn\n\n\n\n\n\n");
        return(
            //make navbar stuck on top of webpage
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Gallery</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {/*event key= for children*/}
                        <NavItem eventKey={1} href="/about">About</NavItem>
                        <NavItem eventKey={2} href="/contact">Contact</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        <NavItem eventKey={2} href="/cart">Cart { (this.props.cartItemsNumber > 0) ? (<Badge className="badge">{this.props.cartItemsNumber}</Badge>) : (" ")}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default _Menu;