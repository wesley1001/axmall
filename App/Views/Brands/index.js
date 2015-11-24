'use strict';
var React = require('react-native');
var {
    Text, View, ScrollView
} = React;
var Styles = require('./style.js');
var api = require("../../Network/Apis.js");
var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/grid-view");
var GoodsCell = require("../GoodsCell");
var Goods_PER_ROW = 2;
var Brands = React.createClass({
    getInitialState: function() {
        return {
            page : 0,
            loaded : false,
            goodsList : [],
            title : '澳新优选',
            dataSource: [],
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        var type = this.props.route.id;
        this.state.page = this.state.page + 1;
        var dataUrl = api.REQUEST_URL + 'brand/' + type + '?page=' + this.state.page;
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            console.log(responseData);
            if(responseData.goods_list.length > 0){
                var ary_goodslist = this.state.goodsList;
                Array.prototype.push.apply(ary_goodslist, responseData.goods_list);
                this.setState({
                    title: responseData.brand.brand_name,
                    goodsList: ary_goodslist,
                    loaded: true,
                });
            }
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
    _onEndReached : function(){
        this.fetchData();
    },
    _renderGoods: function() {
        return (
            <GridView
              items={ this.state.goodsList }
              itemsPerRow={ Goods_PER_ROW }
              onEndReached = { this._onEndReached }
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
                    <NavToolbar navigator = {_nav} title = { _title } back = { true }/>
                    { this._renderGoods() }
                </View>
            )
        }
    }
})
module.exports = Brands;