package com.axmall.view.webview;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.webkit.WebView;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Jing on 15/9/22.
 */
public class ObservableWebView extends WebView {

    public ObservableWebView(Context context) {
        super(context);
    }

    public ObservableWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ObservableWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public ObservableWebView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public ObservableWebView(Context context, AttributeSet attrs, int defStyleAttr, boolean privateBrowsing) {
        super(context, attrs, defStyleAttr, privateBrowsing);
    }

    protected void getGoodsId(String url){
        WritableMap event = Arguments.createMap();
        String regex = "http://www.axmall.com.au/p/(\\d+)\\.html";
        Pattern pattern = Pattern.compile("^"+regex+"$");
        String id;
        Matcher matcher = pattern.matcher(url);
        if(matcher.find()){
            id = matcher.group(1);
            event.putString("id", id);
            ReactContext reactContext = (ReactContext)getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    getId(), "topChange", event);
        }
    }

    // @Override
    // protected void onScrollChanged(final int l, final int t, final int oldl, final int oldt)
    // {
    //     super.onScrollChanged(l, t, oldl, oldt);

    //     WritableMap event = Arguments.createMap();
    //     event.putInt("ScrollX", l);
    //     event.putInt("ScrollY", t);
    //     ReactContext reactContext = (ReactContext)getContext();
    //     reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
    //             getId(), "topChange", event);
    // }

    // @Override
    // public void setWebViewClient(new WebViewClient() {
    //     @Override
    //     public boolean shouldOverrideUrlLoading(WebView view, String url) {
    //         WritableMap event = Arguments.createMap();
    //         event.putInt("id", 1103); // 固定给个id = 1103的参数
    //         ReactContext reactContext = (ReactContext)getContext();
    //         reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
    //             getId(), "topChange", event);
    //         return true;
    //     }
    // });

}
