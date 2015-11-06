'use strict';
var React = require('react-native');
var {
    Text, View, ScrollView
} = React;
var Styles = require('./style.js');
var api = require("../../Network/Apis.js");
var NavToolbar = require('../../Components/NavToolbar/index.js');
var GridView = require("../../Components/GridView");
var GoodsCell = require("../GoodsCell");
var Goods_PER_ROW = 2;
var Brands = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loaded: false,
            goodsList: [],
            title: '澳新优选',
            dataUrl: ''
        };
    },
    componentDidMount: function() {
        var id = this.props.route.id;
        this.state.dataUrl = api.REQUEST_URL + 'brand/' + id;
        this.fetchData();
    },
    fetchData: function() {
        fetch(this.state.dataUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                title: responseData.brand.brand_name,
                goodsList: responseData.goods_list,
                loaded: true,
            });
        }).done();
    },
    _goToGoods: function(goods) {
        this.props.navigator.push({
            'name': 'goods',
            'id': goods.goods_id,
            'back': true
        });
    },
    _renderGoodsCell: function(goods) {
        return (
            <View>
                <GoodsCell
                  goods={goods}
                  onSelect={()=>this._goToGoods(goods)}/>
            </View>
        );
    },
    _renderGoods: function() {
        return (
            <GridView
              items={ this.state.goodsList }
              itemsPerRow={ Goods_PER_ROW }
              renderItem={ this._renderGoodsCell }/>
        )
    },
    render: function() {
        var _nav = this.props.navigator;
        var _title = this.state.title;
        if (!this.state.loaded) {
            return (
                <View
                  style={ Styles.loadingContainer} >
                    <Text> 加载中.... </Text>
                </View>
            )
        } else {
            return (
                <View
                  style={{flex: 1}}> 
                    <NavToolbar
                      navigator = {_nav}
                      title = { _title }
                      back = { true }/>
                    <ScrollView>
                        { this._renderGoods() }
                    </ScrollView>
                </View>
            )
        }
    }
})
module.exports = Brands;