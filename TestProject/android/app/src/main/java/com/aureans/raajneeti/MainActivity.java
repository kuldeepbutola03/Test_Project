package com.aureans.raajneeti;

import android.net.Uri;
import android.os.Bundle;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
import com.reactnativenavigation.presentation.OverlayManager;
import com.reactnativenavigation.viewcontrollers.ChildControllersRegistry;
import com.reactnativenavigation.viewcontrollers.modal.ModalStack;
import com.reactnativenavigation.viewcontrollers.navigator.Navigator;
import com.reactnativenavigation.viewcontrollers.navigator.RootPresenter;

import android.content.Intent;

import org.devio.rn.splashscreen.SplashScreen;

import android.content.pm.ActivityInfo;

// import android.content.Intent;
import android.content.res.Configuration;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

//import package

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener; //imagepicker

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);

    }


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    Intent intent = getIntent();
    String action = intent.getAction();
    Uri data = intent.getData();

        Log.i("1", "onCreate KKKKKKKKKKKKK");
        FirebaseDynamicLinks.getInstance()
                .getDynamicLink(getIntent())
                .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
                    @Override
                    public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                        // Get deep link from result (may be null if no link is found)
                        Uri deepLink = null;
                        Log.i("111", "1deepLink --2");
                        if (pendingDynamicLinkData != null) {
                            deepLink = pendingDynamicLinkData.getLink();
                            Log.i("1deepLink", deepLink.toString());

                            String cs = String.valueOf(deepLink.getQueryParameter("utm_source"));
                            String cn = String.valueOf(deepLink.getQueryParameter("utm_campaign"));
                            String cm = String.valueOf(deepLink.getQueryParameter("utm_medium"));
                            Log.i("utm_source", cs);
                            Log.i("utm_campaign", cn);
                            Log.i("utm_medium", cm);


                            if (cs != null && cn != null) {
                                Bundle params = new Bundle();
                                params.putString(FirebaseAnalytics.Param.SOURCE, cs);
                                params.putString(FirebaseAnalytics.Param.MEDIUM, cm);
                                params.putString(FirebaseAnalytics.Param.
                                        CAMPAIGN, cn);
                                FirebaseAnalytics.getInstance(getApplicationContext()).logEvent(FirebaseAnalytics.
                                        Event.CAMPAIGN_DETAILS, params);
                                FirebaseAnalytics.getInstance(getApplicationContext()).logEvent(FirebaseAnalytics.
                                        Event.APP_OPEN, params);
                            }


                            // Handle the deep link. For example, open the linked
                            // content, or apply promotional credit to the user's
                            // account.
                            // ...

                            // ...
                        }
                    }
                    }).addOnFailureListener(this,new OnFailureListener() {
                        @Override
                        public void onFailure (@NonNull Exception e){
                            Log.w("10", "getDynamicLink:onFailure", e);
                        }
                    });



                }


        @Override
        public void onActivityResult ( int requestCode, int resultCode, Intent data){
            // SplashScreen.show(this);

            Log.i("1", "onActivityResult");
            super.onActivityResult(requestCode, resultCode, data);
            MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);

//        FirebaseDynamicLinks.getInstance()
//                .getDynamicLink(getIntent())
//                .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
//                    @Override
//                    public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
//                        // Get deep link from result (may be null if no link is found)
//                        Uri deepLink = null;
//                        if (pendingDynamicLinkData != null) {
//                            deepLink = pendingDynamicLinkData.getLink();
//                        }
//
//                        Log.i("1", deepLink.toString());
//                        // Handle the deep link. For example, open the linked
//                        // content, or apply promotional credit to the user's
//                        // account.
//                        // ...
//
//                        // ...
//                    }
//                })
//                .addOnFailureListener(this, new OnFailureListener() {
//                    @Override
//                    public void onFailure(@NonNull Exception e) {
//                         Log.w("10", "getDynamicLink:onFailure", e);
//                    }
//                });

        }

        //imagepicker code from here
        @Override
        public void setPermissionListener (PermissionListener listener)
        {
            this.listener = listener;
        }

        @Override
        public void onRequestPermissionsResult ( int requestCode, String[] permissions,
        int[] grantResults)
        {
            if (listener != null) {
                listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
            }
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
// to here

    }
