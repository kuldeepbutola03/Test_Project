package com.aureans.raajneeti;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.kochava.reactlibrary.RNKochavaTrackerPackage;
import com.react.rnspinkit.RNSpinkitPackage;
// import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

// import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import fr.snapp.imagebase64.RNImgToBase64Package;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;


import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;                      
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.google.android.gms.ads.MobileAds;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;



public class MainApplication extends NavigationApplication implements ShareApplication, ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                // eg. new VectorIconsPackage()
                new MapsPackage(),
                new ImagePickerPackage(),
                new FBSDKPackage(mCallbackManager),
                new SvgPackage(),
                new VectorIconsPackage(),
                // new SplashScreenReactPackage(),
                new FastImageViewPackage(),
                new RNFusedLocationPackage(),
                new RNImgToBase64Package(),
                new RNSharePackage(),
                new RNFirebasePackage(),
                new RNFirebaseAnalyticsPackage(),
                new RNFirebaseAuthPackage(),
                new RNFirebaseAdMobPackage(),

                new PickerPackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage(),
                // new RCTSwipeRefreshLayoutPackage(),
                new OrientationPackage(),
                 new RNSpinkitPackage(),
                 new RNKochavaTrackerPackage()   
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getFileProviderAuthority() {
        return BuildConfig.APPLICATION_ID + ".provider";
    }

   
        

}
