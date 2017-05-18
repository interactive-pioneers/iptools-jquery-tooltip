'use strict';

/* global describe, expect, it, beforeEach, afterEach */

(function() {

  describe('iptTooltip', function() {

    var config = {
      delay: 0,
      margin: 10,
      maxWidth: 200
    };
    var pluginName = 'plugin_iptTooltip';
    var $tooltip = null;
    var selector = '.js_tooltip';

    describe('init', function() {

      beforeEach(function() {
        $tooltip = $(selector).iptTooltip(config);
      });

      afterEach(function() {
        $tooltip.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect($tooltip.data(pluginName)).to.be.an.object;
      });

      it('expected to set margin to ' + config.margin, function() {
        return expect($tooltip.data(pluginName).settings.margin).to.equal(config.margin);
      });

      it('expected to set maxWidth to ' + config.maxWidth, function() {
        return expect($tooltip.data(pluginName).settings.maxWidth).to.equal(config.maxWidth);
      });

    });

    describe('close', function() {

      beforeEach(function() {
        $tooltip = $(selector).iptTooltip(config);
      });

      afterEach(function() {
        $tooltip.data(pluginName).destroy();
      });

      it('expected to not have class tooltip--active', function() {
        $tooltip.trigger('mouseenter').trigger('mouseleave');
        return expect($tooltip.hasClass('tooltip--active')).to.be.not.ok;
      });

    });

  });
})();
