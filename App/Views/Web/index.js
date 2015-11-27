'use strict';
var React = require('react-native');
var { View, WebView, Platform, Dimensions } = React;
var MyWebView = (Platform.OS === 'ios') ? WebView : require("../../Lib/Web");
var NavToolbar = require('../../Lib/NavToolbar/index.js');

var windowSize = Dimensions.get('window');
var Web = React.createClass({
	_goToGoods: function(event) {
        this.props.navigator.push({
            'name': 'goods',
            'id' : event.id,
            'back' : true
        });
    },
    render: function() {
        return (
        	<View style={{flex: 1}}>
        		<NavToolbar navigator = {this.props.navigator}  title={this.props.route.title} back={true}/>
		        <MyWebView
		          style={{ flex: 1, width: windowSize.width }}
		          url={this.props.route.id}
		          onScrollChange={this._goToGoods}/>
		    </View>
        );
    }
});
module.exports = Web; 