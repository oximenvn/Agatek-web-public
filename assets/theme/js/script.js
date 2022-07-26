function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 82;
  
      if (elementTop <= windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

$(document).ready(function(){
    reveal();
    $('#scrollToTop').click(function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    });
    $(window).scroll(function() {
        let topBtn = document.querySelector("#scrollToTop");
        window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0
        reveal();
        return false;
    });

});

