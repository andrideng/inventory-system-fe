import React, { Component } from 'react';
import { Table, Tab, Tabs, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class IncomingGoods extends Component {
    constructor(props) {
        super(props);

        // - set init state
        this.state = {
            incomingGoods: [],
            products: [],
            receipt_number: '',
            sku: '',
            amount_orders: '',
            amount_received: '',
            purchase_price: '',
            id: ''
        };

        // - bind function
        this._handleReceiptNumberChange = this._handleReceiptNumberChange.bind(this);
        this._handleSKUChange = this._handleSKUChange.bind(this);
        this._handleAmountOrdersChange = this._handleAmountOrdersChange.bind(this);
        this._handleAmountReceivedChange = this._handleAmountReceivedChange.bind(this);
        this._handlePurchasePriceChange = this._handlePurchasePriceChange.bind(this);
        this._handleSelectReceiptNumberChange = this._handleSelectReceiptNumberChange.bind(this);
        this._handleCreateIncomingGoods = this._handleCreateIncomingGoods.bind(this);
        this._handleUpdateIncomingGoods = this._handleUpdateIncomingGoods.bind(this);
    }

    _handleReceiptNumberChange(e) { this.setState({ receipt_number: e.target.value }); }
    _handleSKUChange(e) { this.setState({ sku: e.target.value }); }
    _handleAmountOrdersChange(e) { this.setState({ amount_orders: e.target.value }); }
    _handleAmountReceivedChange(e) { this.setState({ amount_received: e.target.value }); }
    _handleSelectReceiptNumberChange(e) { this.setState({ id: e.target.value }); }
    _handlePurchasePriceChange(e) { this.setState({ purchase_price: e.target.value }); }

    _handleCreateIncomingGoods() {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/incoming-goods',
            data: {
                receipt_number: this.state.receipt_number,
                sku: this.state.sku,
                amount_orders: parseInt(this.state.amount_orders),
                amount_received: parseInt(this.state.amount_received),
                purchase_price: parseFloat(this.state.purchase_price)
            }
        })
        .then(() => {
            this.setState({
                receipt_number: '',
                amount_orders: '',
                amount_received: '',
                purchase_price: ''
            });
            alert('Success Inert New Incoming Goods, Please Refresh Incoming Goods Page!');
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        });
    }

    _handleUpdateIncomingGoods() {
        axios({
            method: 'PUT',
            url: `http://localhost:8080/api/incoming-goods/${this.state.id}`,
            data: {
                amount_received: parseInt(this.state.amount_received)
            }
        })
        .then(() => {
            this.setState({
                amount_received: ''
            });
            alert('Success Update Incoming Goods, Please Refresh Incoming Goods Page!');
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
            url: 'http://localhost:8080/api/incoming-goods'
        })
        .then(({ data }) => {
            this.setState({
                incomingGoods: [...data.data]
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
                <h2>This is Incoming Goods</h2>
                <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
                <Tab eventKey={1} title='List Of Incoming Goods'>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Waktu</th>
                                <th>Nomor Kwitansi</th>
                                <th>SKU</th>
                                <th>Jumlah Pesanan</th>
                                <th>Jumlah Diterima</th>
                                <th>Harga Beli</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.incomingGoods.map((value) => {
                                return (
                                    <tr>
                                        <td>{ value.created_at }</td>
                                        <td>{ value.receipt_number }</td>
                                        <td>{ value.sku }</td>
                                        <td>{ value.amount_orders }</td>
                                        <td>{ value.amount_received }</td>
                                        <td>{ value.purchase_price }</td>
                                        <td>{ value.total }</td>
                                        <td>{ value.status }</td>
                                        <td>{ value.note }</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey={2} title='Add Incoming Goods'>
                <h3>Add New Incoming Goods</h3>
                <form>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.receipt_number}
                            placeholder='Nomor Kwitansi, Example: 20180102-69539'
                            onChange={this._handleReceiptNumberChange}
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
                            value={this.state.amount_orders}
                            placeholder='Jumlah Pemesanan, Example: 41'
                            onChange={this._handleAmountOrdersChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='number'
                            value={this.state.amount_received}
                            placeholder='Jumlah Diterima, Example: 41'
                            onChange={this._handleAmountReceivedChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='number'
                            value={this.state.purchase_price}
                            placeholder='Harga Beli, Example: 77000'
                            onChange={this._handlePurchasePriceChange}
                        />
                    </FormGroup>

                    <Button
                        bsStyle='primary'
                        onClick={this._handleCreateIncomingGoods}
                    >Tambahkan</Button>
                </form>
                </Tab>
                <Tab eventKey={3} title='Update Incoming Goods'>
                <h3>Update Incoming Goods</h3>
                <form>
                    <FormGroup>
                        <FormControl
                            componentClass="select"
                            onChange={this._handleSelectReceiptNumberChange}
                        >
                            {this.state.incomingGoods.map((value) => {
                                return (
                                    <option value={value.id}>
                                        { value.receipt_number }
                                    </option>
                                );
                            })}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='number'
                            value={this.state.amount_received}
                            placeholder='Jumlah Diterima, Example: 41'
                            onChange={this._handleAmountReceivedChange}
                        />
                    </FormGroup>

                    <Button
                        bsStyle='primary'
                        onClick={this._handleUpdateIncomingGoods}
                    >Ganti</Button>
                </form>
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default IncomingGoods;
