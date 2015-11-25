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
        backgroundColor: '#eee',
        flex: 1
    },
    navFlexContainer: {
        flexDirection: 'row',
        padding: 10
    },
    nav: {
        flex: 1,
        alignItems: 'center'
    },
    rowFlexContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingTop: 10,
        paddingLeft: 10
    },
    img: {
        width: windowSize.width,
        height: 120,
        marginBottom: 5
    },
});