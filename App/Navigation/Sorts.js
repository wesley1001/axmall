var React = require('react-native');
var { Navigator } = React;
var SortsView = require('../../App/Views/Sorts');
var CategoryView = require('../../App/Views/Category');
var BrandsView = require('../../App/Views/Brands');
var GoodsView = require('../../App/Views/Goods');

var Sorts = React.createClass({
     _renderScene(route, navigator) {
        switch(route.name){
            case 'sorts': return (<SortsView navigator={navigator} /> );break;
            case 'category': return (<CategoryView navigator={navigator} route={route} /> );break;
            case 'brands' : return (<BrandsView navigator={navigator} route={route} /> );break;
            case 'goods' : return (<GoodsView navigator={navigator} route={route} /> );break;
        }
    },
    render(){
        return (
            <Navigator
                initialRoute={{'name':'sorts'}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={this._renderScene}
            />

        )
    }
})
module.exports = Sorts;