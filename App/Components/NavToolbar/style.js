'use strict';
var React = require('react-native');
var {
    StyleSheet
} = React;
var styles = StyleSheet.create({
	toolbar:{
    	height: 40,
    	backgroundColor : '#7ABE31',
    	flexDirection: 'row',
    	justifyContent: 'center',
    },
    iconCon: {
    	height: 40,
    	justifyContent: 'center',
    },
    icon: {
    	color: '#fff',
    	alignItems: 'center',
    	width: 25,
    	height: 25,
    	marginLeft: 5,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        flex: 1,
    },
    text: {
    	fontSize: 20,
    	color: '#ffffff',
    }
    
});
module.exports = styles;