package com.aureans.raajneeti;

import android.os.Bundle;
import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen; 
import android.content.pm.ActivityInfo;

import android.content.Intent;
import android.content.res.Configuration;
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
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // SplashScreen.show(this);
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);


        
    }

    //imagepicker code from here
    @Override
    public void setPermissionListener(PermissionListener listener)
    {
      this.listener = listener;
    }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  {
    if (listener != null)
    {
      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
// to here

}
