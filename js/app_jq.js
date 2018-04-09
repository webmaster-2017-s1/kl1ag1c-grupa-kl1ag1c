// kod projektu Wyścig samochodowy

   //zmienne
   var container = $('#container');
   var auto = $('#auto-gracza');
   var auto1 = $('#auto1');
   var auto2 = $('#auto2');
   var auto3 = $('#auto3');
   var linia1 = $('#linia1');
   var linia2 = $('#linia2');
   var linia3 = $('#linia3');
   var restartdiv = $('#restart-div');
   var restartbtn = $('#restart');
   var wynik = $('#wynik');

   //start - początkowa konfiguracja
   var container_left = parseInt(container.css('left'));
   var container_width = parseInt(container.width());
   var container_height = parseInt(container.height());
   var auto_width = parseInt(auto.width());
   var auto_height = parseInt(auto.height());


   var game_over = false;

   var wynik_counter = 1;

   var speed = 2;
   var linia_speed = 5;

   var move_right = false;
   var move_left = false;
   var move_up = false;
   var move_down = false;

$(document).ready(function(){

  //poruszanie się
  $(document).on('keydown', function(e) {
      if (game_over === false) {
          var key = e.keyCode;
          if (key === 37 && move_left === false) {
              move_left = requestAnimationFrame(left);
          } else if (key === 39 && move_right === false) {
              move_right = requestAnimationFrame(right);
          } else if (key === 38 && move_up === false) {
              move_up = requestAnimationFrame(up);
          } else if (key === 40 && move_down === false) {
              move_down = requestAnimationFrame(down);
          }
      }
  });
  $(document).on('keyup', function(e) {
    if (game_over === false) {
        var key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(move_left);
            move_left = false;
          } else if (key === 39) {
            cancelAnimationFrame(move_right);
            move_right = false;
          } else if (key === 38) {
            cancelAnimationFrame(move_up);
            move_up = false;
          } else if (key === 40) {
            cancelAnimationFrame(move_down);
            move_down = false;
          }
        }
  });

  function left() {
    if (game_over === false && parseInt(auto.css('left')) > 0) {
        auto.css('left', parseInt(auto.css('left')) - 5);
        move_left = requestAnimationFrame(left);
      }
    }

  function right() {
    if (game_over === false && parseInt(auto.css('left')) < container_width - auto_width) {
        auto.css('left', parseInt(auto.css('left')) + 5);
        move_right = requestAnimationFrame(right);
      }
    }

  function up() {
    if (game_over === false && parseInt(auto.css('top')) > 0) {
        auto.css('top', parseInt(auto.css('top')) - 3);
        move_up = requestAnimationFrame(up);
      }
    }

  function down() {
    if (game_over === false && parseInt(auto.css('top')) < container_height - auto_height) {
       auto.css('top', parseInt(auto.css('top')) + 3);
       move_down = requestAnimationFrame(down);
     }
   }
});

//poruszanie się aut i linii
   var animacja = requestAnimationFrame(repeat);

   function repeat() {

       if (collision(auto, auto1) || collision(auto, auto2) || collision(auto, auto3)) {
           stop_the_game();
           return;
       }

       wynik_counter++;

       if (wynik_counter % 20 == 0) {
           wynik.text(parseInt(wynik.text()) + 1);
       }
       if (wynik_counter % 500 == 0) {
           speed++;
           linia_speed++;
       }

       auto_down(auto1);
       auto_down(auto2);
       auto_down(auto3);

       linia_down(linia1);
       linia_down(linia2);
       linia_down(linia3);

       var animacja = requestAnimationFrame(repeat);
   }

   function auto_down(auto) {
       var auto_current_top = parseInt(auto.css('top'));
       if (auto_current_top > container_height) {
           auto_current_top = -200;
           var auto_left = parseInt(Math.random() * (container_width - auto_width));
           auto.css('left', auto_left);
       }
       auto.css('top', auto_current_top + speed);
   }

   function linia_down(linia) {
       var linia_current_top = parseInt(linia.css('top'));
       if (linia_current_top > container_height) {
           linia_current_top = -300;
       }
       linia.css('top', linia_current_top + linia_speed);
   }

   restartbtn.click(function() {
       location.reload();
   });

   function stop_the_game() {
       game_over = true;
       cancelAnimationFrame(animacja);
       cancelAnimationFrame(move_right);
       cancelAnimationFrame(move_left);
       cancelAnimationFrame(move_up);
       cancelAnimationFrame(move_down);
       restartdiv.slideDown();
       restartbtn.focus();
}

function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
      }
