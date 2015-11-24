'use strict';
var React = require('react-native');
var api = require("../../Network/Apis.js");

var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/grid-view");
var GoodsCell = require("../GoodsCell");
var Styles = require('./style.js');
var { Text, View, ScrollView, ListView } = React;
var GiftedSpinner = require('react-native-gifted-spinner');
var GOODS_PER_ROW = 2;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var Category = React.createClass({
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
        var dataUrl = api.REQUEST_URL + 'category/' + type + '?page=' + this.state.page;
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            if(responseData.goods_list.length > 0){
                var ary_goodslist = this.state.goodsList;
                Array.prototype.push.apply(ary_goodslist, responseData.goods_list);
                this.setState({
                    title: responseData.category.cat_name,
                    goodsList: ary_goodslist,
                    loaded: true,
                });
            }
        }).done();
    },
    _goToGoods: function(goods){
        this.props.navigator.push({
            'name': 'goods',
            'id' : goods.goods_id,
            'back' : true
        });
    },
    _renderGoodsCell: function(goods) {
        return (
            <View>
                <GoodsCell 
                    goods={goods} 
                    onSelect={() => this._goToGoods(goods)}/>
            </View>
        );
    },
    _onEndReached : function(){
        this.fetchData();
    },
    render: function(){
        if (!this.state.loaded) {
            return (
                <View style={Styles.loadingContainer}>
                    <Text> 加载中.... </Text> 
                </View>
            )
        } else {
            var _nav = this.props.navigator;
            var _title = this.state.title;
            return (
                <View style={{flex:1}}>
                    <NavToolbar navigator={_nav} title={_title} back={true}/>
                    <GridView
                        items={this.state.goodsList}
                        itemsPerRow={GOODS_PER_ROW}
                        renderItem = {this._renderGoodsCell}
                        onEndReached = { this._onEndReached }
                    />
                </View>
            )
            this.state.loaded = false;
        }
    }
})
module.exports = Category;