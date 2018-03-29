---
layout: post
title:  "Unity with Google Cardboard to iOS Tips"
date:   2017-06-15 14:01:32 +0200
categories: docker
---

Unity with Google Cardboard to iOS  
1) Disable BitCode  
2) Add Security.framework to the bundle by link to library (and CoreText.framework if not there)  
3) In the Info set either  
-Application supports iTunes file sharing : YES  
-UIFileSharingEnabled : YES  

// USUALLY NOT NEEDED cause CardboardSDK.bundle already in the project  
4) Go to File > Add File to Unity-iPhone.... Select the CardboardSDK.bundle file in [your Unity project]/Assets/Plugins/iOS. Click Add.  