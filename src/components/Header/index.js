import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Navbar, Nav,
    NavItem, Row, Col,
    Grid
} from 'react-bootstrap';
import Product from '../Product';
import IncomingGoods from '../IncomingGoods';
import OutgoingGoods from '../OutgoingGoods';
import Report from '../Report';

class Header extends Component {
    render() {
        return (
            <Router>
                <div>
                <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Inventory System
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>
                        <Link to='/'>Products</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/incoming-goods'>Incoming Goods</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/outgoing-goods'>Outgoing Goods</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/reports'>Reports</Link>
                    </NavItem>
                </Nav>
                
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Route exact path='/' component={Product} />
                            <Route exact path='/incoming-goods' component={IncomingGoods} />
                            <Route exact path='/outgoing-goods' component={OutgoingGoods} />
                            <Route exact path='/reports' component={Report} />
                        </Col>
                    </Row>
                    
                </Grid>
                </div>
            </Router>
        )
    }
}

export default Header;