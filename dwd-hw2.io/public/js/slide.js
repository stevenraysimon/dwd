// JavaScript Document

$(document).ready(function()
{

	var slideTime = 11000;

/****----------------------------------------------- Project 1 -------------------- Moody Marble -------------------------------******/

$('#slidePhotos').click(function(){
		$('#slideMoody1').off('click');
		calculateTimeout();
	});

	$('#slidePhotos').cycle({

	fx:'fade',
    timeout: slideTime,
	pager:  '#slide-pager',
	speedIn: 700,
    speedOut: 700,

	});

	$('#play').click(function(){

	$('#play').css('color', '#EBB577');
	$('#pause').css('color', '#A54133');
	$('#slidePhotos').cycle('resume');

});

$('#pause').click(function(){

	$('#pause').css('color', '#EBB577');
	$('#play').css('color', '#A54133');
	$('#slidePhotos').cycle('pause');

});

/******************************************************/



});///////////////////////////////////////////////////////Close doc ready
