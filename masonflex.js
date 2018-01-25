/** @preserve MasonFlexJS - v.1.0.0-rc.1
 *
 * https://github.com/hannasm/masonflexjs
 **/
(function () {
  var MasonFlex = function () {
    function MasonFlex(el, options) {
      this.visible = true;
      this.rootMargin = options.rootMargin || '10px';
      this.threshold = options.threshold || '0.001';
			this.panelClass = options.panelClass || 'masonflex-panel';
			this.padClass = options.padClass || 'masonflex-pad';
      this.container = el;
      this.state = {
        heights: []
      };
      this.layout();

      this.listenResize();
      this.listenVisibility();
      this.listenDomChange();
    }
    /**
      * Reset the layout by removing padding elements, resetting heights
      * reference and removing the container inline style
    */

    MasonFlex.prototype.__reset = function __reset() {
      var container = this.container;

      this.state.heights = [];
      var fillers = container.querySelectorAll('.' + this.padClass);
      if (fillers.length) {
        for (var f = 0; f < fillers.length; f++) {
          fillers[f].parentNode.removeChild(fillers[f]);
        }
      }
      this.panels = container.children;
      for (var i = 0; i < this.panels.length; i++) {
        var panel = this.panels[i];
        if (panel.nodeType == 3) {
          //container.removeChild(panel);
          panels[i] = null;
        } else if (panel.matches && !panel.matches('.' + this.panelClass)) {
          panel.className += ' ' + this.panelClass;
        }
      }

      container.removeAttribute('style');
    };
    /**
      * Iterate through panels and work out the height of the layout
    */
    MasonFlex.prototype.__populateHeights = function __populateHeights() {
      var panels = this.panels;
      var state = this.state;
      var heights = state.heights;
      var _ccs = getComputedStyle(this.container);
      var cw = parseFloat(_ccs.width);

      var mw = null;
      var mph = null;
      var pp = [];
      for (var p = 0; p < panels.length; p++) {
        var panel = panels[p];
        if (panel == null) { continue; }

        var _getComputedStyle = getComputedStyle(panel);

        // this happens with certain un-rendered content like script nodes, and we just
        // ignore it
        if (_getComputedStyle.height == 'auto' ||
            _getComputedStyle.width == 'auto') { continue; }

        var cssOrder = _getComputedStyle.order;
        var msFlexOrder = _getComputedStyle.msFlexOrder;
        var height = Math.ceil(parseFloat(_getComputedStyle.height));
        height += parseFloat(_getComputedStyle.marginBottom);
        height += parseFloat(_getComputedStyle.marginTop);

        var width = parseFloat(_getComputedStyle.width);
        mw = Math.min(mw || width, width);
        mph = Math.min(mph || height, height);
        pp.push( {
          index: p,
          panel: panel,
          height: height,
          width: width
        });
      }

      var colCount = Math.floor(cw / mw);
      for (var j = 0; j < colCount; j++) {
        heights[j] = 0; 
      }
      // prefer leftermore column unless there is a somewhat significant gap between images
      var mph2 = Math.floor(mph / 2);
      for (var p = 0; p < pp.length; p++) {
        var mi = null; var mh = null;
        for (var j = 0; j < colCount; j++) {
          if (mh == null || mh-mph2 > heights[j]) {
            mi = j;
            mh = heights[j];
          }
        }
        heights[mi] += pp[p].height;
        pp[p].panel.style.order = mi + 1;
        pp[p].panel.style.msFlexOrder = mi + 1;
      }
    };
    /**
      * Set the layout height based on referencing the content cumulative height
      * This probably doesn't need its own function but felt right to be nice
      * and neat
    */

    MasonFlex.prototype.__setLayout = function __setLayout() {
      var _Math;

      var container = this.container;
      var state = this.state;
      var heights = state.heights;

      this.state.maxHeight = (_Math = Math).max.apply(_Math, heights);
      container.style.height = Math.ceil(this.state.maxHeight) + 'px';
    };
    /**
      * Pad out layout "columns" with padding elements that make heights equal
    */

    MasonFlex.prototype.__pad = function __pad() {
      var container = this.container;
      var _state = this.state;
      var heights = _state.heights;
      var maxHeight = _state.maxHeight;
			var padClass = this.padClass;

      heights.map(function (height, idx) {
        if (height < maxHeight && height > 0) {
          var pad = document.createElement('div');
          pad.className = padClass;
          pad.style.height = maxHeight - height + 'px';
          pad.style.order = idx + 1;
          pad.style.msFlexOrder = idx + 1;
          container.appendChild(pad);
        }
      });
    };
    /**
      * Resets and lays out elements
    */

    MasonFlex.prototype.layout = debounce(function layout() {
      if (!this.visible) { return; }

      this.__reset();
      this.__populateHeights();
      this.__setLayout();
      this.__pad();
    }, 250);

    MasonFlex.prototype.observeIntersection = function(entries, observer) {
      var oldVisible = this.visible;
      for (var i = 0; i<entries.length; i++) {
        var intersect = entries[i];
        if (!intersect.isIntersecting) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
      if (this.visible && !this.oldVisible) {
        this.layout();
      }
    };
    MasonFlex.prototype.listenVisibility = function() {
      var self = this;
      var evtHandler = function (entries, observer) {
        self.observeIntersection(entries, observer);
      }
      var obs = new IntersectionObserver(evtHandler, {
        root: null,
        rootMargin: this.rootMargin,
        threshold: this.threshold
      });
      obs.observe(this.container);
    };
		MasonFlex.prototype.listenResize = function () {
			var _self = this;
			window.addEventListener('resize', function () {
				return _self.layout();
			});
		};

		MasonFlex.prototype.listenDomChange = function () {
			if (!MutationObserver) { throw 'MutationObserver polyfill required'; }
			var _self = this;

			var obs = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (!mutation.target) { continue; }
          // style is changed by masonflex to set height, need to ignore this
          if (mutation.type == 'attributes' && mutation.attributeName == 'style') { 
            var skip = false;
            if (mutation.target == _self.container) { continue; }
            for (var j = 0; j < _self.panels.length; j++) {
              if (mutation.target == _self.panels[j]) { skip = true; break; }
            }
            if (skip) { continue; }
          }
          // ignore addition / removal of padding elements
          if (mutation.type == 'childList' && mutation.target == _self.container) {
            var skip = true;
            for (var j = 0; j < mutation.addedNodes.length; j++) {
              var added = mutation.addedNodes[j];
              if (added.nodeType == 3 && added.textContent.trim() == '') { continue; }
              if (added.matches('.' + _self.padClass)) { continue; }
              skip = false;
            }
            for (var j = 0; j < mutation.removedNodes.length; j++) {
              var removed = mutation.removedNodes[j];
              if (removed.nodeType == 3 && removed.textContent.trim() == '') { continue; }
              if (removed.matches('.' + _self.padClass)) { continue; }
              skip = false;
            }
            if (skip) { continue; }
          }
          // we shamelessly call this on any change we haven't filtered out above, and let debounce() regulate
          _self.layout();
          return;
        }
      });
      obs.observe(this.container, { subtree: true, childList: true, attributes: true, characterData: true });
		};

    return MasonFlex;
  }();
	window.MasonFlex = MasonFlex;
})();
/** @license MIT License

Copyright (c) 2017 Sean Hanna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
