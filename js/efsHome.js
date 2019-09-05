$(document).ready(function(){
  var deviceWidth = $(window).width();
  var deviceHeight = $(window).height();

  console.log(deviceWidth);
  var s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false
  });

  if(deviceWidth <= 500){
    s.destroy();
  }

  if(getBrowserName() == "Safari"){
    s.destroy();
    $("#linesMenuId").hide();
    $("#menuOverlay, #videoSection, #videoSection > div:first-of-type, #videoOverlap, .bgImgSection").css("height", deviceHeight+"px");
    $("#emailSpan , #mobileSpan").css("margin-top", (deviceHeight/2)+"px");
  }

  $(window).scroll(function() {
    if ($(document).scrollTop() > 250) {
      $("header").addClass("backgroundHeader");
    } else {
      $("header").removeClass("backgroundHeader");
    }
  });

    /*   AUDIO VIDEO PLAY PAUSE AND MUTE FUNCTIONALITIES */
    //var video1 = videojs("mediaVideo");
    var videoElement = videojs("mediaVideo", {controls: true, autoplay: true, preload: 'auto', textTrackSettings: false});
    //document.getElementById("mediaVideo");
    var audioElement = document.getElementById("mediaAudio");
    /*  audioElement.muted = false;*/
    $("#videoPlayPause").on("click tap", function(){
      if(videoElement.paused() == true){
        videoElement.play();
        audioElement.play();
        $(this).css("background-image", "url('assets/images/pause-button.png')");
      }
      else{
        videoElement.pause( );
        audioElement.pause();
        $(this).css("background-image", "url('assets/images/play-button.png')");
      }
    });

    $("#audioPlayPause").on("click tap", function(){
      if(audioElement.muted == true){
        audioElement.muted = false;
        $(this).css("background-image", "url('assets/images/reduced-volume.png')");
      }
      else{
        audioElement.muted = true;
        $(this).css("background-image", "url('assets/images/volume-off.png')");
      }
    });

  $("#menuButton").on("click tap", function(){
    $("#menuOverlay").fadeIn();
  });

  $(".closeButton img").on("click tap", function(){
    $("#menuOverlay").fadeOut();
  });

  $(".menuItems > nav a").on("click tap", function(){
    var clickedAnchor = $(this);
    var targetSection = $(this).attr("data-targetSection");
    $("#menuOverlay").fadeOut(function(){
      $("#"+targetSection+"> .bgImgDivOuter").velocity("scroll", {duration: 1000, easing: "swing"}).trigger("click");
    });


  });

  /* IMPLEMENTING THE ONCLICK FOR EACH CONTENT SECTION */
  $(".bgImgDivOuter").on("click tap", function(){
    var element = $(this);
    element.velocity({scale: [1, 0.9]}, {duration: 1500});
    setTimeout(function(){
      element.parent().next().show();
      element.parent().next().velocity("scroll", {duration: 2000});
      element.parent().css("margin-top", "1em");
      element.unbind("click").unbind("tap");
      element.children().attr("data-bottom-top","transform: translateY(0%)");
      element.children().attr("data-top-bottom","transform: translateY(0%)");
      s.refresh();
    }, 2000);
  });


  /* IMPLEMENTING FUNCTIONALITY FOR DOWN ARROW */
  $(".downArrow > div").on("click", function(){
    var element = $(this).closest("section").next();
    element.next().velocity("scroll", {duration: 1000, mobileHA: true});
    s.refresh();
  });


  /* MENU FLOWER ANIMATION */
  $("#menuFlower").on("mouseenter", function(){
    $(".svgAnimationFlower").velocity({scaleX: [0, 1], scaleY: [0, 1]}, {duration: 400});
    $(".linesMenu").velocity({scaleX: [1, 0], scaleY: [1, 0]}, {duration: 500});
  }).on("mouseleave", function(){
    $(".svgAnimationFlower, .linesMenu").velocity("stop").velocity("finish");
    $(".svgAnimationFlower").velocity({scaleX: [1, 0], scaleY: [1, 0]}, {duration: 400});
    $(".linesMenu").velocity({scaleX: [0, 1], scaleY: [0, 1]}, {duration: 300});
  });

  $("#menuFlower").trigger('mouseenter');
        setTimeout(function(){
            $("#menuFlower").trigger('mouseleave')
        }, 1500);


  function getBrowserName(){
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browserName  = navigator.appName;
      var nameOffset,verOffset;

      // In Opera, the true version is after "Opera" or after "Version"
      if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
       browserName = "Opera";
      }
      // In MSIE, the true version is after "MSIE" in userAgent
      else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
       browserName = "MSIE";
      }
      // In Chrome, the true version is after "Chrome"
      else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
       browserName = "Chrome";
      }
      // In Safari, the true version is after "Safari" or after "Version"
      else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
       browserName = "Safari";
      }
      // In Firefox, the true version is after "Firefox"
      else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
       browserName = "Firefox";
      }
      // In most other browsers, "name/version" is at the end of userAgent
      else if ((nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')))
      {
       browserName = nAgt.substring(nameOffset,verOffset);
       fullVersion = nAgt.substring(verOffset+1);
       if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
       }
      }

      return browserName;

  }

});
