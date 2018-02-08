// JavaScript Document
$(document).ready(function(){
  $(".blackCover").fadeOut(0);

  var open = 0;
  var anTime = 500;

  $('#menuButton').click(function(){
    //animate the button and open the nav
    if(open == 0){
      $(".blackCover").fadeIn(anTime);
      $('.main_menu').animate({
        left: "+300px"
      }, anTime);
      open = 1;
    } else if (open == 1){
      $(".blackCover").fadeOut(anTime);
      $('.main_menu').animate({
        left: "-300px"
      }, anTime);
      open = 0;
    }
  });//Click menuButton

  $('.blackCover').click(function(){
    $(".blackCover").fadeOut(anTime);
    $('.main_menu').animate({
      left: "-300px"
    }, anTime);
    open = 0;
  });//Click off


  $("#mapLinkOne").click(function(){
    $("#mapOne").fadeIn('fast');
    return false;
  });

  $("#mapLinkTwo").click(function(){
    $("#mapOne").fadeOut('fast');
    return false;
  });

  $('#directions').click(function (){
    $(".blackCover").fadeOut(anTime);
    $('.main_menu').animate({
      left: "-300px"
    }, anTime);
    open = 0;
    $('.main_menu').promise().done(function(){
      scrollToAnchor('directions_scrollTo');
      return false;
    });
  });

  $('#about').click(function (){
    $(".blackCover").fadeOut(anTime);
    $('.main_menu').animate({
      left: "-300px"
    }, anTime);
    open = 0;
    $('.main_menu').promise().done(function(){
      scrollToAnchor('about_scrollTo');
      return false;
    });
  });

  $('#dates').click(function (){
    $(".blackCover").fadeOut(anTime);
    $('.main_menu').animate({
      left: "-300px"
    }, anTime);
    open = 0;
    $('.main_menu').promise().done(function(){
      scrollToAnchor('dates_scrollTo');
      return false;
    });
  });

  $('#rsvp').click(function (){
    $(".blackCover").fadeOut(anTime);
    $('.main_menu').animate({
      left: "-300px"
    }, anTime);
    open = 0;
    $('.main_menu').promise().done(function(){
      scrollToAnchor('rsvp_scrollTo');
      return false;
    });
  });



}); //Close Doc ready

function scrollToAnchor(idName){
    var aTag = $("a[name='"+ idName +"']");
    $('html,body').animate({scrollTop: aTag.offset().top-100},'slow');
}
