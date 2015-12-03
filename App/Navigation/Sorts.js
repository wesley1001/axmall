'use strict';
/* component */
var React = require('react-native');
var { Navigator,ScrollView,View,Dimensions } = React;
var {width, height} = Dimensions.get('window')

/* View */
var SortsView = require('../../App/Views/Sorts');
var CategoryView = require('../../App/Views/Category');
var BrandsView = require('../../App/Views/Brands');
var GoodsView = require('../../App/Views/Goods');
var CommentView = require('../../App/Views/Goods/Comment');

/* main */
var Sorts = React.createClass({
     _renderScene(route, navigator) {
        switch(route.name){
            case 'sorts':
                return (
                    <View style={{flex: 1}}>
                        <ScrollView style={{width: width, height: height - 55}}>
                            <SortsView navigator={navigator} />
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems: 'center', width: width, height:55 }}>
                            {this.props.item}
                        </View>
                    </View> 
                );break;
            case 'category': return (<CategoryView navigator={navigator} route={route} /> );break;
            case 'brands' : return (<BrandsView navigator={navigator} route={route} /> );break;
            case 'goods' : return (<GoodsView navigator={navigator} route={route} /> );break;
            case 'goodscomment' :  return (<CommentView navigator={navigator} route={route}/> ); break;
        }
    },
    render(){
        return (
            <Navigator
                initialRoute={{'name':'sorts',type:'baby'}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={this._renderScene}
            />

        )
    }
})
module.exports = Sorts;