$(document).delegate("#up", "click", function() {
    window.location = $(this).find("a").attr("href");
 });