;(function($, window) {

  'use strict';

  var pluginName = 'iptTooltip';
  var defaults = {
    margin: 5,
    maxWidth: 264,
    tooltipClass: 'tooltip',
    tooltipClassActiveModifier: '--active',
    tooltipID: 'js_tooltip',
    dataAttrTooltipText: 'data-tooltip-text',
    hookInsertHtml: function(html) { return html; }
  };

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

    this.tooltipText = this.element.attr(this.settings.dataAttrTooltipText);

    this.element.css({'white-space': 'nowrap'});

    if ($('#' + this.settings.tooltipID).length === 0) {
      $('<div/>', {
        id: this.settings.tooltipID,
        class: this.settings.tooltipClass
      }).appendTo('body');
    }
    this.tooltip = $('#' + this.settings.tooltipID);

    this.active = false;
    this.resizeTimeout = null;

    this.addEventListeners();

  }

  IPTTooltip.prototype = {

    /**
     * sets position, height and width of the tooltip
     * @returns {undefined}
     */
    setDimensions: function() {

      this.tooltip.css({
        top: 'auto',
        left: 'auto',
        'max-width': this.settings.maxWidth
      });

      var viewportWidth = $(window).width();
      var tooltipWidth = this.tooltip.outerWidth();
      var tooltipHeight = this.tooltip.outerHeight();
      var targetWidth = this.element.outerWidth();
      var targetHeight = this.element.outerHeight();
      var targetOffset = this.element.offset();
      var targetX = targetOffset.left;
      var targetY = targetOffset.top;
      if (tooltipWidth > viewportWidth) {
        tooltipWidth = viewportWidth;
        this.tooltip.css('max-width', viewportWidth);
      }

      var positionY = 'top';
      var positionX = 'right';
      var posLeft = targetX + targetWidth + this.settings.margin;
      var posTop  = targetY - tooltipHeight - this.settings.margin;

      if (posLeft + tooltipWidth > viewportWidth) {
        posLeft = targetX - tooltipWidth - this.settings.margin;
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

      if (posTop < $(window).scrollTop()) {
        posTop = targetY + targetHeight + this.settings.margin;
        positionY = 'bottom';
      }

      this.tooltip
        .css({left: posLeft, top: posTop})
        .removeClass('tooltip--top-right')
        .removeClass('tooltip--top-center')
        .removeClass('tooltip--top-left')
        .removeClass('tooltip--bottom-right')
        .removeClass('tooltip--bottom-center')
        .removeClass('tooltip--bottom-left')
        .addClass(this.settings.tooltipClass + '--' + positionY + '-' + positionX);

    },

    /**
     * shows the tooltip
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    show: function(event) {

      var self = event.data;
      self.tooltip
        .addClass(self.settings.tooltipClass + self.settings.tooltipClassActiveModifier);
      self.active = true;

    },

    /**
     * hides the tooltip
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    hide: function(event) {

      var self = event.data;
      self.tooltip
        .removeClass(self.settings.tooltipClass + self.settings.tooltipClassActiveModifier);
      self.active = false;

    },

    /**
     * handles mouseenter event on linked elements
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    handleMouseEnter: function(event) {

      var self = event.data;
      var text = self.tooltipText;
      if (text && text !== '') {
        self.tooltip.html(self.settings.hookInsertHtml(text));
        self.setDimensions();
        self.show(event);
      }

    },

    /**
     * handles browser resizing
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    handleResize: function(event) {

      var self = event.data;
      clearTimeout(self.resizeTimeout);
      self.resizeTimeout = setTimeout(function() {
        self.setDimensions();
      }, 250);

    },

    /**
     * adds event handlers
     * @returns {undefined}
     */
    addEventListeners: function() {

      this.element
        .on('mouseenter' + '.' + this._name, null, this, this.handleMouseEnter)
        .on('mouseleave' + '.' + this._name, null, this, this.hide);

      this.tooltip
        .off('click' + '.' + this._name)
        .on('click' + '.' + this._name, null, this, this.hide);

      $(window)
        .off('resize' + '.' + this._name)
        .on('resize' + '.' + this._name, null, this, this.handleResize);

    },

    destroy: function() {

      this.element.off('mouseenter' + '.' + this._name);
      this.element.removeData('plugin_' + pluginName);

    }

  };

  $.fn[pluginName] = function(options) {

    return this.each(function() {

      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTTooltip(this, options));
      }

    });

  };

})(jQuery, window);
