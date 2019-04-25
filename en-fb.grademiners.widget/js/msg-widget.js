"use strict";

var i = $('.dialogs').length;
var count = 1;

for (i; i <= 12; i++) {
  (function () {
    setTimeout(function () {
      var countIndex = '#index-' + count++;
      $(countIndex).fadeIn(200);
      $('.msg-chat__screen-dialogs').animate({
        scrollTop: $(countIndex).offset().top
      }, 300);
    }, 2000 * i);
  })(i);
}