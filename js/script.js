(function () {
    var $;
    $ = this.jQuery || window.jQuery;
    win = $(window), body = $('body'), doc = $(document);

    $.fn.hc_accordion = function () {
        var acd = $(this);
        // acd.find('ul>li').each(function (index, el) {
        //     if ($(el).find('ul li').length > 0) $(el).prepend('<button type="button" class="acd-drop"></button>');
        // });
        acd.on('click', '.acd-drop', function (e) {
            e.preventDefault();
            var ul = $(this).nextAll("ul");
            if (ul.is(":hidden") === true) {
                ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
                ul.parent('li').parent('ul').children('li').children('.acd-drop').removeClass("active");
                $(this).addClass("active");
                ul.slideDown(180);
            } else {
                $(this).removeClass("active");
                ul.slideUp(180);
            }
        });
    }

    $.fn.hc_menu = function (options) {
        var settings = $.extend({
            open: '.open-mnav',
        }, options),
            this_ = $(this);
        var m_nav = $('.m-nav');
        var m_nav_over = $('<div class="m-nav-over"></div>');
        body.append(m_nav);
        body.append(m_nav_over);

        console.log("mnav_open")
        m_nav.find('.m-nav-close').click(function (e) {
            e.preventDefault();
            mnav_close();
        });
        // m_nav.find('.nav-ct').append($('.logo').clone());
        // m_nav.find('.nav-ct').append(this_.children().clone());
        /*m_nav.find('.nav-ct').append($('.control-header').clone());*/

        var mnav_open = function () {
            console.log("mnav_open")
            m_nav.addClass('active');
            m_nav_over.addClass('active');
            body.css('overflow', 'hidden');
        }
        var mnav_close = function () {
            m_nav.removeClass('active');
            m_nav_over.removeClass('active');
            body.css('overflow', '');
        }

        doc.on('click', settings.open, function (e) {
            console.log("open")
            e.preventDefault();
            if (win.width() <= 1199) mnav_open();
        }).on('click', '.m-nav-over', function (e) {
            e.preventDefault();
            mnav_close();
        });

        m_nav.hc_accordion();
    }

    $.fn.hc_upload = function (options) {
        var settings = $.extend({
            multiple: false,
            result: '.hc-upload-pane',
        }, options),
            this_ = $(this);

        var input_name = this_.attr('name');
        this_.removeAttr('name');

        this_.change(function (e) {
            if ($(settings.result).length > 0) {
                var files = event.target.files;
                if (settings.multiple) {
                    for (var i = 0, files_len = files.length; i < files_len; i++) {
                        var path = URL.createObjectURL(files[i]);
                        var name = files[i].name;
                        var size = Math.round(files[i].size / 1024 / 1024 * 100) / 100;
                        var type = files[i].type.slice(files[i].type.indexOf('/') + 1);

                        var img = $('<img src="' + path + '">');
                        var input = $('<input type="hidden" name="' + input_name + '[]"' +
                            '" value="' + path +
                            '" data-name="' + name +
                            '" data-size="' + size +
                            '" data-type="' + type +
                            '" data-path="' + path +
                            '">');
                        var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img).append(input);
                        $(settings.result).append(elm);
                    }
                } else {
                    var path = URL.createObjectURL(files[0]);
                    var img = $('<img src="' + path + '">');
                    var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img);
                    $(settings.result).html(elm);
                }
            }
        });

        body.on('click', '.hc-upload .hc-del', function (e) {
            e.preventDefault();
            this_.val('');
            $(this).closest('.hc-upload').remove();
        });
    }

    $('.d-nav').hc_menu({
        open: '.open-mnav',
    })
    $('.drop').each(function () {
        var this_ = $(this);
        var label = this_.children('.label');
        var ct = this_.children('ul');
        var item = ct.children('li').children('a.drop-item');

        this_.click(function () {
            ct.slideToggle(150);
            label.toggleClass('active');

        });

        item.click(function (e) {
            //e.preventDefault();
            label.html($(this).html());
        });

        win.click(function (e) {
            if (this_.has(e.target).length == 0 && !this_.is(e.target)) {
                this_.children('ul').slideUp(150);
                label.removeClass('active');
            }
        })
    });

    /**
     * Show and hide answer of FAQ
     */
    $(".faq .wrapper-toggle .column-half .toggle-item h4.header span").click(function (e) {
        // console.log(this.outerText)
        if (this.outerText === "+") {
            this.innerHTML = '-'
            let content = $(this).closest('.toggle-item').find('div.content')
            // content.css("display","block")
            content.slideToggle(200);
        }else{
            this.innerHTML = '+'
            let content = $(this).closest('.toggle-item').find('div.content')
            // content.css("display","none")
            content.slideToggle(200);
        }
    })
    /**
     * footer menu
    */
    $('.ft-item .title').click(function (event) {
        $(this).next('.link-ft').stop().slideToggle();
        $(this).children('i').toggleClass('fa-angle-down fa-angle-up');
    });
}).call(this);

// window.onload=function(){
//     if ($('.cas-new-banner').length) {
//         console.log("asdasdasd")
//         $('.cas-new-banner').slick({
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             dots: false,
//             arrows: false,
//             autoplay: true,
//             autoplaySpeed: 6000,
//             swipeToSlide: true,
//             infinite: true,
//             speed: 1000,
//             vertical: true,
//             draggable: false,
//         })
//     }
//     $('.slider').slick({
//         autoplay: true,
//         autoplaySpeed: 1500,
//         arrows: true,
//         prevArrow: '<button type="button" class="slick-prev"></button>',
//         nextArrow: '<button type="button" class="slick-next"></button>',
//         centerMode: true,
//         slidesToShow: 3,
//         slidesToScroll: 2
//     });
      
//   };
  


// jQuery(function ($) {
//     var win = $(window),
//         body = $('body'),
//         doc = $(document);

//     var FU = {
//         get_Ytid: function (url) {
//             var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
//             if (url) var arr = url.match(rx);
//             if (arr) return arr[1];
//         },
//         get_currency: function (str) {
//             if (str) return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//         },
//         animate: function (elems) {
//             var animEndEv = 'webkitAnimationEnd animationend';
//             elems.each(function () {
//                 var $this = $(this),
//                     $animationType = $this.data('animation');
//                 $this.addClass($animationType).one(animEndEv, function () {
//                     $this.removeClass($animationType);
//                 });
//             });
//         },
//     };

//     var UI = {
//         mMenu: function () {

//         },
//         header: function () {
//             var elm = $('header'),
//                 h = elm.innerHeight(),
//                 offset = 200,
//                 mOffset = 0;
//             var fixed = function () {
//                 elm.addClass('fixed');
//                 body.css('margin-top', h);
//             }
//             var unfixed = function () {
//                 elm.removeClass('fixed');
//                 body.css('margin-top', '');
//             }
//             var Mfixed = function () {
//                 elm.addClass('m-fixed');
//                 body.css('margin-top', h);
//             }
//             var unMfixed = function () {
//                 elm.removeClass('m-fixed');
//                 body.css('margin-top', '');
//             }
//             if (win.width() > 991) {
//                 win.scrollTop() > offset ? fixed() : unfixed();
//             } else {
//                 win.scrollTop() > mOffset ? Mfixed() : unMfixed();
//             }
//             win.scroll(function (e) {
//                 if (win.width() > 991) {
//                     win.scrollTop() > offset ? fixed() : unfixed();
//                 } else {
//                     win.scrollTop() > mOffset ? Mfixed() : unMfixed();
//                 }
//             });
//         },
//         backTop: function () {
//             var back_top = $('.back-to-top'),
//                 offset = 800;

//             back_top.click(function () {
//                 $("html, body").animate({ scrollTop: 0 }, 800);
//                 return false;
//             });

//             if (win.scrollTop() > offset) {
//                 back_top.fadeIn(200);
//             }

//             win.scroll(function () {
//                 if (win.scrollTop() > offset) back_top.fadeIn(200);
//                 else back_top.fadeOut(200);
//             });
//         },
//         slider: function () {
//             /*$('.slider-cas').slick({
//                 nextArrow: '<img src="images/next.png" class="next" alt="Next">',
//                 prevArrow: '<img src="images/prev.png" class="prev" alt="Prev">',
//             })
//             FU.animate($(".slider-cas .slick-current [data-animation ^= 'animated']"));
//             $('.slider-cas').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//                 if(currentSlide!=nextSlide){
//                     var aniElm = $(this).find('.slick-slide').find("[data-animation ^= 'animated']");
//                     FU.animate(aniElm);
//                 }
//             });*/
//             $('.cas-home').slick({
//                 autoplay: true,
//                 speed: 2000,
//                 autoplaySpeed: 5000,
//                 pauseOnHover: false,
//                 swipeToSlide: true,
//                 fade: true,
//                 // nextArrow: '<i class="fa fa-angle-right smooth next"></i>',
//                 // prevArrow: '<i class="fa fa-angle-left smooth prev"></i>',
//                 arrows: false,
//                 dots: false,
//             })
//             FU.animate($(".cas-home .slick-current [data-animation ^= 'animated']"));
//             $('.cas-home').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//                 if (currentSlide != nextSlide) {
//                     var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
//                     FU.animate(aniElm);
//                 }
//             });
//             if ($('.cas-banner-ld').length) {
//                 $('.cas-banner-ld').slick({
//                     autoplay: false,
//                     speed: 1500,
//                     autoplaySpeed: 8000,
//                     pauseOnHover: false,
//                     swipeToSlide: true,
//                     fade: true,
//                     // nextArrow: '<i class="fa fa-angle-right smooth next"></i>',
//                     // prevArrow: '<i class="fa fa-angle-left smooth prev"></i>',
//                     arrows: false,
//                     dots: true,
//                 })
//                 FU.animate($(".cas-banner-ld .slick-current [data-animation ^= 'animated']"));
//                 $('.cas-banner-ld').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//                     if (currentSlide != nextSlide) {
//                         var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
//                         FU.animate(aniElm);
//                     }
//                 });
//             }
//             if ($('.cas-partner').length) {
//                 $('.cas-partner').slick({
//                     slidesToShow: 6,
//                     slidesToScroll: 6,
//                     dots: false,
//                     arrows: false,
//                     autoplay: true,
//                     autoplaySpeed: 2500,
//                     swipeToSlide: true,
//                     infinite: true,
//                     speed: 1000,
//                     responsive: [
//                         {
//                             breakpoint: 1599,
//                             settings: {
//                                 slidesToShow: 5,
//                             }
//                         },
//                         {
//                             breakpoint: 1199,
//                             settings: {
//                                 slidesToShow: 4,
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 3,
//                             }
//                         },
//                         {
//                             breakpoint: 676,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         }
//                     ],
//                 })
//             }
//             if ($('.cas-new-banner').length) {
//                 $('.cas-new-banner').slick({
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     dots: false,
//                     arrows: false,
//                     autoplay: true,
//                     autoplaySpeed: 6000,
//                     swipeToSlide: true,
//                     infinite: true,
//                     speed: 1000,
//                     vertical: true,
//                     draggable:false,
//                 })
//             }
//             if ($('.cas-new-home').length) {
//                 $('.cas-new-home').not('.slick-initialized').slick({
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     nextArrow: '<div class="smooth next"><i class="far fa-chevron-right"></i></div>',
//                     prevArrow: '<div class="smooth prev"><i class="far fa-chevron-left"></i></div>',
//                     dots: false,
//                     autoplay: true,
//                     autoplaySpeed: 5000,
//                     swipeToSlide: true,
//                     infinite: true,
//                     speed: 1000,
//                     responsive: [
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 676,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 479,
//                             settings: {
//                                 centerPadding: '30px',
//                                 centerMode: true,
//                                 slidesToShow: 1,
//                             }
//                         },
//                     ],
//                 })
//             }
//             if ($('.cas-number').length) {
//                 $('.cas-number').slick({
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     nextArrow: '<div class="smooth next"><i class="fal fa-chevron-right"></i></div>',
//                     prevArrow: '<div class="smooth prev"><i class="fal fa-chevron-left"></i></div>',
//                     dots: false,
//                     autoplay: true,
//                     autoplaySpeed: 4000,
//                     //swipeToSlide: true,
//                     infinite: true,
//                     //variableWidth: true,
//                     speed: 1000,
//                     responsive: [
//                         {
//                             breakpoint: 1199,
//                             settings: {
//                                 slidesToShow: 3,
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                                 slidesToScroll: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 600,
//                             settings: {
//                                 slidesToShow: 1,
//                                 slidesToScroll: 1,
//                                 adaptiveHeight: true
//                             }
//                         }
//                     ],
//                 })
//             }
//             if ($('.cas-news-related').length) {
//                 $('.cas-news-related').slick({
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     nextArrow: '<div class="smooth next"><i class="fal fa-chevron-right"></i></div>',
//                     prevArrow: '<div class="smooth prev"><i class="fal fa-chevron-left"></i></div>',
//                     dots: false,
//                     autoplay: true,
//                     autoplaySpeed: 5000,
//                     swipeToSlide: true,
//                     infinite: true,
//                     //variableWidth: true,
//                     speed: 1000,
//                     responsive: [
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 767,
//                             settings: {
//                                 slidesToShow: 1,
//                                 adaptiveHeight: true
//                             }
//                         }
//                     ],
//                 })
//             }
//             if ($('.cas-product-related').length) {
//                 $('.cas-product-related').slick({
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     nextArrow: '<div class="smooth next"><i class="fal fa-chevron-right"></i></div>',
//                     prevArrow: '<div class="smooth prev"><i class="fal fa-chevron-left"></i></div>',
//                     dots: false,
//                     autoplay: true,
//                     autoplaySpeed: 5000,
//                     swipeToSlide: true,
//                     infinite: true,
//                     //variableWidth: true,
//                     speed: 1000,
//                     responsive: [
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 767,
//                             settings: {
//                                 slidesToShow: 1,
//                                 adaptiveHeight: true
//                             }
//                         }
//                     ],
//                 })
//             }
//             if($('.cas-imprint-content').length) {
//                 $('.cas-imprint-content').slick({
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     arrows: false,
//                     speed: 800,
//                     fade: true,
//                     asNavFor: '.cas-imprint-img',
//                     infinite: true,
//                     adaptiveHeight: true,
//                     responsive: [
//                     {
//                         breakpoint: 767,
//                         settings: {
//                             fade: false,
//                         }
//                     },
//                     ],
//                 });
//                 FU.animate($(".cas-imprint-content .slick-current [data-animation ^= 'animated']"));
//                 $('.cas-imprint-content').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//                     if(currentSlide!=nextSlide){
//                         var aniElm = $(this).find('.slick-slide[data-slick-index="'+nextSlide+'"]').find("[data-animation ^= 'animated']");
//                         FU.animate(aniElm);
//                     }
//                 });
//             }
//             if($('.cas-imprint-img').length) {
//                 $('.cas-imprint-img').slick({
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                     speed: 500,
//                     autoplay: false,
//                     autoplaySpeed: 5000,
//                     asNavFor: '.cas-imprint-content',
//                     dots: false,
//                     nextArrow: '<i class="cas-arrow next far fa-chevron-right"></i>',
//                     prevArrow: '<i class="cas-arrow prev far fa-chevron-left"></i>',
//                     centerMode: false,
//                     focusOnSelect: true,
//                     infinite: true,
//                     responsive: [
//                         {
//                             breakpoint: 1199,
//                             settings: {
//                                 slidesToShow: 3,
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                                 adaptiveHeight: true
//                             }
//                         },
//                         {
//                             breakpoint: 767,
//                             settings: {
//                                 slidesToShow: 1,
//                                 adaptiveHeight: true,
//                                 centerMode: true,
//                                 centerPadding: '40px',
//                             }
//                         }
//                     ],
//                 });
//             }
//             if($('.cas-ld-solution').length) {
//                 $('.cas-ld-solution').slick({
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     speed: 500,
//                     autoplay: false,
//                     autoplaySpeed: 5000,
//                     dots: false,
//                     nextArrow: '<i class="cas-arrow next far fa-chevron-right"></i>',
//                     prevArrow: '<i class="cas-arrow prev far fa-chevron-left"></i>',
//                     centerMode: false,
//                     focusOnSelect: false,
//                     infinite: true,
//                     responsive: [
//                         {
//                             breakpoint: 1199,
//                             settings: {
//                                 slidesToShow: 3,
//                             }
//                         },
//                         {
//                             breakpoint: 991,
//                             settings: {
//                                 slidesToShow: 2,
//                                 adaptiveHeight: true
//                             }
//                         },
//                         {
//                             breakpoint: 575,
//                             settings: {
//                                 slidesToShow: 1,
//                                 centerMode: true,
//                                 infinite: false,
//                                 centerPadding: '3rem',
//                                 arrows: false,
//                                 dots: true,
//                             }
//                         }
//                     ],
//                 });
//             }
//             if($('.cas-ld-experts').length) {
//                 $('.cas-ld-experts').slick({
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     speed: 1000,
//                     autoplay: false,
//                     autoplaySpeed: 5000,
//                     dots: false,
//                     nextArrow: '<i class="cas-arrow next far fa-chevron-right"></i>',
//                     prevArrow: '<i class="cas-arrow prev far fa-chevron-left"></i>',
//                     centerMode: false,
//                     focusOnSelect: true,
//                     infinite: true,
//                     responsive: [
//                         {
//                             breakpoint: 1199,
//                             settings: {
//                                 slidesToShow: 2,
//                             }
//                         },
//                         {
//                             breakpoint: 767,
//                             settings: {
//                                 slidesToShow: 1,
//                                 adaptiveHeight: true,
//                                 centerMode: true,
//                                 infinite: false,
//                                 centerPadding: '4rem',
//                                 arrows: false,
//                                 dots: true,
//                             }
//                         },
//                     ],
//                 });
//             }
//             if ($('.cas-ld-review').length) {
//                 $('.cas-ld-review').slick({
//                     autoplay: true,
//                     speed: 1500,
//                     autoplaySpeed: 8000,
//                     pauseOnHover: true,
//                     swipeToSlide: true,
//                     fade: true,
//                     nextArrow: '<i class="cas-arrow next far fa-chevron-right"></i>',
//                     prevArrow: '<i class="cas-arrow prev far fa-chevron-left"></i>',
//                     arrows: true,
//                     dots: false,
//                 })
//                 FU.animate($(".cas-ld-review .slick-current [data-animation ^= 'animated']"));
//                 $('.cas-ld-review').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//                     if (currentSlide != nextSlide) {
//                         var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
//                         FU.animate(aniElm);
//                     }
//                 });
//             }
//             if (win.width() < 992) {
//                 if($('.ld-list-services').length) {
//                     $('.ld-list-services .row').slick({
//                         slidesToShow: 2,
//                         slidesToScroll: 1,
//                         speed: 1000,
//                         autoplay: false,
//                         autoplaySpeed: 5000,
//                         dots: true,
//                         arrows: false,
//                         nextArrow: '<i class="cas-arrow next fal fa-chevron-right"></i>',
//                         prevArrow: '<i class="cas-arrow prev fal fa-chevron-left"></i>',
//                         centerMode: false,
//                         focusOnSelect: true,
//                         infinite: false,
//                         responsive: [
//                             {
//                                 breakpoint: 575,
//                                 settings: {
//                                     slidesToShow: 1,
//                                     adaptiveHeight: true,
//                                     centerMode: true,
//                                     centerPadding: '3rem',
//                                 }
//                             }
//                         ],
//                     });
//                 }
//             }
//             if ($('.cas-agile-ld').length) {
//                 $('.cas-agile-ld').slick({
//                     autoplay: false,
//                     speed: 1000,
//                     autoplaySpeed: 10000,
//                     pauseOnHover: true,
//                     swipeToSlide: true,
//                     fade: true,
//                     infinite: true,
//                     nextArrow: '<i class="cas-arrow next far fa-chevron-right"></i>',
//                     prevArrow: '<i class="cas-arrow prev far fa-chevron-left"></i>',
//                     arrows: true,
//                     dots: false,
//                     adaptiveHeight: true,
//                 })
//                 FU.animate($(".cas-agile-ld .slick-current [data-animation ^= 'animated']"));
//                 $('.cas-agile-ld').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//                     if (currentSlide != nextSlide) {
//                         var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
//                         FU.animate(aniElm);
//                     }
//                 });
//             }
//         },
//         input_number: function () {
//             doc.on('keydown', '.numberic', function (event) {
//                 if (!(!event.shiftKey &&
//                     !(event.keyCode < 48 || event.keyCode > 57) ||
//                     !(event.keyCode < 96 || event.keyCode > 105) ||
//                     event.keyCode == 46 ||
//                     event.keyCode == 8 ||
//                     event.keyCode == 190 ||
//                     event.keyCode == 9 ||
//                     event.keyCode == 116 ||
//                     (event.keyCode >= 35 && event.keyCode <= 39)
//                 )) {
//                     event.preventDefault();
//                 }
//             });
//             doc.on('click', '.i-number .up', function (e) {
//                 e.preventDefault();
//                 var input = $(this).parents('.i-number').children('input');
//                 var max = Number(input.attr('max')),
//                     val = Number(input.val());
//                 if (!isNaN(val)) {
//                     if (!isNaN(max) && input.attr('max').trim() != '') {
//                         if (val >= max) {
//                             return false;
//                         }
//                     }
//                     input.val(val + 1);
//                     input.trigger('change');
//                 }
//             });
//             doc.on('click', '.i-number .down', function (e) {
//                 e.preventDefault();
//                 var input = $(this).parents('.i-number').children('input');
//                 var min = Number(input.attr('min')),
//                     val = Number(input.val());
//                 if (!isNaN(val)) {
//                     if (!isNaN(min) && input.attr('max').trim() != '') {
//                         if (val <= min) {
//                             return false;
//                         }
//                     }
//                     input.val(val - 1);
//                     input.trigger('change');
//                 }
//             });
//         },
//         yt_play: function () {
//             doc.on('click', '.yt-box .play', function (e) {
//                 var id = FU.get_Ytid($(this).closest('.yt-box').attr('data-url'));
//                 $(this).closest('.yt-box iframe').remove();
//                 $(this).closest('.yt-box').append('<iframe src="https://www.youtube.com/embed/' + id + '?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
//             });
//         },
//         psy: function () {
//             var btn = '.psy-btn',
//                 sec = $('.psy-section'),
//                 pane = '.psy-pane';
//             doc.on('click', btn, function (e) {
//                 e.preventDefault();
//                 $(this).closest(pane).find(btn).removeClass('active');
//                 $(this).addClass('active');
//                 $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 80 }, 600);
//             });

//             var section_act = function () {
//                 sec.each(function (index, el) {
//                     if (win.scrollTop() + (win.height() / 2) >= $(el).offset().top) {
//                         var id = $(el).attr('id');
//                         $(pane).find(btn).removeClass('active');
//                         $(pane).find(btn + '[href="#' + id + '"]').addClass('active');
//                     }
//                 });
//             }
//             section_act();
//             win.scroll(function () {
//                 section_act();
//             });
//         },
//         drop: function () {
//             $('.drop').each(function () {
//                 var this_ = $(this);
//                 var label = this_.children('.label');
//                 var ct = this_.children('ul');
//                 var item = ct.children('li').children('a.drop-item');

//                 this_.click(function () {
//                     ct.slideToggle(150);
//                     label.toggleClass('active');

//                 });

//                 item.click(function (e) {
//                     //e.preventDefault();
//                     label.html($(this).html());
//                 });

//                 win.click(function (e) {
//                     if (this_.has(e.target).length == 0 && !this_.is(e.target)) {
//                         this_.children('ul').slideUp(150);
//                         label.removeClass('active');
//                     }
//                 })
//             });
//         },
//         toggle: function () {
//             var ani = 100;
//             $('[data-show]').each(function (index, el) {
//                 var ct = $($(el).attr('data-show'));
//                 $(el).click(function (e) {
//                     e.preventDefault();
//                     ct.fadeToggle(ani);
//                     if($('.search-fr input').length){
//                         $('.search-fr input').focus();
//                     }
//                 });
//             });
//             win.click(function (e) {
//                 $('[data-show]').each(function (index, el) {
//                     var ct = $($(el).attr('data-show'));
//                     if (ct.has(e.target).length == 0 && !ct.is(e.target) && $(el).has(e.target).length == 0 && !$(el).is(e.target)) {
//                         ct.fadeOut(ani);
//                     }
//                 });
//             });
//         },
//         uiCounterup: function () {
//             var item = $('.hc-counter'),
//                 flag = true;
//             if (item.length > 0) {
//                 run(item);
//                 win.scroll(function () {
//                     if (flag == true) {
//                         run(item);
//                     }
//                 });

//                 function run(item) {
//                     if (win.scrollTop() + 70 < item.offset().top && item.offset().top + item.innerHeight() < win.scrollTop() + win.height()) {
//                         count(item);
//                         flag = false;
//                     }
//                 }

//                 function count(item) {
//                     item.each(function () {
//                         var this_ = $(this);
//                         var num = Number(this_.text().replace(".", ""));
//                         if(num<10){
//                             num = '0' + num;
//                         }
//                         // var num = Number(this_.text());
//                         var incre = num / 200;

//                         function start(counter) {
//                             if (counter <= num) {
//                                 setTimeout(function () {
//                                     this_.text(FU.get_currency(Math.ceil(counter)));
//                                     // this_.text(FU.get_currency(counter));
//                                     counter = counter + incre;
//                                     start(counter);
//                                 }, 30);
//                             } else {
//                                 this_.text(FU.get_currency(num));
//                             }
//                         }
//                         start(0);
//                     });
//                 }
//             }
//         },
//         uiParalax: function () {
//             var paralax = function () {
//                 $('.prl').each(function (index, el) {
//                     var num = 20;
//                     if ($(el).hasClass('v1')) num = 3;
//                     if ($(el).hasClass('v2')) num = 3;
//                     if ($(el).hasClass('v3')) num = 3;
//                     if ($(el).hasClass('v-ab')) num = 4;
//                     if ($(el).hasClass('v-video')) num = 20;
//                     if ($(el).hasClass('v-sv1')) num = 20;
//                     if ($(el).hasClass('v-sv2')) num = 25;
//                     if ($(el).hasClass('v-sv3')) num = 30;
//                     var he = $(el).innerHeight(),
//                         vtop = $(el).offset().top;
//                     win.scroll(function (e) {
//                         var top = $(window).scrollTop();
//                         $(el).css({
//                             'transform': 'translateY(' + (top / num) + 'px)',
//                         })
//                         if ($(el).hasClass('v-video')) {
//                             $(el).css({
//                                 'transform': 'translate(' + (2 * top - vtop) / 30 + 'px,' + (top - vtop) / num + 'px)',
//                             })
//                         }
//                         if ($(el).hasClass('v-left')) {
//                             $(el).css({
//                                 'transform': 'translate(' + (2 * top - vtop) / 70 + 'px,' + (top - vtop) / num + 'px)',
//                             })
//                         }
//                         if ($(el).hasClass('v-right')) {
//                             $(el).css({
//                                 'transform': 'translate(' + (2 * top - vtop) / 70 * -1 + 'px,' + (top - vtop) / num + 'px)',
//                             })
//                         }
//                     });
//                 });
//             }
//             if ($(win).width() > 767) {
//                 paralax();
//             }
//         },
//         ready: function () {
//             //UI.mMenu();
//             //UI.header();
//             UI.slider();
//             UI.backTop();
//             UI.toggle();
//             UI.drop();
//             //UI.input_number();
//             UI.uiCounterup();
//             //UI.yt_play();
//             UI.psy();
//             UI.uiParalax();
//         },
//     }


//     UI.ready();


//     /*custom here*/
//     WOW.prototype.addBox = function (element) {
//         this.boxes.push(element);
//     };

//     var wow = new WOW({
//         mobile: false
//     });
//     wow.init();
//     /*if ($(window).width() > 1199) {
//         $('.wow').on('scrollSpy:exit', function() {
//             $(this).css({
//                 'visibility': 'hidden',
//                 'animation-name': 'none'
//             }).removeClass('animated');
//             wow.addBox(this);
//         }).scrollSpy();
//     }*/

//     // disable scroll
//     var owl = $('.owl-carousel');
//     owl.on('drag.owl.carousel', function (event) {
//         document.ontouchmove = function (e) {
//             e.preventDefault()
//         }
//     })
//     // enable scroll
//     owl.on('dragged.owl.carousel', function (event) {
//         document.ontouchmove = function (e) {
//             return true
//         }
//     })
//     $('.change-mode').click(function (event) {
//         setTimeout(function () {
//             var d = new Date();
//             d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
//             var expires = "expires=" + d.toUTCString();
//             if (body.hasClass('light-mode') == true) {
//                 $("body").removeClass('light-mode')
//                 document.cookie = "lightModeS=false; path=/; expires=" + expires + ""
//             } else {
//                 $("body").addClass('light-mode');
//                 document.cookie = "lightModeS=true; path=/; expires=" + expires + ""
//             }
//             // body.toggleClass('light-mode');
//             $('.cas-agile-ld').slick('setPosition');
//             $('.cas-partner').slick('setPosition');
//         }, 500);
//         $('.aps-loading').addClass('active');
//         setTimeout(function () {
//             $('.aps-loading').removeClass('active');
//         }, 1750);
//     });
//     $('.d-nav').hc_menu({
//         open: '.open-mnav',
//     })
//     /*$('.d-nav').find('ul>li').each(function(index, el) {
//         if ($(el).find('ul li').length > 0) $(el).addClass('sub');
//     });*/
//     $(win).scroll(function () {
//         if ($(win).scrollTop() > 0) {
//             $('header').addClass('scroll');
//         } else {
//             $('header').removeClass('scroll');
//         }
//     });
//     if (win.width() < 576) {
//         $(win).scroll(function () {
//             if ($(win).scrollTop() > 0) {
//                 $('.fix-right').addClass('scroll');
//             } else {
//                 $('.fix-right').removeClass('scroll');
//             }
//         });
//     }
//     if (win.width() < 768) {
//         $('.ft-item .title').click(function (event) {
//             $(this).next('.link-ft').stop().slideToggle();
//             $(this).children('i').toggleClass('fa-angle-down fa-angle-up');
//         });
//     }
//     $("[data-morphing]").fancyMorph({
//         hash: 'morphing'
//     });
//     $('.submenu>li').hover(function () {
//         $('.submenu>li').removeClass('active');
//         $(this).addClass('active');
//     }, function () {
//         /* Stuff to do when the mouse leaves the element */
//     });

//     var wContainer = $('.social-new-banner.container').outerWidth() -30;
//     var wWin = win.width();
//     var wLeft = (wWin-wContainer)/2 - 30;
//     //$('.cas-home .slick-dots').css('left', 'calc((100vw - ' + wContainer + 'px + 20px)/2)');
//     $('.social-new-banner').css('left', (wLeft/2)+'px');
//     win.resize(function (event) {
//         var wContainer = $('.social-new-banner.container').outerWidth() -30;
//         //$('.cas-home .slick-dots').css('left', 'calc((100vw - ' + wContainer + 'px + 20px)/2)');
//         $('.social-new-banner').css('left', (wLeft/2)+'px');
//     });
   
//     $('.c-project-page .item').mouseover(function () {
//         $('.c-project-page').addClass('on-focus');
//     });
//     $('.c-project-page .item').mouseleave(function () {
//         $('.c-project-page').removeClass('on-focus');
//     });
//     if($(".solutions .nav-pills").length){
//         var actWidth = $(".solutions .nav-pills").find(".active").parent("li").width();
//         var actPosition = $(".solutions .nav-pills .active").parent("li").position();
//         $(".solutions .decor").css({ "left": +actPosition.left, "width": actWidth });
//         $(".solutions .nav-pills .nav-link").click(function() {
//             var positionDc = $(this).parent().position();
//             var widthDc = $(this).parent().width();
//             $(".solutions .decor").css({ "left": +positionDc.left, "width": widthDc });
//         });
//         win.resize(function (event) {
//             var actWidth = $(".solutions .nav-pills").find(".active").parent("li").width();
//             var actPosition = $(".solutions .nav-pills .active").parent("li").position();
//             $(".solutions .decor").css({ "left": +actPosition.left, "width": actWidth });
//             $(".solutions .nav-pills .nav-link").click(function() {
//                 var positionDc = $(this).parent().position();
//                 var widthDc = $(this).parent().width();
//                 $(".solutions .decor").css({ "left": +positionDc.left, "width": widthDc });
//             });
//         });
//     }
    
//     //chuyen dong background
//     if ($(window).width() > 1199) {
//         function translateBackground(parent, el) {
//             var lFollowX = 0,
//                 lFollowY = 0,
//                 x = 0,
//                 y = 0,
//                 friction = 1 / 20;

//             function moveBackground() {
//                 x += (lFollowX - x) * friction;
//                 y += (lFollowY - y) * friction;

//                 translate = 'translate(' + x + 'px, ' + y + 'px) scale(1)';
//                 $(el).css({
//                     '-webit-transform': translate,
//                     '-moz-transform': translate,
//                     'transform': translate
//                 });

//                 window.requestAnimationFrame(moveBackground);
//             }

//             $(parent).on('mousemove click', function (e) {

//                 var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
//                 var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
//                 lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
//                 lFollowY = (10 * lMouseY) / 100;

//             });

//             moveBackground();
//         }
//         translateBackground('.banner-page.solution', '.banner-page.solution .ct');
//     }

//     // refresh slick
//     // $('.home-partner .nav-link').click(function () {
//     //     $('.cas-partner').slick('refresh');
//     // })
//     $('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
//         e.target
//         e.relatedTarget
//         $('.cas-partner').slick('setPosition');
//         $('.cas-ld-solution').slick('setPosition');
//     });
//     scroll_vt('.tabs-prize-world .nav-tabs .nav-link','.tabs-prize .tab-content');
//     scroll_vt('.page-resources .nav-tabs .nav-link','.page-resources .tab-content');
//     function scroll_vt(itemClick,itemScroll) {
//         if ($(itemClick).length) {
//             $(itemClick).on('click', function(e) {
//                 var vtTab = $(itemScroll).offset().top;
//                 $("html, body").animate({ scrollTop: vtTab - 80 }, 800);
//             });
//         }
//     }
//     window.onload = function() {
//         if (localStorage.darkMode == "true") {
//             document.body.classList.toggle('light-mode');
//             document.getElementById("chk").checked = true;
//         } else {
//             document.body.classList.toggle('dark');
//         }
//     };

//     if($('.show-contact').length) {
//         $(document).on('click', '.show-contact', function(e) {
//             $('.contact-form').removeClass('hidden');
//             $(body).css('overflow', 'hidden');
//             setTimeout(function() {
//                 $('.form-contact #name_input').focus();
//             }, 1000);
//         });
//     }
//     if($('.contact-form .btn-close').length) {
//         $(document).on('click', '.contact-form .btn-close', function(e) {
//             $('.contact-form').addClass('hidden');
//             $(body).css('overflow', '');
//         });
//     }
//     var file_input = $('#form-file');
//     if($('.file-custom').length) {
//         doc.on('click', '.file-custom', function(e) {
//             $('.form-file').trigger('click');  
//         });

//         file_input.change(function() {
//             var filePath = file_input.val();
//             if (filePath) {
//                 var startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
//                 var filename = filePath.substring(startIndex);
//                 if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
//                     filename = filename.substring(1);
//                 }
//                 $('.file-custom').html(truncStringPortion(filename,10,8,3));
//             }
//         });
//     }

//     function truncStringPortion(str, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
//         var convertedStr="";
//         convertedStr+=str.substring(0, firstCharCount);
//         convertedStr += ".".repeat(dotCount);
//         convertedStr+=str.substring(str.length-endCharCount, str.length);
//         return convertedStr;
//     }
// })
