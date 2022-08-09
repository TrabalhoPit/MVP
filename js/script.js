/*------------------------------------------------------------------------------------------------------*/
//?Barra de Navegação
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 700) {
      $("#second-nav").removeClass("no-see");
      $("#second-nav").css("width", "100%");
      $("#second-nav").fadeIn();
      $("#first-nav").addClass("no-see");
      $("#first-nav").css("width", "50%");
      $("#first-nav").fadeOut();
    } else {
      $("#first-nav").removeClass("no-see");
      $("#first-nav").css("width", "50%") 
      $("#first-nav").fadeIn();
      $("#second-nav").addClass("no-see");
      $("#second-nav").css("width", "50%");
      $("#second-nav").fadeOut();
      // $("#first-nav").addClass("no-see");
    }
});
/*------------------------------------------------------------------------------------------------------*/
//?Scroll Animation

/*------------------------------------------------------------------------------------------------------*/
$(".links").on("click", function() {
    $(".line").hide(350);
    $(".links").removeClass("active");
    $(".links").next().css( "color","#A07B5A");
    $(this).prev().slideToggle().css( "color","black");
    $(this).next().slideToggle().css( "color","#A07B5A")
    $(this).addClass("active");
})