import React, { Component } from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

class Report extends Component {
    constructor(props) {
        super(props);

        // - set init state
        this.state = {
            sales: [],
            value_of_goods: [],
            print_date: '',
            total_sku: 0,
            total_product: 0,
            total_value: 0,
            total_omzet: 0,
            net_profit: 0,
            total_sales: 0,
            total_items: 0
        };
    }

    componentWillMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/reports/value-of-goods'
        })
        .then(({ data }) => {
            this.setState({
                value_of_goods: [...data.data.value_of_goods],
                print_date: data.data.print_date,
                total_sku: data.data.total_sku,
                total_product: data.data.total_product,
                total_value: data.data.total_value
            });
        })
        .catch(err => {
            alert(err);
        });
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/reports/sales?start_date=2019-01-01&end_date=2019-01-31'
        })
        .then(({ data }) => {
            this.setState({
                sales: [...data.data.sales],
                total_omzet: data.data.total_omzet,
                net_profit: data.data.net_profit,
                total_sales: data.data.total_sales,
                total_items: data.data.total_items
            });
        })
        .catch(err => {
            alert(err);
        });
    }

    render() {
        return (
            <div>
                <h2>Report Page</h2>
                <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
                <Tab eventKey={1} title='Laporan Nilai Barang'>
                    <table>
                        <tr>
                            <td>Tanggal Cetak</td> <td>:</td>
                            <td>{ this.state.print_date }</td>
                        </tr>
                        <tr>
                            <td>Jumlah SKU</td> <td>:</td>
                            <td>{ this.state.total_sku }</td>
                        </tr>
                        <tr>
                            <td>Jumlah Total Barang</td> <td>:</td>
                            <td>{ this.state.total_product }</td>
                        </tr>
                        <tr>
                            <td>Total Nilai</td> <td>:</td>
                            <td>{ this.state.total_value }</td>
                        </tr>
                    </table>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Rata-Rata Harga Beli</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.value_of_goods.map((value) => {
                                return (
                                    <tr>
                                        <td>{ value.sku }</td>
                                        <td>{ value.name }</td>
                                        <td>{ value.amount }</td>
                                        <td>{ value.average_purhcase_price }</td>
                                        <td>{ value.total }</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                    <h4>Untuk file dapat dilihat pada project inventory-system/reports/[DD]_[Mon]_[YYYY]_[HH]_[mm]_[ss]-goods-of-values.csv</h4>
                </Tab>
                <Tab eventKey={2} title='Laporan Penjualan'>
                    <table>
                        <tr>
                            <td>Tanggal Cetak</td> <td>:</td>
                            <td>{ this.state.print_date }</td>
                        </tr>
                        <tr>
                            <td>Periode Tanggal</td> <td>:</td>
                            <td>1 Januari 2019 - 31 Januari 2019</td>
                        </tr>
                        <tr>
                            <td>Total Omset</td> <td>:</td>
                            <td>{ this.state.total_omzet }</td>
                        </tr>
                        <tr>
                            <td>Total Laba</td> <td>:</td>
                            <td>{ this.state.net_profit }</td>
                        </tr>
                        <tr>
                            <td>Total Penjualan</td> <td>:</td>
                            <td>{ this.state.total_sales }</td>
                        </tr>
                        <tr>
                            <td>Total Barang</td> <td>:</td>
                            <td>{ this.state.total_items }</td>
                        </tr>
                    </table>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>ID Pesanan</th>
                                <th>Waktu</th>
                                <th>SKU</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Harga Jual</th>
                                <th>Total</th>
                                <th>Harga Beli</th>
                                <th>Laba</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map((value) => {
                                return (
                                    <tr>
                                        <td>{ value.order_id }</td>
                                        <td>{ value.time }</td>
                                        <td>{ value.sku }</td>
                                        <td>{ value.product_name }</td>
                                        <td>{ value.amount }</td>
                                        <td>{ value.sell_price }</td>
                                        <td>{ value.total }</td>
                                        <td>{ value.buy_price }</td>
                                        <td>{ value.profit }</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </Table>
                    <h4>Untuk file dapat dilihat pada project inventory-system/reports/[DD]_[Mon]_[YYYY]_[HH]_[mm]_[ss]-sales.csv</h4>
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Report;
