'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions
} = React;
var windowSize = Dimensions.get('window');
module.exports = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    sortsFlex: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    item: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    images: {
        width: windowSize.width / 3,
        height: windowSize.width / 3
    },
    title: {
        margin: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#7BBE31',
        paddingLeft: 10
    }
});