/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import "RNSplashScreen.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyDkXfhEk0aypBfrqKNZj9M02vaHVC46Esk"];

  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];

  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  [RNSplashScreen show];  
  return YES;
}

//  AppDelegate.m


// - (BOOL)application:(UIApplication *)application
//     didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//
//   [[FBSDKApplicationDelegate sharedInstance] application:application
//     didFinishLaunchingWithOptions:launchOptions];
//   // Add any custom logic here.
//   return YES;
// }

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}


// - (BOOL)application:(UIApplication *)application
//             openURL:(NSURL *)url
//   sourceApplication:(NSString *)sourceApplication
//          annotation:(id)annotation {
//
//   BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
//     openURL:url
//     sourceApplication:sourceApplication
//     annotation:annotation
//   ];
//   // Add any custom logic here.
//   return handled;
// }


@end
