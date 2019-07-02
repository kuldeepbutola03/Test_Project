package com.testproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import cl.json.RNSharePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.kochava.reactlibrary.RNKochavaTrackerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;// .FBSDKPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.facebook. CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.*;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    private  CallbackManager mCallbackManager = CallbackManager.Factory.create();
    protected  CallbackManager getCallbackManager() {
      return mCallbackManager;
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNSpinkitPackage(),
            new RNSharePackage(),
            new OrientationPackage(),
            new MapsPackage(),
            new RNKochavaTrackerPackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new RNImgToBase64Package(),
            new RNFusedLocationPackage(),
            new RNFSPackage(),
            new RNFirebasePackage(),

            new FBSDKPackage(mCallbackManager),
            new FastImageViewPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
