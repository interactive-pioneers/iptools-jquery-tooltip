;(function($, window) {

  'use strict';

  var pluginName = 'iptTooltip';
  var defaults = {
    bubbleArrow: false,
    bubbleArrowClass: 'tooltip__bubble-arrow',
    closeButton: false,
    closeButtonClass: 'tooltip__close',
    dataAttrTooltipText: 'data-tooltip-text',
    dataAttrTooltipHeadline: 'data-tooltip-headline',
    defaultHorizontalPosition: 'right',
    defaultVerticalPosition: 'top',
    fadeDuration: 250,
    headlineClass: 'tooltip__headline',
    margin: 5,
    maxWidth: 300,
    stick: false,
    textWrapperClass: 'tooltip__text',
    tooltipClass: 'tooltip',
    tooltipClassActiveModifier: '--active'
  };

  var viewport;
  var resizeTimeout = 0;
  var scrollTimeout = 0;
  var throttle = 250;

  /**
   * IPTTooltip
   * @constructor
   * @param {object} element
   * @param {object} options - plugin options
   */
  function IPTTooltip(element, options) {

    this.settings = $.extend({}, defaults, options);

    this.$element = $(element);
    this.$element.css('white-space', 'nowrap');

    this.resizeTimeout = 0;

    this.active = false;
    this.tooltipText = this.$element.attr(this.settings.dataAttrTooltipText);
    this.tooltipHeadline = this.$element.attr(this.settings.dataAttrTooltipHeadline);
    this.position = {};

    this.addEventListeners();

  }

  IPTTooltip.prototype = {

    /**
     * sets the position of the tooltip
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    setDimensions: function() {

      this.updateTriggerDimensions();

      this.setHorizontalPosition(this.settings.defaultHorizontalPosition);
      this.setVerticalPosition(this.settings.defaultVerticalPosition);

      switch (this.settings.defaultHorizontalPosition) {
        case 'center':
          /* if tooltip reaches left or right out of the viewport move it to the edge */
          if (this.position.left < 0) {
            this.position.left = this.settings.margin;
          } else if (this.position.left + this.tooltipWidth > viewport.width) {
            this.position.left = viewport.width - this.tooltipWidth - this.settings.margin;
          }
          break;
        case 'left':
          /* if tooltip reaches out to the left of the viewport => open it to the right */
          if (this.position.left < 0) {
            this.setHorizontalPosition('right');
          }
          /* if tooltip now reaches out to the right of the viewport => center it over the trigger element */
          if (this.position.left + this.tooltipWidth > viewport.width) {
            this.setHorizontalPosition('center');
          }
          break;
        default:
          /* if tooltip reaches out to the right of the viewport => open it to the left */
          if (this.position.left + this.tooltipWidth > viewport.width) {
            this.setHorizontalPosition('left');
          }
          /* if tooltip now reaches out to the left of the viewport => center it over the trigger element */
          if (this.position.left < 0) {
            this.setHorizontalPosition('center');
          }
          break;
      }

      /* if tooltip still does not fit into viewport horizontally => center within window */
      if (this.position.left < 0 || this.position.left + this.tooltipWidth > viewport.width) {
        this.position.left = (viewport.width - this.tooltipWidth) * 0.5;
        this.position.horizontal = 'center';
      }

      if (this.position.vertical === 'bottom') {
        /* if tooltip reaches out the bottom of the viewport => open to top */
        if (this.position.top + this.tooltipHeight > viewport.bottom) {
          this.setVerticalPosition('top');
        }
      } else {
        /* if tooltip reaches out the top of the viewport => open to bottom */
        if (this.position.top < viewport.top) {
          this.setVerticalPosition('bottom');
        }
      }

      this.$tooltip
        .css({
          left: this.position.left,
          top: this.position.top
        })
        .removeClass(this.settings.tooltipClass + '--top-right')
        .removeClass(this.settings.tooltipClass + '--top-center')
        .removeClass(this.settings.tooltipClass + '--top-left')
        .removeClass(this.settings.tooltipClass + '--bottom-right')
        .removeClass(this.settings.tooltipClass + '--bottom-center')
        .removeClass(this.settings.tooltipClass + '--bottom-left')
        .addClass(this.settings.tooltipClass + '--' + this.position.vertical + '-' + this.position.horizontal);

      this.updateArrowPosition();

    },

    /**
     * calculates horizontal position of the tooltip
     * @param {string} position - left, center, right
     * @returns {undefined}
     */
    setHorizontalPosition: function(position) {

      switch (position) {
        case 'left':
          this.position.left = this.trigger.offsetLeft - this.tooltipWidth - this.settings.margin;
          this.position.horizontal = 'left';
          break;
        case 'center':
          this.position.left = this.trigger.offsetLeft + (this.trigger.width - this.tooltipWidth) * 0.5;
          this.position.horizontal = 'center';
          break;
        default:
          this.position.left = this.trigger.offsetLeft + this.trigger.width + this.settings.margin;
          this.position.horizontal = 'right';
          break;
      }

    },

    /**
     * calculates vertical position of the tooltip
     * @param {string} position - top or bottom
     * @returns {undefined}
     */
    setVerticalPosition: function(position) {

      switch (position) {
        case 'bottom':
          this.position.top = this.trigger.offsetTop + this.trigger.height + this.settings.margin;
          this.position.vertical = 'bottom';
          break;
        default:
          this.position.top = this.trigger.offsetTop - this.tooltipHeight - this.settings.margin;
          this.position.vertical = 'top';
          break;
      }

    },

    /**
     * updates the element / trigger dimensions
     * @returns {undefined}
     */
    updateTriggerDimensions: function() {

      this.trigger = {
        width: this.$element.outerWidth(),
        height: this.$element.outerHeight(),
        offsetTop: this.$element.offset().top,
        offsetLeft: this.$element.offset().left
      };

    },

    /**
     * updates the tooltip dimensions
     * @returns {undefined}
     */
    updateTooltipDimensions: function() {

      if (this.$tooltip) {
        this.$tooltip.css('max-width', this.settings.maxWidth);
        this.tooltipWidth = this.$tooltip.outerWidth();

        if (this.tooltipWidth > viewport.width) {
          this.tooltipWidth = viewport.width - 2 * this.settings.margin;
          this.$tooltip.css('max-width', this.tooltipWidth);
        }

        this.tooltipHeight = this.$tooltip.outerHeight();
      }

    },

    /**
     * calculate and set arrow position - centered over / under trigger - relative to left corner of the tooltip
     * @returns {undefined}
     */
    updateArrowPosition: function() {

      if (this.settings.bubbleArrow) {
        var delta = (this.trigger.offsetLeft - this.position.left) + this.trigger.width / 2;
        this.$tooltip
          .find('.' + this.settings.bubbleArrowClass)
          .css('left', delta + 'px');
      }

    },

    /**
     * creates the tooltip
     * @returns {undefined}
     */
    create: function() {

      if (!this.$tooltip) {
        var $tooltip = $('<div/>').addClass(this.settings.tooltipClass);
        if (this.tooltipHeadline) {
          $('<h4/>')
            .addClass(this.settings.headlineClass)
            .text(this.tooltipHeadline)
            .appendTo($tooltip);
        }
        $('<div/>')
          .addClass(this.settings.textWrapperClass)
          .html(this.tooltipText)
          .appendTo($tooltip);
        if (this.settings.bubbleArrow) {
          $('<div/>')
            .addClass(this.settings.bubbleArrowClass)
            .appendTo($tooltip);
        }
        if (this.settings.closeButton) {
          $('<button/>')
            .addClass(this.settings.closeButtonClass)
            .appendTo($tooltip)
            .on(getNamespacedEvent('click'), this.hide);
        }
        this.$tooltip = $tooltip.appendTo('body');
        this.updateTooltipDimensions();
      }

    },

    /**
     * remove tooltip from DOM
     * @returns {undefined}
     */
    remove: function() {

      if (this.$tooltip) {
        this.$tooltip.remove();
      }

    },

    /**
     * shows the tooltip
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    show: function() {

      if (this.$tooltip && !this.active) {
        this.$element.trigger(getNamespacedEvent('beforeShow'));
        this.$tooltip
          .addClass(this.settings.tooltipClass + this.settings.tooltipClassActiveModifier)
          .stop()
          .fadeIn(this.settings.fadeDuration);
        this.active = true;
      }

    },

    /**
     * hides the tooltip
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    hide: function() {

      if (this.active) {
        this.$tooltip
          .removeClass(this.settings.tooltipClass + this.settings.tooltipClassActiveModifier)
          .stop()
          .fadeOut(this.settings.fadeDuration);
        this.active = false;
        this.$element.trigger(getNamespacedEvent('afterHide'));
      }

    },

    /**
     * handles browser resizing
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    handleResize: function(event) {

      var self = event.data;
      self.hide();
      clearTimeout(self.resizeTimeout);
      self.resizeTimeout = setTimeout(function() {
        self.updateTooltipDimensions();
      }, throttle);

    },

    /**
     * adds event handlers
     * @returns {undefined}
     */
    addEventListeners: function() {

      this.$element
        .on(getNamespacedEvent('mouseenter'), null, this, handleMouseEnter)
        .on(getNamespacedEvent('touchstart'), null, this, handleMouseEnter);

      if (!this.settings.stick) {
        this.$element.on(getNamespacedEvent('mouseleave'), null, this, handleMouseLeave);
      }

      $(window).on(getNamespacedEvent('resize'), null, this, this.handleResize);

    },

    /**
     * destroys this instance of tooltip
     * @returns {undefined}
     */
    destroy: function() {

      this.remove();
      this.$element
        .off('.' + pluginName)
        .removeData('plugin_' + pluginName);

    }

  };

  function updateViewportDimensions() {

    var $window = $(window);
    var height = $window.height();
    var scrollTop = $window.scrollTop();
    viewport = {
      width: $window.width(),
      height: height,
      top: scrollTop,
      bottom: scrollTop + height
    };

  }

  function handleMouseEnter(event) {

    var self = event.data;
    self.create();
    self.setDimensions();
    self.show();

  }

  function handleMouseLeave(event) {

    event.data.hide();

  }

  function handleResize() {

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      updateViewportDimensions();
    }, throttle);

  }

  function handleScroll() {

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      updateViewportDimensions();
    }, throttle);

  }

  function addEventListeners() {

    $(window)
      .on('resize', handleResize)
      .on('scroll', handleScroll);

  }

  function getNamespacedEvent(eventName) {
    return eventName + '.' + pluginName;
  }

  function init() {
    updateViewportDimensions();
    addEventListeners();
  }

  init();

  $.fn[pluginName] = function(options) {

    return this.each(function() {

      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTTooltip(this, options));
      }

    });

  };

})(jQuery, window);
