/**
 * Created by xhw on 2016/9/10.
 */

/*var $tarImg=$('#tarImg');
 var $srcImg=null;
 var xsize=$('.tarBox').width();
 var ysize=$('.tarBox').height();
 var boundx;
 var boundy;
 var x;
 var y;
 var w;
 var h;


 function startJcrop(url, sClass){
 $srcImg=$('<img id="srcImg" class="'+sClass+'" src="'+url+'"/>');
 $('.srcBox').empty().html($srcImg);
 $('#tarImg').attr('src', url);
 $srcImg.Jcrop({
 aspectRatio : 1,
 onChange: showCoords,
 onSelect: showCoords
 }, function (){
 var bounds = this.getBounds();
 boundx = bounds[0];
 boundy = bounds[1];
 });
 }


 function showCoords(c)
 {
 if (parseInt(c.w) > 0)
 {
 var rx = xsize / c.w;
 var ry = ysize / c.h;

 $tarImg.css({
 width: Math.round(rx * boundx) + 'px',
 height: Math.round(ry * boundy) + 'px',
 marginLeft: '-' + Math.round(rx * c.x) + 'px',
 marginTop: '-' + Math.round(ry * c.y) + 'px'
 });
 }
 x=c.x
 y=c.y;
 w=c.w;
 h=c.h;
 }

 function drawImage(){
 var $cv=$('<canvas></canvas>');
 var pic=document.getElementById('srcImg');
 var ctx=$cv[0].getContext('2d');

 ctx.clearRect(0,0,100,100);
 ctx.drawImage(pic, (x/boundx)*pic.naturalWidth, (y/boundy)*pic.naturalHeight, (w/boundx)*pic.naturalWidth, (h/boundy)*pic.naturalHeight, 0, 0, 100, 100);

 var data=$cv[0].toDataURL();
 var idx=data.indexOf(',');
 var data2=data.substring(idx+1);
 console.log(data);
 }*/

function CutImg(srcBox, tarBox, tarImg, sClass, upload) {
    this.$tarImg = tarImg;
    this.$srcImg = null;
    this.$srcBox = srcBox;
    this.xsize = tarBox.width();
    this.ysize = tarBox.height();
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;
    this.boundx = null;
    this.boundy = null;
    this.sClass=sClass;
    this.$upload=upload;
    this.init();
}

CutImg.prototype = {
    init: function () {
        var that = this;
        that.$upload.on('change', function (){
            var url=URL.createObjectURL($(this)[0].files[0]);
            that.$srcImg = $('<img id="srcImg" class="' + that.sClass + '" src="' + url + '"/>');
            that.$srcBox.empty().html(that.$srcImg);
            that.$tarImg.attr('src', url);
            
            var file = new FileReader();
            file.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    var scale=img.width/img.height;
                    that.jcrop(scale);
                };
            };
            file.readAsDataURL($(this)[0].files[0]);
        });
    },
    jcrop: function (scale) {
        var that = this;
        var select=null;
        if (scale>1){
            $('#defaultImg').css({
                'width':'100%',
                'height':'auto'
            });
            select=[(590-100*scale)/2, (590/scale-100)/2, (590-100*scale)/2+100, (590/scale-100)/2+100];
        } else {
            $('#defaultImg').css({
                'width':'auto',
                'height':'100%'
            });
            select=[(332*scale-100)/2,(332-100/scale)/2,(332*scale-100)/2+100,(332-100/scale)/2+100]
        }
        that.$srcImg.Jcrop({
            aspectRatio: scale,
            setSelect: select,
            onChange: showCoords,
            onSelect: showCoords
        }, function () {
            var bounds = this.getBounds();
            that.boundx = bounds[0];
            that.boundy = bounds[1];
            console.log(this.getBounds())
        });

        

        $('.jcrop-holder').css({
            left:'50%',
            top:'50%',
            marginLeft: -(that.boundx/2)+'px',
            marginTop:-(that.boundy/2)+'px'
        });
        function showCoords(c) {
            if (parseInt(c.w) > 0) {
                var rx = that.xsize / c.w;
                var ry = that.ysize / c.h;
                that.$tarImg.css({
                    width: Math.round(rx * $('.jcrop-holder').width()) + 'px',
                    height: Math.round(ry * $('.jcrop-holder').height()) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });
            }
            that.x = c.x
            that.y = c.y;
            that.w = c.w;
            that.h = c.h;
        }
    },
    drawImage: function ($cv) {
        var that = this;
        //var $cv = $('<canvas></canvas>');
        
        var pic = document.getElementById('srcImg');
        
        var nW=(that.w / that.boundx) * pic.naturalWidth;
        var nH=(that.h / that.boundy) * pic.naturalHeight;
        $cv[0].width = nW;
        $cv[0].height = nH;
        console.log($cv);
        var ctx = $cv[0].getContext('2d');
        
        //ctx.clearRect(0, 0, (that.w / that.boundx) * pic.naturalWidth, (that.h / that.boundy) * pic.naturalHeight);
        ctx.drawImage(pic, (that.x / that.boundx) * pic.naturalWidth, (that.y / that.boundy) * pic.naturalHeight, nW, nH, 0, 0, nW,nH);
        //ctx.drawImage(pic,(that.x / that.boundx) * pic.naturalWidth, (that.y / that.boundy) * pic.naturalHeight,300,700,0,0,300,700);

        var data = $cv[0].toDataURL();
        return data;

    }
};
