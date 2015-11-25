package com.axmall.view.webview;

import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIProp;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by Jing on 15/9/22.
 */
public class ReactWebViewManager extends SimpleViewManager<ObservableWebView> {

    public static final String REACT_CLASS = "RCTWebView";

    @UIProp(UIProp.Type.STRING)
    public static final String PROP_URL = "url";

    @UIProp(UIProp.Type.STRING)
    public static final String PROP_HTML = "html";

    @UIProp(UIProp.Type.STRING)
    public static final String PROP_CSS = "css";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ObservableWebView createViewInstance(ThemedReactContext reactContext) {
        return new ObservableWebView(reactContext);
    }

    // private int getScale(){
    //     Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay(); 
    //     int width = display.getWidth(); 
    //     Double val = new Double(width)/new Double(PIC_WIDTH);
    //     val = val * 100d;
    //     return val.intValue();
    // }

    @Override
    public void updateView(final ObservableWebView webView, CatalystStylesDiffMap props) {
        super.updateView(webView, props);
        if (props.hasKey(PROP_URL)) {
            webView.getSettings().setLoadWithOverviewMode(true);
            webView.getSettings().setUseWideViewPort(true);
            webView.loadUrl(props.getString(PROP_URL));
            webView.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    WritableMap event = Arguments.createMap();
                    event.putInt("id", 1103);
                    ReactContext reactContext = (ReactContext)getContext();
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(), "topChange", event);
                    return true;
                }
            });
        }

        if (props.hasKey(PROP_HTML)) {
            String html = props.getString(PROP_HTML);
            if (props.hasKey(PROP_CSS)) {
                String css = props.getString(PROP_CSS);
                html = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + css + "\" />" + html;
            }
            webView.loadData(html, "text/html; charset=utf-8", "UTF-8");
        }

    }
}
