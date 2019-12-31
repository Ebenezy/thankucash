var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene2');
var parallax = new Parallax(scene2);


(function($) {
    $.fn.ezslide = function ( options ) {
    var defaults = {
            fadeIn  : 1000,
            fadeOut : 1000,
            delay   : 500
        },
        settings = $.extend( defaults, options ),
        $this = this,
        cur = 0,
        fadeIt = function( which ) {
            var layer = $this.find('layer');
            
            cur = which = (which >= layer.length) ? 0 : which;
                
            layer.fadeOut( settings.fadeOut );
            layer.eq( which )
              .delay( settings.fadeOut )
              .fadeIn( settings.fadeIn, function(){
                setTimeout(function() { 
                    cur++;
                    fadeIt( cur ); 
                }, settings.delay);
            });
            
        };
    
    fadeIt( cur );
};

$('ul.scene').ezslide({
    fadeIn  : 600,
    fadeOut : 600,
    delay   : 3000
});
})(jQuery);

