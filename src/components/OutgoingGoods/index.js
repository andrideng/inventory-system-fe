import React, { Component } from 'react';
import { Table, Tab, Tabs, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class OutgoingGoods extends Component {
    constructor(props) {
        super(props);

        // - set init state
        this.state = {
            outgoingGoods: [],
            products: [],
            order_id: '',
            sku: '',
            amount: '',
            price: '',
            note: ''
        };
        
        // - bind function
        this._handleOrderIdChange = this._handleOrderIdChange.bind(this);
        this._handleSKUChange = this._handleSKUChange.bind(this);
        this._handleAmountChange = this._handleAmountChange.bind(this);
        this._handlePriceChange = this._handlePriceChange.bind(this);
        this._handleNoteChange = this._handleNoteChange.bind(this);
        this._handleCreateOutgoingGoods = this._handleCreateOutgoingGoods.bind(this);
    }

    _handleOrderIdChange(e) { this.setState({ order_id: e.target.value }); }
    _handleSKUChange(e) { this.setState({ sku: e.target.value }); }
    _handleAmountChange(e) { this.setState({ amount: e.target.value }); }
    _handlePriceChange(e) { this.setState({ price: e.target.value }); }
    _handleNoteChange(e) { this.setState({ note: e.target.value }); }

    _handleCreateOutgoingGoods() {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/outgoing-goods',
            data: {
                order_id: this.state.order_id,
                sku: this.state.sku,
                amount: parseInt(this.state.amount),
                price: parseFloat(this.state.price),
                note: this.state.note
            }
        })
        .then(() => {
            this.setState({
                order_id: '',
                amount: '',
                price: '',
                note: ''
            });
            alert('Success Inert New Outgoing Goods, Please Refresh Outgoing Goods Page!');
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        });
    }

    componentWillMount() {
        // - fetch incoming-goods
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/outgoing-goods'
        })
        .then(({ data }) => {
            this.setState({
                outgoingGoods: [...data.data]
            });
        })
        .catch(err => {
            alert(err);
        });

        // - fetch products
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/products'
        })
        .then(({ data }) => {
            this.setState({
                products: [...data.data]
            });
        })
        .catch(err => {
            alert(err);
        });
    }

    render () {
        return (
            
            <div>
                <h2>This is Outgoing Goods</h2>
                <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
                <Tab eventKey={1} title='List Of Outgoing Goods'>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Waktu</th>
                                <th>Nomor Pesanan</th>
                                <th>SKU</th>
                                <th>Jumlah Keluar</th>
                                <th>Harga Jual</th>
                                <th>Total</th>
                                <th>Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.outgoingGoods.map((value) => {
                                return (
                                    <tr>
                                        <td>{ value.created_at }</td>
                                        <td>{ value.order_id }</td>
                                        <td>{ value.sku }</td>
                                        <td>{ value.amount }</td>
                                        <td>{ value.price }</td>
                                        <td>{ value.total }</td>
                                        <td>{ value.note }</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey={2} title='Add Outgoing Goods'>
                <h3>Add New Outgoing Goods</h3>
                <form>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.order_id}
                            placeholder='Nomor Kwitansi, Example: ID-20180109-853724'
                            onChange={this._handleOrderIdChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            componentClass="select"
                            placeholder="SKU"
                            onChange={this._handleSKUChange}
                        >
                            {this.state.products.map((value) => {
                                return (
                                    <option value={value.sku}>
                                        { value.sku } - { value.name } ({value.size}, {value.color})
                                    </option>
                                );
                            })}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='number'
                            value={this.state.amount}
                            placeholder='Jumlah Keluar, Example: 1'
                            onChange={this._handleAmountChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='number'
                            value={this.state.price}
                            placeholder='Harga Jual, Example: 115000'
                            onChange={this._handlePriceChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.note}
                            placeholder='Catatan, Example: Barang Bagus'
                            onChange={this._handleNoteChange}
                        />
                    </FormGroup>
                    

                    <Button
                        bsStyle='primary'
                        onClick={this._handleCreateOutgoingGoods}
                    >Tambahkan</Button>
                </form>
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default OutgoingGoods;
