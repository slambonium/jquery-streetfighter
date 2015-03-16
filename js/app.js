/* app.js */

$(document).ready(function() {

  var kapow = function() {
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
          });
    });
  }; // end kapow function  

  var throwHadouken = function() {
    kapow();
    // show hadouken and animate it to the right of the screen
    $('.hadouken').finish().show().animate(
      {'left': '850px', 'opacity': '0.75'},300,
      function() {
        $(this).hide();
        $(this).css('left', '545px');
        // reset opacity for next show
        $(this).css('opacity', '1');
        // kapow();
      });
  };

  // still to ready code
  // NOTE: using mouseenter chained to mouseleave
  $(".ryu").mouseenter(function() {
    // while testing use below line
    // alert('mouse entered .ryu div');

    $(".ryu-still").hide();
    $(".ryu-ready").show();
  })
  .mouseleave(function() {
    $(".ryu-ready").hide();    
    $(".ryu-still").show();    
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
  .click(function() {
    // alert("you just clicked!");

    // animate ryu
    $(".ryu-ready").hide();
    throwHadouken();
    $(".ryu-throwing").show().animate(
      // not changing opacity, just using this to show ryu-throwing more than instantaneously
      {'opacity': '1'}, 200,
      function() {
        // ryu goes back to his ready position
        $(".ryu-throwing").hide();
        $(".ryu-ready").show();
      });

  });

  // code below works with just an initial ryu-still class
  // $(".ryu").mouseenter(function() {
  //   $(".ryu-still").toggleClass("ryu-still ryu-ready");
  // });
  // $(".ryu").mouseleave(function() {
  //       $(".ryu-ready").toggleClass("ryu-still ryu-ready");
  // });

}); // end document.ready

