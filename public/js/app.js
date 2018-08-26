if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(reg => {
        if (reg.installing) {
            console.log('Service worker installing');
        } else if(reg.waiting) {
          console.log('Service worker installed');
        } else if(reg.active) {
          console.log('Service worker active');
        }
    }).catch(err => {
        console.log("Registration failde with error: "+err);
    });
}


$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('input[data-length], textarea[data-length]').characterCounter();
    
    $("#search-trigger").on("click", () => {
        $(".nav-wrapper").hide();
        $(".search-wrapper.mobile").removeClass("hide");
    })

    $("#close-search").on("click", () => {
        $(".nav-wrapper").show();
        $(".search-wrapper.mobile").addClass("hide");
    })
});