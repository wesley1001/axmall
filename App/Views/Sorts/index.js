'use strict';
var React = require('react-native');
var { Image, Text, View, ScrollView, TouchableHighlight } = React;
var Styles = require('./style.js');

var Api = require("../../Network/Apis.js");
var dataUrl = Api.REQUEST_URL + 'brand/?page=1';

var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/GridView");
var BrandsCell = require("../BrandsCell");

var Brand_PER_ROW = 3;
var Sorts = React.createClass({
    getInitialState: function() {
        return {
            page : 1,
            loaded : false,
            brandList : [],
            title : '澳新优选'
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                brandList: responseData.brands,
                loaded: true,
            });
        }).done();
    },
    _goToCategory: function(type){
        this.props.navigator.push({
            'name': 'category',
            'id' : type,
            'back' : true,
        });
    },
    _goToBrands: function(brand){
        this.props.navigator.push({
            'name': 'brands',
            'id' : brand.brand_id,
            'back' : true
        });
    },
    _renderBrandsCell: function(brand) {
        return (
            <View>
                <BrandsCell
                  brand={brand}
                  navigator={navigator}
                  _onPress={()=>this._goToBrands(brand)} />
            </View>
        );
    },
    _renderBrand: function(){
        if (!this.state.loaded) {
            return (
                <View style={Styles.loadingContainer}>
                    <Text> 加载中.... </Text> 
                </View>
            )
        } else {
            return (
                <GridView
                    items = {this.state.brandList}
                    itemsPerRow = {Brand_PER_ROW}
                    renderItem = {this._renderBrandsCell} />
            )
        }
    },

    render: function() {
        return (
            <View style={{flex:1}}>
                <NavToolbar title={'澳新优选'}/>
                <ScrollView>
                    <View style={Styles.title}>
                        <Text style={{fontSize: 20}}>分类</Text>
                    </View>
                    <View style={Styles.sortsFlex}>
                        <TouchableHighlight style={Styles.item} onPress={()=>{this._goToCategory('health')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/baojian.jpg'}} />
                                <Text>营养保健</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={Styles.item} onPress={()=>{this._goToCategory('baby')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/yinger.jpg'}} />
                                <Text>母婴用品</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  style={Styles.item} onPress={()=>{this._goToCategory('skin')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/meirong.jpg'}} />
                                <Text>美容护肤</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={Styles.sortsFlex}>
                        <TouchableHighlight style={Styles.item} onPress={()=>{this._goToCategory('food')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/lingshi.jpg'}} />
                                <Text>进口食品</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={Styles.item} onPress={()=>{this._goToCategory('liquor')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/hongjiu.jpg'}} />
                                <Text>酒水茶饮</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  style={Styles.item} onPress={()=>{this._goToCategory('homeware')}}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                  style={Styles.images}
                                  source={{uri: 'http://static.axmall.com.au/v2/m/style/images/jujia.jpg'}} />
                                <Text>居家日用</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={Styles.title}>
                        <Text style={{fontSize: 20}}>品牌</Text>
                    </View>
                    {this._renderBrand()}
                </ScrollView>
            </View>
        )
    }
})
module.exports = Sorts;