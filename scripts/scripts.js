/**
 * @file
 * Calibr8 custom scripts.
 */

(function ($, Drupal) {

  'use strict';

  var options = $.extend({
    breakpoints: {
      'sm': drupalSettings.calibr8_subtheme.breakpoints['sm'],
      'md': drupalSettings.calibr8_subtheme.breakpoints['md'],
      'lg': drupalSettings.calibr8_subtheme.breakpoints['lg'],
      'xl': drupalSettings.calibr8_subtheme.breakpoints['xl']
    }
  }, drupalSettings.calibr8);

  // Extract the pixel value from the breakpoint
  function bpExtract($bp) {
    return $bp.substring($bp.lastIndexOf(": ")+1,$bp.lastIndexOf("px"));
  }

/**
 * MatchHeight settings
 */
// Under certain conditions where the size of the page is dynamically changing,
// such as during resize or when adding new elements,
// browser bugs cause the page scroll position to change unexpectedly.
$.fn.matchHeight._maintainScroll = true;
// By default, the _update method is throttled to execute at a maximum rate
// of once every 80ms.
$.fn.matchHeight._throttle = 80;
// Execute matchheight.
$.fn.matchHeight._update();

var matchHeightElements = [
  '.equal-heights article',
];

/**
 * Media Queries
 */
var mobileQuery = 'screen and (max-width:' + (bpExtract(options.breakpoints.md) - 1) + 'px)';
var nonMobileQuery = options.breakpoints.md;

/**
 * Variables
 */


/**
 * Mobile menu
 */
Drupal.behaviors.mobileMenu = {
  attach: function (context, settings) {
    $('#mobile-menu-anchor', context).click(function (e) {
      e.preventDefault();
      Drupal.behaviors.mobileMenu.toggle();
    });
  },
  toggle: function(animate) {
    animate = typeof animate !== 'undefined' ? animate : true;
    if(!$('#mobile-menu').is(':visible')) {
      Drupal.behaviors.mobileMenu.show(animate);
    } else {
      Drupal.behaviors.mobileMenu.hide(animate);
    }
  },
  show: function(animate) {
    animate = typeof animate !== 'undefined' ? animate : true;
    if(animate) {
      $('#mobile-menu').slideDown();
    } else {
      $('#mobile-menu').show();
    }
  },
  hide: function(animate) {
    animate = typeof animate !== 'undefined' ? animate : true;
    if(animate) {
      $('#mobile-menu').slideUp();
    } else {
      $('#mobile-menu').hide();
    }
  }
};

/**
 * Initialize Enquire
 */
enquire.register(mobileQuery, {

  match : function() {

  },

  unmatch : function() {
    Drupal.behaviors.mobileMenu.hide(false);
  },

  setup : function() {},
  deferSetup : true,

  destroy : function() {}

}).register(nonMobileQuery, {
  match : function() {
    $(matchHeightElements.join(', ')).matchHeight({ byRow: true, property: 'min-height' });
  },

  unmatch : function() {
    $(matchHeightElements.join(', ')).matchHeight({ property: 'min-height', remove: true });
  },

  setup : function() {},
  deferSetup : true,

  destroy : function() {}

});

})(jQuery, Drupal);