'use strict';
var React = require('react-native');
var Styles = require('./style.js');
var { Icon } = require('react-native-icons');
var { View, Text,TouchableOpacity } = React;

var NavToolbar = React.createClass({
    _handlePress() {
        this.props.navigator.pop();
    },
    render: function () {
        if (this.props.back) {
            return (
                <View style={Styles.toolbar}>
                    <TouchableOpacity
                      style={Styles.iconCon}
                      onPress={this._handlePress}>
                        <Icon
                            name = 'axfont|cart'
                            size = {25}
                            style = {Styles.icon}
                        />
                    </TouchableOpacity>
                    <View style={Styles.title}>
                        <Text style={Styles.text}>{this.props.title}</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={Styles.toolbar}>
                    <View style={Styles.title}>
                        <Text style={Styles.text}>{this.props.title}</Text>
                    </View>
                </View>
            )
        }
    }
})
module.exports = NavToolbar;