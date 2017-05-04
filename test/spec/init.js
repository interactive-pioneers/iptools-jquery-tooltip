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

    var $trigger = null;
    var $tooltip = null;
    var object = null;
    var selector = '.js_tooltip';

    describe('init', function() {

      beforeEach(function() {
        $trigger = $('.js_tooltip').iptTooltip(config);
      });

      afterEach(function() {
        $trigger.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect($trigger.data(pluginName)).to.be.an.object;
      });

      it('expected to set margin to ' + config.margin, function() {
        return expect($trigger.data(pluginName).settings.margin).to.equal(config.margin);
      });

      it('expected to set maxWidth to ' + config.maxWidth, function() {
        return expect($trigger.data(pluginName).settings.maxWidth).to.equal(config.maxWidth);
      });

    });

    describe('open', function() {

      beforeEach(function() {
        $trigger = $(selector).iptTooltip(config);
        tooltip = $('#js_tooltip');
      });

      afterEach(function() {
        $trigger.data(pluginName).destroy();
      });

      it('expected to have class tooltip--active', function(done) {
        $trigger.trigger('mouseenter');
        $tooltip = $trigger.data(pluginName).$tooltip;
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--active')).to.be.ok;
        }, config.delay + 5);
      });

      it('expected to have class tooltip--top-left', function(done) {
        $trigger.css({
          position: 'absolute',
          bottom: 0,
          right: 0
        }).trigger('mouseenter');
        $tooltip = $trigger.data(pluginName).$tooltip;
        setTimeout(function() {
          done();
          return expect($tooltip.hasClass('tooltip--top-left')).to.be.ok;
        }, config.delay + 5);
      });

    });

    describe('close', function() {

      beforeEach(function() {
        $trigger = $('.js_tooltip').iptTooltip(config);
      });

      afterEach(function() {
        $trigger.data(pluginName).destroy();
      });

      it('expected to not have class tooltip--active', function() {
        $trigger
          .trigger('mouseenter')
          .trigger('mouseleave');
        $tooltip = $trigger.data(pluginName).$tooltip;
        return expect($tooltip.hasClass('tooltip--active')).to.be.not.ok;
      });

    });

  });
})();
