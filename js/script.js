/*------------------------------------------------------------------------------------------------------*/
//?Barra de Navegação
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 750) { // 140 é a distancia que vc rola antes da logo sumir
      $("#cabeca").css("width", "100%")
      $("#cabeca").fadeOut();
    } else {
      $("#cabeca").css("width", "50%") 
      $("#cabeca").fadeIn();
    }
  });
/*------------------------------------------------------------------------------------------------------*/
//?Scroll Animation

/*------------------------------------------------------------------------------------------------------*/
$(".links").on("click", function() {
    $(".line").hide();
    $(".links").removeClass("active");
    $(this).next().slideToggle();
    $(this).addClass("active");
})