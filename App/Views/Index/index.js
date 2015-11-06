'use strict';
var React = require('react-native');
var { Text, View, ScrollView } = React;
var api = require("../../Network/Apis.js");
var dataUrl = api.REQUEST_URL + 'category/health?page=1';
var GoodsCell = require("../GoodsCell");
var Styles = require("./style.js");
var { Icon } = require('react-native-icons');
var NavToolbar = require('../../Components/NavToolbar/index.js');
var GOODS_PER_ROW = 2;
var Index = React.createClass({
    getInitialState: function() {
        return {
            goodsList: [],
            loaded: false,
            title: '澳新优选'
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                goodsList: responseData.goods_list,
                loaded: true,
            });
        }).done();
    },
    _renderGoodsCell: function(goods) {
        return (
            <View><GoodsCell goods = {goods}/></View>
        );
    },
    _renderGoodsAuto: function(goodslist, pernum) {
        var n = Math.ceil(goodslist.length / pernum);
        var r = [];
        for (var i = 1; i <= n; i++) {
            r.push(goodslist.slice((i - 1) * pernum, i * pernum));
        };
        return r.map(this._renderGoods);
    },
    _renderGoods: function(goods) {
        return ( 
            <View style = {Styles.rowFlexContainer}>
                { goods.map(this._renderGoodsCell) }
            </View>
        );
    },
    render: function() {
        if (!this.state.loaded) {
            return (
                <View style={{flex: 1}}>
                    <NavToolbar navigator = {this.state.title} />
                    <View style={Styles.loadingContainer}>
                        <Text> 加载中.... </Text> 
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <NavToolbar navigator = {this.state.title} />
                    <ScrollView>
                        <View style={Styles.navFlexContainer}>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                        </View>
                        {this._renderGoodsAuto(this.state.goodsList, GOODS_PER_ROW)}
                    </ScrollView>
                </View>
            )
        }
    }
})
module.exports = Index;