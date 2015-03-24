/* app.js */

$(document).ready(function() {

  var coolShowing = false;

  function playIntro() {
    $('.sf-logo').fadeIn(2000, function() {
      $('.sf-logo').delay(1000).fadeOut(1000, function() {
        $('.segue').fadeIn(2000, function() {
          $('.segue').delay(1000).fadeOut(1000, function() {
            $('.jquery-logo').fadeIn(2000, function() {
              $('.jquery-logo').delay(1000).fadeOut(1000, function() {
                $('.instructions').fadeIn(2000);
              });
            });
          });
        });
      });
    });
    
  }

  function playIntro2() {
    $('.sf-logo').animate(
      {'opacity': '1'}, 2000, function() {
      $('.sf-logo').delay(1000).fadeOut(1000, function() {
        $('.segue').fadeIn(2000, function() {
          $('.segue').delay(1000).fadeOut(1000, function() {
            $('.jquery-logo').fadeIn(2000, function() {
              $('.jquery-logo').delay(1000).fadeOut(1000, function() {
                $('.instructions').fadeIn(2000);
              });
            });
          });
        });
      });
    });
    
  }    

  function ryuThrow() {
    // only run throw hadouken animation if NOT holding down x key
    // if (document.querySelector('.ryu-cool').style.visibility = 'hidden') {
    //   alert('ryu-cool not showing now');
    // }

    // clear all animations - in case intro is still running for example
    // $('*').finish();

    // animate ryu
    $(".ryu-ready").hide();
    moveHadouken();
    $(".ryu-throwing").show().animate(
      // not changing opacity, just using this to show ryu-throwing more than instantaneously
      {'opacity': '1'}, 200,
      function() {
        // ryu goes back to his ready position
        $(".ryu-throwing").hide();
        $(".ryu-ready").show();
      });    
  }

  function moveHadouken() {
    playHadouken();
    kapow();
    $('.instructions').hide();
    // show hadouken and animate it to the right of the screen
    $('.hadouken').finish().show().animate(
      {'left': '850px', 'opacity': '0.75'},300,
      function() {
        $(this).hide();
        $(this).css('left', '545px');
        // reset opacity for next throw
        $(this).css('opacity', '1');
        // kapow();
      });
  }  

  function kapow() {
    // first, wait for hadouken to ALMOST reach location of kapow image
    $('.kapow').delay(250).animate(
      // now quickly fade in kapow image
      {'opacity': '1'}, 50,
        function() {
          // now more slowly fade out kapow image
          // .finish() placed here seems to give the best effect for quickly repeated hadouken throws
          $('.kapow').finish().animate(
            {'opacity': '0'}, 500,
              function() {
                // just biding time while image opacity goes to zero
                $('.instructions').delay(250).fadeIn(1250);
          });
    });
  } // end kapow function

  // play hodouken using jQuery
  function playHadouken () {
    $('#hadouken-sound')[0].volume = 0.75;
    $('#hadouken-sound')[0].load();
    $('#hadouken-sound')[0].play();
  }

  function playHadouken2() {
    // play hadouken using straight JS
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
    // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video    
    document.getElementById('hadouken-sound').play();
  }

  function showCool() {
      // alert ('the x key was pressed');

      coolShowing = true;

      // clear all animations
      $('*').finish();

      $('.instructions').hide();
      $('.no-tread').fadeIn(250);
      $('.ryu-still').hide();
      $('.ryu-ready').hide();
      $('.ryu-cool').show();
      $('.bad-ass-sound').show();
      $('.bad-ass-sound').removeClass('.elementHide');
      $('.bad-ass-sound').addClass('.elementShow');
      document.querySelector('.bad-ass-sound').volume="0.5";
      playBadAss();
  }

  function hideCool() {
      // alert ('the x key was pressed');
      coolShowing = false;

      $('.ryu-cool').hide();
      $('.ryu-still').hide();
      $('.ryu-ready').show();
      $('.bad-ass-sound').hide();
      $('.bad-ass-sound').addClass('.elementHide');
      pauseBadAss();
      resetBadAss();
      $('.no-tread').hide();
      $('.instructions').fadeIn(250);
  }  

  function playBadAss() {
    document.querySelector('.bad-ass-sound').play();
  }

  function pauseBadAss() {
    document.querySelector('.bad-ass-sound').pause();    
  }

  function resetBadAss() {
    // reset to beginning of clip
    document.querySelector('.bad-ass-sound').currentTime = 0;
  }

  function hideIntro() {
    $('.sf-logo').hide();
    $('.segue').hide();
    $('.jquery-logo').hide();
  }

  function showDontTread() {
    $('.no-tread').fadeIn(500);
  }  

  // still to ready code
  // NOTE: using chained events following
  $(".ryu").mouseenter(function() {
    // while testing use below line
    // alert('mouse entered .ryu div');
    if (!coolShowing) {
      $(".ryu-still").hide();
      $(".ryu-ready").show();
    }
  })
  .mouseleave(function() {
    if (!coolShowing) {
      $(".ryu-ready").hide();    
      $(".ryu-still").show(); 
    }   
  })
  // skipping .mousedown + .mouseup code in favor of using click
  // NOTE that .click is still in the 'chain' of events
  // .mousedown(function() {
  //   console.log('mousedown');
  //   // play hadouken sound
    
  //   // animate ryu
  //   $(".ryu-ready").hide();
  //   $(".ryu-throwing").show();

  //   // show hadouken and animate it to the right of the screen
  //   throwHadouken();
  // })
  // .mouseup(function() {
  //   console.log('mouseup');
  //   // ryu goes back to his ready position
  //   $(".ryu-throwing").hide();
  //   $(".hadouken").hide();
  //   $(".ryu-ready").show();
  // })
  .on('click', function() {

    // clear all animations
    $('*').finish();

    if (coolShowing) {
      hideCool();
    } else {
        ryuThrow();
    }

  });

  $('.instructions p:nth-child(2)').on('click', function() {
    showCool();
  });

  $('.no-tread').on('click', function() {
    hideCool();
  });

  $('body').keydown(function(whichKey) {
    if (whichKey.which === 88) {
      showCool();
    }
  });

  $('body').keyup(function(whichKey) {
    if (whichKey.which === 88) {
      hideCool();
    }
  });

  playIntro2();

  // code below works with just an initial ryu-still class
  // $(".ryu").mouseenter(function() {
  //   $(".ryu-still").toggleClass("ryu-still ryu-ready");
  // });
  // $(".ryu").mouseleave(function() {
  //       $(".ryu-ready").toggleClass("ryu-still ryu-ready");
  // });

}); // end document.ready

