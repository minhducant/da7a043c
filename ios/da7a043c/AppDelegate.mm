#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <Firebase.h>

#import <CodePush/CodePush.h>

#import <AuthenticationServices/AuthenticationServices.h>

#import <SafariServices/SafariServices.h>

#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

#import <GoogleMobileAds/GoogleMobileAds.h>

// #import "RNBootSplash.h"

#import <ZaloSDK/ZaloSDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"da7a043c";
  [FIRApp configure]; //Firebase
  [[ZaloSDK sharedInstance] initializeWithAppId:@"2196458335831676602"]; // Zalo
  [[GADMobileAds sharedInstance] startWithCompletionHandler:nil]; // Admob
  [[FBSDKApplicationDelegate sharedInstance] application:application //FBSDKApplication
                      didFinishLaunchingWithOptions:launchOptions];

  // rootViewController.view = rootView;
  // self.window.rootViewController = rootViewController;
  // [self.window makeKeyAndVisible];
  // [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; name

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [FIRMessaging messaging].APNSToken = deviceToken;
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (BOOL)bridgelessEnabled
{
    return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[ZDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
