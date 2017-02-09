/**
 * Created by xhw on 2016/9/10.
 */
/*
var cut=new CutImg($('.srcBox'), $('.tarBox'), $('#tarImg'));
$('#upload').on('change', function (){
    cut.startJcrop('', $('#upload'));
});

$('#btn').on('click', function (){
    cut.drawImage(100,100);
});*/
var cut=new CutImg($('.srcBox'), $('.tarBox'), $('#tarImg'), '', $('#upload'));
$('#btn').on('click', function (){
	var data = cut.drawImage($('#cv'));
	console.log(data);
})