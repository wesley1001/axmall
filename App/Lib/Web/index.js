'use strict';
var React = require('react-native');
var {
    requireNativeComponent,
    PropTypes
} = React;
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
class ObservableWebView extends React.Component {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this._viewGoods = this._viewGoods.bind(this);
    }
    _onChange(event: Event) {
        if (!this.props.onScrollChange) {
            return;
        }
        this.props.onScrollChange(event.nativeEvent.ScrollY);
    }
    _viewGoods(event: Event) {
        if (!this.props.viewGoods) {
            return;
        }
        console.log(event);
        this.props.viewGoods(event);
    }
    render() {
    	return <RCTWebView {...this.props} onChange={this._onChange} viewGoods={this._viewGoods} />;
    }
}
ObservableWebView.propTypes = {
    url: PropTypes.string,
    html: PropTypes.string,
    css: PropTypes.string,
    onScrollChange: PropTypes.func,
    viewGoods: PropTypes.func,
};

var RCTWebView = requireNativeComponent('RCTWebView', ObservableWebView, {
    nativeOnly: {
        onChange: true
    }
});
module.exports = ObservableWebView;