# WalkSafe

> Mobile app on Android and iOS that provides the user crime density heatmap, real time crime updates using SpotCrime API, and many more safety features.


## Table of Contents

1. [Team](#team)
1. [Demo](#demo)
1. [Screenshots](#screenshots)
    1. [iOS Screenshots](#ios-screenshots)
    1. [Android Screenshots](#android-screenshots)
1. [Initial Setup](#initial-setup)
    1. [iOS Setup](#ios-setup)
    1. [Android Setup](#android-setup)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Devices](#installing-devices)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [WalkSafe Server](#walksafe-server)
1. [Contributing](#contributing)


## Team

  - __Product Owner__: Fredy-Edwin Esse
  - __Scrum Master__: Rick Gallegos
  - __Development Team Members__: Sonrisa Chen and Brian Kim

## Demo

View a video of WalkSafe in action [here](https://www.youtube.com/watch?v=R41ELsbPc04)

## Screenshots

### iOS Screenshots

### Android Screenshots

[Landing page](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/85f4ff48731dc9cd3e2bc44c403dcdcc-original.png)

[Heat Map](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/ae2a55c33ed5fe10f4786c633c583a72-original.png)

[Recent Crimes](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/d677a360bdab0935da1c8d5288fd9a72-original.png)

[App Drawer](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/d8572595533d0624134dac4269724f3a-original.png)

## Initial Setup

1. Fork and clone the repo

> __Environment Variables__ WalkSafe requires a Mapbox Access Token to use the Mapbox API on the frontend. We have used the .env package, which allows environment variables to be set easily with the .env file in the root directory of the project. An example of the necessary variables for WalkSafe been provided here in this repo.

> __Backend server and Local Host__ A fair warning when entering in the environmental variables for HOST, PORT, FACEBOOK_URL, and GOOGLE_URL.  These variables should connect to your backend server but emulated Android devices on Android Studio and iOS devices on Xcode run their own local host so setting these environmental variables to route to 127.0.0.1 will have requests that never reach their destination.  Use the appropriate IP address to connect to your WalkSafe Server.

> __NOTE__ Download Xcode and/or Android Studio depending on what platform you want to develop on.

### iOS Setup

2. [Download](https://developer.apple.com/xcode/) and install Xcode
3. [INSTRUCTIONS FOR XCODE HERE]
4. Install dependencies from the root of the repo by running
```sh
npm install
```

5. Link dependencies to iOS code by running
```sh
react-native link
```
> __NOTE__ If this does not work go to the npm module website for each dependency and follow the iOS instructions for manually linking.

6. Start [WalkSafe Server](https://github.com/f-4/WalkSafe-server)
7. Start WalkSafe by running:
```sh
react-native run-ios
```
> __NOTE__ Building and compiling the React Native JavaScript code into Objective C will initially take a couple of minutes.

> __NOTE__ It is important to not have the ios folder nor any of its contents open in your text editor as this may cause the build to fail.

> __NOTE__ [CHANGE ME!!!!!] After making changes in JavaScript code in your text editor double tap R to reload WalkSafe and have it reflect your new changes!  Push Ctrl + M on the screen to open up the menu to enable remote debugging through Chrome. While debugging it is important to have that Chrome tab in the foreground as it will use up a lot of your computer's resources otherwise.

### Android Setup

2. [Download](https://developer.android.com/studio/install.html) and install Android Studio
3. Create a WalkSafe project in Android Studio
4. Click Tools on the toolbar
5. Click Android
6. Click AVD Manager
7. Create a virtual device
8. In Android Virtual Device Manager launch virtual device by double clicking on it
9. Install dependencies from the root of the repo by running
```sh
npm install
```
10. Link dependencies to Android code by running
```sh
react-native link
```
> __NOTE__ If this does not work go to the npm module website for each dependency and follow the Android instructions for manually linking.

11. Start [WalkSafe Server](https://github.com/f-4/WalkSafe-server)
12. Start WalkSafe by running:
```sh
react-native run-android
```

> __NOTE__ Building and compiling the React Native JavaScript code into Java will initially take a couple of minutes.

> __NOTE__ It is important to not have the android folder nor any of its contents open in your text editor as this may cause the build to fail.

> __NOTE__ After making changes in JavaScript code in your text editor double tap R to reload WalkSafe and have it reflect your new changes!  Push Ctrl + M on the screen to open up the menu to enable remote debugging through Chrome. While debugging it is important to have that Chrome tab in the foreground as it will use up a lot of your computer's resources otherwise.

## Requirements

- Node 0.10.x
- React Native 0.47.0
- [WalkSafe Server](https://github.com/f-4/WalkSafe-server)
- [Xcode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio/install.html)

## Development

### Installing Devices

- Install Xcode and/or Android Studio to run WalkSafe
- [Download](https://developer.apple.com/xcode/), install and run Xcode
- [Download](https://developer.android.com/studio/install.html), install and run Android Studio

### Installing Dependencies

From within the root directory:
```sh
npm install
react-native link
```

> __NOTE__ If this does not work go to the npm module website for each dependency and follow the Android and/or iOS instructions for manually linking.

### Roadmap

View the project roadmap [here](https://github.com/f-4/WalkSafe/issues)

## WalkSafe Server Repo

View the WalkSafe server repo
[here](https://github.com/f-4/WalkSafe-server)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
