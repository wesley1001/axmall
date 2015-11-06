var React = require('react-native');
var { Navigator } = React;
var IndexView = require('../../App/Views/Index');
var WebView = require('../../App/Components/Web');
var CategoryView = require('../../App/Views/Category');
var BrandsView = require('../../App/Views/Brands');
var GoodsView = require('../../App/Views/Goods');

var Index = React.createClass({
     _renderScene(route, navigator) {
        switch(route.name){
        	case 'index' : return (<IndexView navigator={navigator} /> );break;
            case 'webview': return (<WebView navigator={navigator} route={route} /> );break;
            case 'category': return (<CategoryView navigator={navigator} route={route} /> );break;
            case 'brands' : return (<BrandsView navigator={navigator} route={route} /> );break;
            case 'goods' : return (<GoodsView navigator={navigator} route={route} /> );break;
        }
    },
    render(){
        return (
            <Navigator
                initialRoute={{'name':'index'}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={this._renderScene}
            />

        )
    }
})
module.exports = Index;