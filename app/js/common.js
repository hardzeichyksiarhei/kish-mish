const reviewCarouselSetting = {
  items: 2,
  margin: 36,
  nav: true,
  dots: false,
  mouseDrag: false,
  responsive : {
    0 : {
      items: 1
    },
    992 : {
    }
  }
};

var API = "";

$(function() {

  initTabs();

  toggleArrowUp();

  toggleDeliveryMethods();

  toggleCashMethods();

  cloneDishCount();

  initNumberInput();

  $(window).scroll(function(){
    if ($(window).scrollTop() > 0) {
      $('#top-header').addClass('top-header--scroll');
    }
    else {
      $('#top-header').removeClass('top-header--scroll')
    }

    toggleArrowUp();
  });

  $('input[name="delivery-methods"]').on('change', function () {
    toggleDeliveryMethods();
    if ($(window).width() < 1200) return false;

    //calculateCartHeight();
  });

  $('input[name="cash-methods"]').on('change', function () {
    toggleCashMethods();
    if ($(window).width() < 1200) return false;

    //calculateCartHeight();
  });

  $('input[name="cash"]').on('change', function () {
    toggleCash();
  });

  var cart = $("#menu").mmenu({
    "extensions": [
      "pagedim-black",
      "position-right",
      "position-front"
    ],
    //autoHeight: true,
    slidingSubmenus: false,
    navbar: { add: false }
  }, {
    classNames: {
       fixedElements: {
          fixed: "fix",
          sticky: "stick"
       }
    }
  });

  API = cart.data( "mmenu" );

  $('.cart__close').on('click', function () { API.close(); });

  changeFixedCart();

  calculateArrowUp();

  $(".cart-toggle").on('click', function (evnt) {
      evnt.preventDefault();
      API.open();

      initStickyCartContent();
  });

  $('.cart-toggle-down').on('click', function (evnt) {
    evnt.preventDefault();
    API.open();
  });

  $("#cart-phone").inputmask({"mask": "+7 (999) 999-99-99"});

  $("a[rel='m_PageScroll2id']").mPageScroll2id({ 
    scrollSpeed: 600,
    scrollEasing: "linear"
  });

  $(window).on('resize', function () {
    calculateArrowUp();
    changeFixedCart();
    cloneDishCount();
    calculeteProductHeigth();
  });

  $('.dropdown-top-nav .dropdown-toggle').on('click', function () {
    $('.dropdown-top-nav').toggleClass('show');
    $('.dropdown-top-nav .dropdown-menu').toggleClass('show');
  });

  $('body').on('click', function (e) {
    var container = $(".dropdown-top-nav");
    if (container.has(e.target).length === 0){
      $('.dropdown-top-nav').removeClass('show');
      $('.dropdown-top-nav .dropdown-menu').removeClass('show');
    }
  });

  $('#home-carousel').owlCarousel({ 
    items: 1,
    responsive : {
      0 : {
        dots: false
      },
      768 : {
      }
    } 
  });
  
  /*var popularDishesCarousel = $('#popular-dishes-carousel');
  
  popularDishesCarousel.on('initialized.owl.carousel', function(event) {
    calculeteProductHeigth();
  });
  
  popularDishesCarousel.owlCarousel({ 
    items: 4,
    margin: 36,
    dots: false,
    nav: true,
    mouseDrag: false,
    responsive : {
      0 : {
        items: 2,
        nav: true,
        margin: 18
      },
      768 : {
      }
    }
  });*/

  var reviewsCarousel = $('#reviews-carousel');

  reviewsCarousel.on('initialize.owl.carousel', function(event) {
    rowsReviewCarousel();
  });

  reviewsCarousel.owlCarousel(reviewCarouselSetting);

  reviewsCarousel.on('resize.owl.carousel', function(event) {
    rowsResizeReviewCarousel();
  });

  $('button[type="submit"]').on('click', function () {
    if ($('#cart-phone').inputmask("isComplete")){
      alert('Phone correct')
    } else {
      alert('Phone incorrect')
    }
  });

  $('a.popular-dishes').on('click', function () {
    var productInnerList = $('.product-inner__list');
    var dishPopup = $('#dish-popup');

    var marginTop = 110;
    if ($(window).width() < 578) {
      marginTop = 60;
    }

    productInnerList.animate({
      'opacity': 0,
      'margin-top': 500
    }, 300, 'linear', function () {
      productInnerList.hide();
      dishPopup.show();
      dishPopup.animate({
        'opacity': 1,
        'margin-top': marginTop
      }, 300, 'linear', function () {
        changeFixedCart();
      });
    });

    $("body").addClass("dish-popup-active");
  });

  $('.dish__close').on('click', function () {
    var productInnerList = $('.product-inner__list');
    var dishPopup = $('#dish-popup');

    dishPopup.animate({
      'opacity': 0,
      'margin-top': '100vh'
    }, 300, 'linear', function () {
      dishPopup.hide();
      productInnerList.show();
      productInnerList.animate({
        'opacity': 1,
        'margin-top': 0
      }, 300, 'linear', function () {
        changeFixedCart();
      });
    });

    $("body").removeClass("dish-popup-active");
  });

  calculeteProductHeigth();

});

function isFixedCartPage () {
  return $("body").hasClass("fixed-cart");
}

function initStickyCartContent () {
  var fixedCart = isFixedCartPage();

  var cart = fixedCart ? $("#fix-cart .cart__content") : $("#menu .cart__content");
  var headerHeight = $("#top-header").height();

  var args = fixedCart ? {
    offset_top: headerHeight
  } : {
    offset_top: headerHeight,
    parent: "body"
  };

  if ($(window).width() < 1200) {
    cart.trigger("sticky_kit:detach");
    return false;
  } 

  cart.stick_in_parent(args);

}

function calculeteProductHeigth () {
  var width = $('.popular-dishes__img').width();
  $('.popular-dishes__img').height(width);
}

function cloneDishCount () {
  if ($(window).width() < 768) {
    $('.dish  .dish__main-info .dish__count').clone(true).appendTo('.dish .dish__mobile-info');
    $('.dish .dish__main-info .dish__count').remove();
  } else {
    $('.dish .dish__mobile-info .dish__count').clone(true).appendTo('.dish .dish__main-info');
    $('.dish .dish__mobile-info .dish__count').remove();
  }
}

function initTabs () {
  $('.tabs').each(function (i, tabs) {
    $(tabs).find('.tabs__content').hide();
    $(tabs).find('.tabs__content:first').show();
    $(tabs).find('.tabs__nav li:first').addClass('active');

    $(tabs).find('.tabs__nav li').click(function(event) {
      event.preventDefault();
      $(tabs).find('.tabs__nav li').removeClass('active');
      $(this).addClass('active');
      $('.tabs__content').hide();

      var selectTab = $(this).find('a').attr("href");

      $(selectTab).fadeIn();

      calculateHeightFixCart();
    });
  });
}

function initNumberInput () {
  $('.number-input').each(function() {
    const spinner = $(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find('.quantity-up'),
    btnDown = spinner.find('.quantity-down'),
    min = input.attr('min'),
    max = input.attr('max');

    btnUp.unbind( "click" );
    btnDown.unbind( "click" );

    btnUp.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      return false;
    });

    btnDown.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      return false;
    });
  });
}

function changeFixedCart () {
  if (!isFixedCartPage()) return false;
  if ($(window).width() > 1200) {
    $('#menu .cart').clone(true).appendTo('.fixed-cart .fix-cart');
    $('#menu .cart').remove();
    calculateHeightFixCart();
    API.close();
  } else {
    $('.fixed-cart .fix-cart .cart').clone(true).appendTo('#menu .mm-panel');
    $('.fixed-cart .fix-cart .cart').remove();
    $('#menu .mm-panel .cart').css({
      'height': 'auto'
    });
  }
  initNumberInput();
  initStickyCartContent();
}

function calculateHeightFixCart () {
  if ($(window).width() > 1600 && isFixedCartPage()) {
    $('.fix-cart .cart')
      .height($('.page').height())
      .css({
        'position': 'absolute'
      });
      $('.main-footer .row').eq(1).removeClass('justify-content-between');
  } else {
    $('.fix-cart .cart').css({
      'position': 'static',
      'height': '100%'
    });
    $('.main-footer .row').eq(1).addClass('justify-content-between');
  }
    
}

function rowsReviewCarousel () {
  if ($(window).width() > 576) { // only for mobile devices
    $('#reviews-carousel .review-block').each(function(index) {
      if (index % 2 == 0) { // wrap by 2 items
        $(this).add($(this).next('.review-block')).wrapAll('<div class="review-item" />');
      }
    });
  }
}

function rowsResizeReviewCarousel () {
  if ($(window).width() > 576) { // only for mobile devices
    var newContent = '';
    var newC = '';
    var array = $('#reviews-carousel .review-block');
    for (var i = 0; i < array.length - 1; i += 2 ) {
        newC = '';
        [$(array[i]), $(array[i+1])].map(function(item, i) {
          newC += item[0].outerHTML;
        });
        newContent += '<div class="review-item">' + newC + '</div>';
    }
    $('#reviews-carousel').trigger('replace.owl.carousel', newContent).trigger('refresh.owl.carousel');
  } else {
    var newContent = '';
    $('#reviews-carousel .review-block').unwrap().each(function(index, item) {
      newContent += item.outerHTML;
    });
    $('#reviews-carousel').trigger('replace.owl.carousel', newContent).trigger('refresh.owl.carousel');
  }
}

function toggleDeliveryMethods () {
  var currentVal = $('input[name="delivery-methods"]:checked').val();
  if (currentVal == 'pickup') {
    $('.express-delivery').hide();
    $('.pickup').show();
  } else if (currentVal == 'express-delivery') {
    $('.pickup').hide();
    $('.express-delivery').show();
  }
}

function toggleCashMethods () {
  var currentVal = $('input[name="cash-methods"]:checked').val();
  if (currentVal == 'in-cash') {
    $('.cash').show();
  } else if (currentVal == 'card-cash') {
    $('.cash').hide();
  }
  toggleCash();
}

function toggleCash () {
  var currentVal = $('input[name="cash"]:checked').val();
  if (currentVal == 'no-change') {
    $('input[name="cart-change"]').prop("disabled", true);
  } else if (currentVal == 'with-change') {
    $('input[name="cart-change"]').prop("disabled", false);
  }
}

function calculateCartHeight () {
  $('#menu').css({
    'height': $('#menu .cart__content').outerHeight() + 100
  })
}

function calculateArrowUp () {
  if ($('.fixed-cart').length && $(window).width() > 1200) {
    $('.arrow-up').css({
      'left': $('.main-footer .container').offset().left + 20
    });
    return false;
  }

  $('.arrow-up').css({
    'left': $('.main-footer .container').offset().left + 20
  });
}

function toggleArrowUp () {
  if ($(window).scrollTop() > $(document).outerHeight() / 3) {
    $('.arrow-up').addClass('visible');
  } else {
    $('.arrow-up').removeClass('visible');
  }
}
