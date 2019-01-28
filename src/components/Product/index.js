import React, { Component } from 'react';
import { Table, Tab, Tabs, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class Product extends Component {
    constructor(props) {
        super(props);

        // - set init state
        this.state = {
            products: [],
            sku: '',
            name: '',
            size: '',
            color: ''
        };

        // - bind function
        this._handleSKUChange = this._handleSKUChange.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleSizeChange = this._handleSizeChange.bind(this);
        this._handleColorChange = this._handleColorChange.bind(this);
        this._handleCreateProduct = this._handleCreateProduct.bind(this);
    }

    _handleSKUChange(e) { this.setState({ sku: e.target.value }); }
    _handleNameChange(e) { this.setState({ name: e.target.value }); }
    _handleSizeChange(e) { this.setState({ size: e.target.value }); }

    _handleColorChange(e) { this.setState({ color: e.target.value }); }

    _handleCreateProduct() {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/products',
            data: {
                sku: this.state.sku,
                name: this.state.name,
                color: this.state.color,
                size: this.state.size
            }
        })
        .then(() => {
            this.setState({
                sku: '',
                name: '',
                color: '',
                size: ''
            });
            alert('Success Inert New Product, Please Refresh Product Page!');
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        });
    }

    componentWillMount() {
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

    render() {
        return (
            <div>
                <h2>Product Page</h2>
                <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
                <Tab eventKey={1} title='List Of Product'>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Nama Barang</th>
                                <th>Ukuran</th>
                                <th>Warna</th>
                                <th>Jumlah</th>
                                <th>Harga Beli</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((value) => {
                                return (
                                    <tr>
                                        <td>{ value.sku }</td>
                                        <td>{ value.name }</td>
                                        <td>{ value.size }</td>
                                        <td>{ value.color }</td>
                                        <td>{ value.amount }</td>
                                        <td>{ value.average_purchase_price }</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey={2} title='Add Product'>
                <h3>Add New Product</h3>
                <form>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.sku}
                            placeholder='SKU, Example: SSI-D00791015-LL-BWH'
                            onChange={this._handleSKUChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.name}
                            placeholder='Nama Barang, Example: Zalekia Plain Casual Blouse'
                            onChange={this._handleNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.size}
                            placeholder='Ukuran, Example: L'
                            onChange={this._handleSizeChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            value={this.state.color}
                            placeholder='Warna, Example: Navy'
                            onChange={this._handleColorChange}
                        />
                    </FormGroup>

                    <Button
                        bsStyle='primary'
                        onClick={this._handleCreateProduct}
                    >Tambahkan</Button>
                </form>
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Product;
