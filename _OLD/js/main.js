// Konami
// check to make sure that the browser can handle window.addEventListener
if (window.addEventListener) {
    // create the keys and konami variables
    var keys = [],
        konami = "38,38,40,40,37,39,37,39,66,65";
    
    // bind the keydown event to the Konami function
    window.addEventListener("keydown", function(e){
        // push the keycode to the 'keys' array
        keys.push(e.keyCode);
        
        // and check to see if the user has entered the Konami code
        if (keys.toString().indexOf(konami) >= 0) {
            // do something such as:
            window.location.href = "jp/index.html";

            
            // and finally clean up the keys array
            keys = [];
        };
    }, true);
};

// Google Analytics: change UA-XXXXX-X to be your site's ID.
// (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
// function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
// e=o.createElement(i);r=o.getElementsByTagName(i)[0];
// e.src='//www.google-analytics.com/analytics.js';
// r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
// ga('create','UA-XXXXX-X');ga('send','pageview');