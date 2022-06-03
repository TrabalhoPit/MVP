$(".links").on("click", function() {
    $(".line").hide();
    $(".links").removeClass("active");
    $(this).next().slideToggle();
    $(this).addClass("active");
})