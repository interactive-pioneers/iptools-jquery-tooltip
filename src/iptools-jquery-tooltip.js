;(function($, window) {

  'use strict';

  var pluginName = 'iptTooltip';
  var defaults = {
    margin: 5,
    maxWidth: 264
  };
  var tooltipID = 'js_tooltip';

  /**
   * IPTTooltip
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   */
  function IPTTooltip(element, options) {

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.tooltipText = this.element.attr('data-tooltip-text');

    this.element.css({ 'white-space': 'nowrap' });

    if ($('#' + tooltipID).length === 0) {
      $('<div id="' + tooltipID + '" class="tooltip"></div>').appendTo('body');
    }
    this.tooltip = $('#' + tooltipID);

    this.addEventHandlers();

  }

  IPTTooltip.prototype = {

    /**
     * sets position, height and width of the tooltip
     * @param {event} event - jQuery event
     * @returns {void}
     */
    setDimensions: function(event) {

      var self = event.data;

      self.tooltip.css({
        top: 'auto',
        left: 'auto',
        'max-width': self.settings.maxWidth
      });

      var viewportWidth = $(window).width();
      var tooltipWidth = self.tooltip.outerWidth();
      var tooltipHeight = self.tooltip.outerHeight();
      var targetWidth = self.element.outerWidth();
      var targetHeight = self.element.outerHeight();
      var targetX = self.element[0].offsetLeft;
      var targetY = self.element[0].offsetTop;

      if (tooltipWidth > viewportWidth) {
        tooltipWidth = viewportWidth;
        self.tooltip.css('max-width', viewportWidth);
      }

      var positionY = 'top';
      var positionX = 'right';
      var posLeft = targetX + targetWidth + self.settings.margin;
      var posTop  = targetY - tooltipHeight - self.settings.margin;

      if (posLeft + tooltipWidth > viewportWidth) {
        posLeft = targetX - tooltipWidth - self.settings.margin;
        positionX = 'left';
      }

      if (posLeft < 0) {
        posLeft = targetX + (targetWidth - tooltipWidth) * 0.5;
        positionX = 'center';
      }

      if (posLeft < 0 || posLeft + tooltipWidth > viewportWidth) {
        posLeft = (viewportWidth - tooltipWidth) * 0.5;
        positionX = 'center';
      }

      if (posTop < 0) {
        posTop = targetY + targetHeight + self.settings.margin;
        positionY = 'bottom';
      }

      self.tooltip.css({ left: posLeft, top: posTop })
                  .removeClass('tooltip--top-right tooltip--top-center tooltip--top-left tooltip--bottom-right tooltip--bottom-center tooltip--bottom-left')
                  .addClass('tooltip--' + positionY + '-' + positionX);

    },

    /**
     * shows the tooltip
     * @param {event} event - jQuery event
     * @returns {void}
     */
    show: function(event) {

      var self = event.data;
      self.tooltip.addClass('tooltip--active');

    },

    /**
     * hides the tooltip
     * @param {event} event - jQuery event
     * @returns {void}
     */
    hide: function(event) {

      var self = event.data;
      self.tooltip.removeClass('tooltip--active');

    },

    /**
     * handles mouseenter event on linked element
     * @param {event} event - jQuery event
     * @returns {void}
     */
    handleMouseEnter: function(event) {

      var self = event.data;
      var text = self.tooltipText;
      if (text && text !== '') {
        self.tooltip.html(text);
        self.setDimensions(event);
        self.show(event);
      }

    },

    /**
     * adds event handlers
     * @returns void
     */
    addEventHandlers: function() {

      this.element.on('mouseenter', null, this, this.handleMouseEnter)
                  .on('mouseleave', null, this, this.hide);
      
      this.tooltip.off('click.tooltip').on('click.tooltip', null, this, this.hide);

      $(window).off('resize.tooltip').on('resize.tooltip', null, this, this.setDimensions);

    }

  };

  $.fn[ pluginName ] = function (options) {

    return this.each(function() {

      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTTooltip(this, options));
      }

    });

  };

})(jQuery, window);