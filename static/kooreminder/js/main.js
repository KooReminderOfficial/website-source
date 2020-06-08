$(document).ready(function () {
        $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('.pushpin').pushpin();
});

$('.sidenav li').click(() => {
  $('.sidenav').sidenav('close');
})

$(document).ready(function(){
  $('.slider').slider({
    indicators: false
  });
});

$(function() {
  var rotation = 0,
      scrollLoc = $(document).scrollTop();
  $(window).scroll(function() {
      var newLoc = $(document).scrollTop();
      var diff = scrollLoc - newLoc;
      rotation += diff, scrollLoc = newLoc;
      var rotationStr = "rotate(" + rotation + "deg)";
      $(".rotate").css({
          "-webkit-transform": rotationStr,
          "-moz-transform": rotationStr,
          "transform": rotationStr
      });
  });

})

$(document).ready(function(){
  $('.materialboxed').materialbox();
});

$(document).ready(function(){
  $('.tooltipped').tooltip();
});