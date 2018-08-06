chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('home.html', {
    innerBounds: {
      width: 400,
      height: 200
    },
    id: "USB-Sample2"
  });
});

