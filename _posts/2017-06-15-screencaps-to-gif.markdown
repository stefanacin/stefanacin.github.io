---
layout: post
title:  "Screencaps to Gif"
date:   2017-06-15 14:01:32 +0200
categories: git
---

{% highlight bash linenos %}
# brew install ffmpeg gifsicle
mkdir pngs 
ffmpeg -i src.mov -r 10 pngs/out%04d.png  
mkdir gifs
sips -s format gif pngs/*.png --out gifs
gifsicle --optimize=3 --delay=5 --loopcount gifs/*.gif > animation.gif
gifsicle gifs/*.gif --optimize=3 --delay=3 --loopcount --resize 350x667 > animation-small.gif
rm -rf pngs gifs
{% endhighlight %}
