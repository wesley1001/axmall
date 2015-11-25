'use strict';
/* component */
var React = require('react-native');
var { Navigator } = React;

/* View */
var ActivityView = require('../../App/Views/Activity');
var WebView = require('../../App/Views/Web');
var GoodsView = require('../../App/Views/Goods');

/* main */
var Activity = React.createClass({
     _renderScene(route, navigator) {
        switch(route.name){
        	case 'activity' : return ( <ActivityView navigator={navigator} /> ); break;
            case 'webview': return ( <WebView navigator={navigator} route={route} /> ); break;
            case 'goods' : return ( <GoodsView navigator={navigator} route={route} /> ); break;
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