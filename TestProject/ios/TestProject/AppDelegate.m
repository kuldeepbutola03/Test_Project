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
// #import "RNSplashScreen.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
// @import Firebase;
@import GoogleMaps;
#import <Firebase/Firebase.h>

#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
//#import "FIRDynamicLinks"
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyDkXfhEk0aypBfrqKNZj9M02vaHVC46Esk"];
  [FIRApp configure];
  
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  [RNFirebaseNotifications configure];
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];

  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  //[RNSplashScreen show];  
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

  if([[url absoluteString] hasPrefix:@"raajneeti"]){
    return [RCTLinkingManager application:application openURL:url
                 sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  }
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
  
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}
  
-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  
  [[RNFirebaseMessaging instance] didReceiveRemoteNotification:response.notification.request.content.userInfo];
  completionHandler();
}



// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
//- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
//restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
//{
// return [RCTLinkingManager application:application
//                  continueUserActivity:userActivity
//                    restorationHandler:restorationHandler];
//}

 - (BOOL)application:(UIApplication *)application
 continueUserActivity:(nonnull NSUserActivity *)userActivity
  restorationHandler:
 #if defined(__IPHONE_12_0) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_12_0)
 (nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler {
 #else
     (nonnull void (^)(NSArray *_Nullable))restorationHandler {
 #endif  // __IPHONE_12_0
   BOOL handled = [[FIRDynamicLinks dynamicLinks] handleUniversalLink:userActivity.webpageURL
                                                           completion:^(FIRDynamicLink * _Nullable dynamicLink,
                                                                        NSError * _Nullable error) {
                                                             // ...
                                                             NSLog(@"aaaaaa %@",dynamicLink);
                                                           }];
   return handled;
 }
   
//   - (BOOL)application:(UIApplication *)app
// openURL:(NSURL *)url
// options:(NSDictionary<NSString *, id> *)options {
//   return [self application:app
//                    openURL:url
//          sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                 annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
// }
   
//   - (BOOL)application:(UIApplication *)application
// openURL:(NSURL *)url
// sourceApplication:(NSString *)sourceApplication
// annotation:(id)annotation {
//   FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
//
//   if (dynamicLink) {
//     if (dynamicLink.url) {
//       // Handle the deep link. For example, show the deep-linked content,
//       // apply a promotional offer to the user's account or show customized onboarding view.
//       // ...
//     } else {
//       // Dynamic link has empty deep link. This situation will happens if
//       // Firebase Dynamic Links iOS SDK tried to retrieve pending dynamic link,
//       // but pending link is not available for this device/App combination.
//       // At this point you may display default onboarding view.
//     }
//     return YES;
//   }
//   return NO;
// }

@end
