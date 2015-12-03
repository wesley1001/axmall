'use strict';
/* component */
var React = require('react-native');
var { Navigator,ScrollView,View,Dimensions } = React;
var {width, height} = Dimensions.get('window')

/* View */
var ActivityView = require('../../App/Views/Activity');
var WebView = require('../../App/Views/Web');
var GoodsView = require('../../App/Views/Goods');
var CommentView = require('../../App/Views/Goods/Comment');

/* main */
var Activity = React.createClass({
     _renderScene(route, navigator) {
        switch(route.name){
        	case 'activity' :
                return (
                    <View style={{flex: 1}}>
                        <ScrollView style={{width: width, height: height - 55}}>
                            <ActivityView navigator={navigator} />
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems: 'center', width: width, height:55 }}>
                            {this.props.item}
                        </View>
                    </View> 
                );break;
            case 'webview': return ( <WebView navigator={navigator} route={route} /> ); break;
            case 'goods' : return ( <GoodsView navigator={navigator} route={route} /> ); break;
            case 'goodscomment' :  return (<CommentView navigator={navigator} route={route}/> ); break;
        }
    },
    render(){
        return (
            <Navigator
                initialRoute={{'name':'activity'}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={this._renderScene}
            />
        )
    }
})
module.exports = Activity;