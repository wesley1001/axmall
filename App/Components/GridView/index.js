'use strict';
var React = require('react-native');
var Styles = require('./style.js');
var { View } = React;

var GridView = React.createClass({
    _renderItem : function(items){
        return ( 
            <View style={Styles.group}>
                { items.map(this.props.renderItem) }
            </View>
        );
    },
    _renderAuto : function(items,pernum){
        var n = Math.ceil(items.length / pernum);
        var r = [];
        for (var i = 1; i <= n; i++) {
            r.push(items.slice((i - 1) * pernum, i * pernum));
        };
        return r.map(this._renderItem);
    },
    render: function() {
        return(
            <View style={{flex:1}}>
                {this._renderAuto(this.props.items, this.props.itemsPerRow)}
            </View>
        );
    }
});
module.exports = GridView;