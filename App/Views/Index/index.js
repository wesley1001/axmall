'use strict';
var React = require('react-native');
var { Text, View, ScrollView } = React;
var api = require("../../Network/Apis.js");
var dataUrl = api.REQUEST_URL + 'category/health?page=1';
var GoodsCell = require("../GoodsCell");
var Styles = require("./style.js");
var { Icon } = require('react-native-icons');
var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/grid-view");
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
    _renderGoods: function() {
        return (
            <GridView
                items={this.state.goodsList}
                itemsPerRow={GOODS_PER_ROW}
                renderItem = {this._renderGoodsCell}
                onEndReached = { this._onEndReached } />
        )
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
                    <NavToolbar navigator = {this.state.title}  title={'澳新优选'}/>
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
                        {this._renderGoods()}
                    </ScrollView>
                </View>
            )
        }
    }
})
module.exports = Index;