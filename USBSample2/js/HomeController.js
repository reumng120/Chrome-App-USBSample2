'use strict';

const VENDOR_ID = 2424;
const PRODUCT_ID = 520;
const DEVICE_INFO = {"vendorId": VENDOR_ID, "productId": PRODUCT_ID};
const permissionObj = { permissions: [{ 'usbDevices': [DEVICE_INFO] }] };

var mReqPermissionButton;
var mResult;

addLoadEvent(loadHomeController);

function loadHomeController() {
  mResult = document.getElementById("resultStr");
  mReqPermissionButton = document.getElementById("reqPermission");
  mReqPermissionButton.addEventListener('click', onReqPermission);
  chrome.permissions.contains(permissionObj, function (result) {
    if (result) {
      devPermissionHandle();
    } else {
      console.log('App was not granted the "usbDevices" permission in contains.');
    }
  });
}

function onReqPermission() {
  chrome.permissions.request(permissionObj, function (result) {
    if (result) {
      devPermissionHandle();
    } else {
      console.log('App was not granted the "usbDevices" permission.');
    }
  });
}

function devPermissionHandle() {
  console.log('App was granted the "usbDevices" permission.');
  //Find Device
  chrome.usb.getDevices(DEVICE_INFO, onDeviceFound);
};

function onDeviceFound(devices) {
  console.log(devices);
  if (devices.length > 0) {
    console.log("Device(s) found: " + devices.length);
    console.log("Device(s) vendorId: " + devices[0].vendorId);
    console.log("Device(s) productId: " + devices[0].productId);
    //Open Device
    chrome.usb.openDevice(devices[0], onOpenCallback);
  } else {
    console.log("Device could not be found");
  }
}

function onOpenCallback(connection) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  }
  if (connection) {
    let msg = "Device VID=" + connection.vendorId + ", PID=" + connection.productId + " is opened.";
    console.log(msg);
    mResult.innerHTML = msg;
  } else {
    console.log("Device failed to open.");
  }
};

