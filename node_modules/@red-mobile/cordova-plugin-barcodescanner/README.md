# Cordova Plugin BarcodeScanner
================================

Cross-platform BarcodeScanner for Cordova.

## Installation

This requires Cordova@10

    cordova plugin add @red-mobile/cordova-plugin-barcodescanner

Optional variables:
This plugin requires the AndroidX legacy support library v4. Default value is `1.0.0`.  Check out the latest version [here](https://developer.android.com/jetpack/androidx/versions).

```
% cordova plugin add @red-mobile/cordova-plugin-barcodescanner --variable ANDROIDX_LEGACY_SUPPORT_V4_VERSION="1.0.0"
```

### Uninstall

```
% cordova plugin remove cordova-plugin-barcodescanner && npm uninstall @red-mobile/cordova-plugin-barcodescanner
```

### Supported Platforms

- Android

Note: the Android source for this project includes an Android Library Project.
plugman currently doesn't support Library Project refs, so its been
prebuilt as a jar library. Any updates to the Library Project should be
committed with an updated jar.

## Using the plugin ##
The plugin creates the object `cordova.plugins.barcodeScanner` with the method `scan(success, fail)`.

The following barcode types are currently supported:

|  Barcode Type | Android | iOS | Windows  |
|---------------|:-------:|:---:|:--------:|
| QR_CODE       |    ✔    |  ✔  |     ✔    |
| DATA_MATRIX   |    ✔    |  ✔  |     ✔    |
| UPC_A         |    ✔    |  ✔  |     ✔    |
| UPC_E         |    ✔    |  ✔  |     ✔    |
| EAN_8         |    ✔    |  ✔  |     ✔    |
| EAN_13        |    ✔    |  ✔  |     ✔    |
| CODE_39       |    ✔    |  ✔  |     ✔    |
| CODE_93       |    ✔    |  ✔  |     ✔    |
| CODE_128      |    ✔    |  ✔  |     ✔    |
| CODABAR       |    ✔    |  ✖  |     ✔    |
| ITF           |    ✔    |  ✔  |     ✔    |
| RSS14         |    ✔    |  ✖  |     ✔    |
| PDF_417       |    ✔    |  ✔  |     ✔    |
| RSS_EXPANDED  |    ✔    |  ✖  |     ✖    |
| MSI           |    ✖    |  ✖  |     ✔    |
| AZTEC         |    ✔    |  ✔  |     ✔    |

`success` and `fail` are callback functions. Success is passed an object with data, type and cancelled properties. Data is the text representation of the barcode data, type is the type of barcode detected and cancelled is whether or not the user cancelled the scan.

A full example could be:
```js
   cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
```

## Encoding a Barcode ##

The plugin creates the object `cordova.plugins.barcodeScanner` with the method `encode(type, data, success, fail)`.

Supported encoding types:

* TEXT_TYPE
* EMAIL_TYPE
* PHONE_TYPE
* SMS_TYPE

```
A full example could be:

   cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
```

## Thanks on Github ##

So many -- check out the original [iOS](https://github.com/phonegap/phonegap-plugins/tree/DEPRECATED/iOS/BarcodeScanner),  [Android](https://github.com/phonegap/phonegap-plugins/tree/DEPRECATED/Android/BarcodeScanner) and
[BlackBerry 10](https://github.com/blackberry/WebWorks-Community-APIs/tree/master/BB10-Cordova/BarcodeScanner) repos.
