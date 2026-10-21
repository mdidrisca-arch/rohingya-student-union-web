/* Sharing helpers for the report pages (advocacy/reports/...).
   Facebook, WhatsApp, LinkedIn and X are ordinary links in the page, so they work even without JavaScript.
   This file adds the two buttons that need it:
     - "Copy link": copies the report's web address.
     - "Share...": opens the device's own share sheet, shown only on browsers that support it. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* Short message under the buttons; read out by screen readers (aria-live in the page). */
  function say(box, message) {
    var status = box.querySelector('.rp-share-status');
    if (!status) return;
    status.textContent = message;
    clearTimeout(box._shareTimer);
    box._shareTimer = setTimeout(function () { status.textContent = ''; }, 4000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {          /* older browsers */
      try {
        var box = document.createElement('textarea');
        box.value = text;
        box.setAttribute('readonly', '');
        box.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(box);
        box.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(box);
        if (ok) resolve(); else reject(new Error('copy failed'));
      } catch (err) { reject(err); }
    });
  }

  ready(function () {
    Array.prototype.forEach.call(document.querySelectorAll('.rp-share'), function (box) {
      var url = box.getAttribute('data-url');
      var title = box.getAttribute('data-title');
      var copy = box.querySelector('[data-share-copy]');
      var native = box.querySelector('[data-share-native]');

      if (copy) {
        copy.addEventListener('click', function () {
          copyText(url).then(
            function () { say(box, 'Link copied to the clipboard.'); },
            function () { say(box, 'The link could not be copied automatically. It is: ' + url); }
          );
        });
      }
      if (native && typeof navigator.share === 'function') {
        native.hidden = false;
        native.addEventListener('click', function () {
          navigator.share({ title: title, url: url }).catch(function () { /* the person closed the share sheet */ });
        });
      }
    });
  });
})();
