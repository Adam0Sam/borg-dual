/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
(function(){var a=!1,b=/xyz/.test(function(){})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(c){function g(){!a&&this.init&&this.init.apply(this,arguments)}var d=this.prototype;a=!0;var e=new this;a=!1;for(var f in c)e[f]="function"==typeof c[f]&&"function"==typeof d[f]&&b.test(c[f])?function(a,b){return function(){var c=this._super;this._super=d[a];var e=b.apply(this,arguments);return this._super=c,e}}(f,c[f]):c[f];return g.prototype=e,g.prototype.constructor=g,g.extend=arguments.callee,g}})();


/* jquery.event.drag - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 * Requires jQuery >= 1.7.0
 */
(function(a){a.fn.drag=function(b,c,d){var e="string"==typeof b?b:"",f=a.isFunction(b)?b:a.isFunction(c)?c:null;return 0!==e.indexOf("drag")&&(e="drag"+e),d=(b==f?c:d)||{},f?this.bind(e,d,f):this.trigger(e)};var b=a.event,c=b.special,d=c.drag={defaults:{which:1,distance:0,not:":input",handle:null,relative:!1,drop:!0,click:!1},datakey:"dragdata",noBubble:!0,add:function(b){var c=a.data(this,d.datakey),e=b.data||{};c.related+=1,a.each(d.defaults,function(a){void 0!==e[a]&&(c[a]=e[a])})},remove:function(){a.data(this,d.datakey).related-=1},setup:function(){if(!a.data(this,d.datakey)){var c=a.extend({related:0},d.defaults);a.data(this,d.datakey,c),b.add(this,"touchstart mousedown",d.init,c),this.attachEvent&&this.attachEvent("ondragstart",d.dontstart)}},teardown:function(){var c=a.data(this,d.datakey)||{};c.related||(a.removeData(this,d.datakey),b.remove(this,"touchstart mousedown",d.init),d.textselect(!0),this.detachEvent&&this.detachEvent("ondragstart",d.dontstart))},init:function(e){if(!d.touched){var g,f=e.data;if(!(0!=e.which&&f.which>0&&e.which!=f.which||a(e.target).is(f.not)||f.handle&&!a(e.target).closest(f.handle,e.currentTarget).length||(d.touched="touchstart"==e.type?this:null,f.propagates=1,f.mousedown=this,f.interactions=[d.interaction(this,f)],f.target=e.target,f.pageX=e.pageX,f.pageY=e.pageY,f.dragging=null,g=d.hijack(e,"draginit",f),!f.propagates)))return g=d.flatten(g),g&&g.length&&(f.interactions=[],a.each(g,function(){f.interactions.push(d.interaction(this,f))})),f.propagates=f.interactions.length,f.drop!==!1&&c.drop&&c.drop.handler(e,f),d.textselect(!1),d.touched?b.add(d.touched,"touchmove touchend",d.handler,f):b.add(document,"mousemove mouseup",d.handler,f),!d.touched||f.live?!1:void 0}},interaction:function(b,c){var e=a(b)[c.relative?"position":"offset"]()||{top:0,left:0};return{drag:b,callback:new d.callback,droppable:[],offset:e}},handler:function(e){var f=e.data;switch(e.type){case!f.dragging&&"touchmove":e.preventDefault();case!f.dragging&&"mousemove":if(Math.pow(e.pageX-f.pageX,2)+Math.pow(e.pageY-f.pageY,2)<Math.pow(f.distance,2))break;e.target=f.target,d.hijack(e,"dragstart",f),f.propagates&&(f.dragging=!0);case"touchmove":e.preventDefault();case"mousemove":if(f.dragging){if(d.hijack(e,"drag",f),f.propagates){f.drop!==!1&&c.drop&&c.drop.handler(e,f);break}e.type="mouseup"}case"touchend":case"mouseup":default:d.touched?b.remove(d.touched,"touchmove touchend",d.handler):b.remove(document,"mousemove mouseup",d.handler),f.dragging&&(f.drop!==!1&&c.drop&&c.drop.handler(e,f),d.hijack(e,"dragend",f)),d.textselect(!0),f.click===!1&&f.dragging&&a.data(f.mousedown,"suppress.click",(new Date).getTime()+5),f.dragging=d.touched=!1}},hijack:function(c,e,f,g,h){if(f){var k,m,o,i={event:c.originalEvent,type:c.type},j=e.indexOf("drop")?"drag":"drop",l=g||0,p=isNaN(g)?f.interactions.length:g;c.type=e,c.originalEvent=null,f.results=[];do if(m=f.interactions[l]){if("dragend"!==e&&m.cancelled)continue;o=d.properties(c,f,m),m.results=[],a(h||m[j]||f.droppable).each(function(g,h){return o.target=h,c.isPropagationStopped=function(){return!1},k=h?b.dispatch.call(h,c,o):null,k===!1?("drag"==j&&(m.cancelled=!0,f.propagates-=1),"drop"==e&&(m[j][g]=null)):"dropinit"==e&&m.droppable.push(d.element(k)||h),"dragstart"==e&&(m.proxy=a(d.element(k)||m.drag)[0]),m.results.push(k),delete c.result,"dropinit"!==e?k:void 0}),f.results[l]=d.flatten(m.results),"dropinit"==e&&(m.droppable=d.flatten(m.droppable)),"dragstart"!=e||m.cancelled||o.update()}while(p>++l);return c.type=i.type,c.originalEvent=i.event,d.flatten(f.results)}},properties:function(a,b,c){var e=c.callback;return e.drag=c.drag,e.proxy=c.proxy||c.drag,e.startX=b.pageX,e.startY=b.pageY,e.deltaX=a.pageX-b.pageX,e.deltaY=a.pageY-b.pageY,e.originalX=c.offset.left,e.originalY=c.offset.top,e.offsetX=e.originalX+e.deltaX,e.offsetY=e.originalY+e.deltaY,e.drop=d.flatten((c.drop||[]).slice()),e.available=d.flatten((c.droppable||[]).slice()),e},element:function(a){return a&&(a.jquery||1==a.nodeType)?a:void 0},flatten:function(b){return a.map(b,function(b){return b&&b.jquery?a.makeArray(b):b&&b.length?d.flatten(b):b})},textselect:function(b){a(document)[b?"unbind":"bind"]("selectstart",d.dontstart).css("MozUserSelect",b?"":"none"),document.unselectable=b?"off":"on"},dontstart:function(){return!1},callback:function(){}};d.callback.prototype={update:function(){c.drop&&this.available.length&&a.each(this.available,function(a){c.drop.locate(this,a)})}};var e=b.dispatch;b.dispatch=function(b){return a.data(this,"suppress."+b.type)-(new Date).getTime()>0?(a.removeData(this,"suppress."+b.type),void 0):e.apply(this,arguments)};var f=b.fixHooks.touchstart=b.fixHooks.touchmove=b.fixHooks.touchend=b.fixHooks.touchcancel={props:"clientX clientY pageX pageY screenX screenY".split(" "),filter:function(b,c){if(c){var d=c.touches&&c.touches[0]||c.changedTouches&&c.changedTouches[0]||null;d&&a.each(f.props,function(a,c){b[c]=d[c]})}return b}};c.draginit=c.dragstart=c.dragend=d})(jQuery);


/* json2.js
 * 2012-10-08
 * Public Domain.
 */
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?i+"":"null";case"boolean":case"null":return i+"";case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text+="",cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();


/* Math.random with seed
 * By David Bau http://davidbau.com/encode/seedrandom.js
 * BSD Licensed.
 */
(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)if(a.hasOwnProperty(e))try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a.document,a.history,a.navigator,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);


/* Array Remove - By John Resig (MIT Licensed) */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/* Check if something is a number */
function isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}


/* Components for tasks
 * By Rimvydas Naktinis
 * MIT Licensed.
 */
(function() {
    var Collection = Class.extend({
        init: function(parent, params) {
            // Parse parameters
            // Parameter value can be a tuple (type, value)
            // or just the value: string, boolean, number, function.
            var that = this;
            this.parsed_params = {};
            $.each(params, function(key, value) {
                if (typeof value != 'object')
                    that.parsed_params[key] = value;
                else if (value[0] == 'javascript')
                    try {
                        that.parsed_params[key] = eval(value[1]);
                    } catch (e) {
                        that.parsed_params[key] = null;
                    }
                else if (value[1] == 'number')
                    that.parsed_params[key] = parseFloat(value[1]);
                else
                    that.parsed_params[key] = value[1];
            });
            var defaults = {
                width: 500,
                height: 500,
                seed: false,
                loaded: function() {}
            };
            this.params = $.extend(defaults, this.parsed_params);
            this.parent = parent;
            this.components = [];
            this.visuals = [];

            this.box = $('<div class="componental-task"></div>');
            this.box.width(this.params.width);
            this.box.height(this.params.height);

            this.canvas_container = $('<div class="canvas-container"></div>')
                    .appendTo(this.box)
                    .css('position', 'absolute')
                    .css('left', 0).css('right', 0).css('top', 0).css('bottom', 0);
            this.canvas = Raphael(this.canvas_container[0], "100%", "100%");

            // Subpixel fix
            this.canvas.canvas.setAttribute('shape-rendering', 'crispEdges');

            this.box.click(function(e) {
                var parentOffset = $(this).parent().offset();
                var relX = e.pageX - parentOffset.left;
                var relY = e.pageY - parentOffset.top;

                // Ask all components if they were clicked and trigger
                // their click event handlers if so
                $.each(that.components, function() {
                    if (this.pointInside(relX, relY)) {
                        this.params.click.call(this, relX, relY);
                    }
                });
            });
        },

        images_loaded: function() {
            // Called after images are loaded
            $(this.parent).empty();
            $(this.parent).append(this.box);
        },

        load: function(seed, mode) {
            // Set random seed
            this.params.seed = seed;
            if (this.params.seed)
                Math.seedrandom(this.params.seed);

            // Prepare images for preloading
            var that = this;
            var image_loaded = {};
            var image_element = {};
            $.each(this.params, function() {
                if (this.toString().match(/\.(jpeg|jpg|gif|png)$|^data:image\//i)) {
                    image_loaded[this] = false;
                }
            });
            function is_image_url(url, callback) {
                image_element[url] = $("<img>", {
                    src: url,
                    error: function() { callback(url, false); },
                    load: function() { callback(url, true); }
                });
            }
            $.each(image_loaded, function(img_url) {
                is_image_url(img_url, function(url, answer) {
                    image_loaded[url] = answer;
                });
            });

            // Wait for the images to load and call onload
            this.loaded = false;
            function image_waiter() {
                var all_loaded = true;
                $.each(image_loaded, function(img_url, loaded) {
                    all_loaded = all_loaded && (loaded || image_element[img_url][0].naturalHeight > 0);
                });
                if (!all_loaded) {
                    setTimeout(image_waiter, 10);
                } else {
                    that.loaded = true;

                    // Initialize container
                    that.images_loaded();

                    // Run client code
                    that.params.loaded();
                }
            };
            setTimeout(image_waiter, 20);
            return this;
        },

        unload: function() {
            $('.componental-task', this.parent).remove();
        },

        result: function() {
            var results = [];
            var that = this;
            $.each(this.components, function(index, component) {
                if (component.params.answer &&
                    (!that.params.answer_components ||
                     $.inArray(component.name, that.params.answer_components) != -1)) {
                    if (component.params.name) {
                        var result = {};
                        result[component.params.name] = component.state().value;
                        results.push(result);
                    } else {
                        results.push(component.state().value);
                    }
                }
            });
            return JSON.stringify(results);
        },

        size: function() {
            return {width: this.canvas_container.width(),
                    height: this.canvas_container.height()};
        }
    });

    this.Task = function(parent, params) {
        var collection = new Collection(parent, params);

        /* Component
        */
        var Component = Class.extend({
            init: function(params) {
                this.collection = collection;
                this.collection.components.push(this);

                var defaults = {
                    x: 0, y: 0,
                    name: null,
                    value: null,
                    click: function() { }
                };

                this.params = $.extend(defaults, params);
                this.name = this.params.name;
                this.value = this.params.value;
            },

            state: function() {
                return {name: this.name,
                        value: this.value};
            },

            pointInside: function(x, y) {
                return Raphael.isPointInsideBBox(this.bbox(), x, y);
            },

            // Compute the overlap area of two BoundingBoxes (to decide on
            // which component to drop when there are several)
            overlapArea: function(otherComponent) {
                var bbox1 = this.bbox();
                var bbox2 = otherComponent.bbox();
                var xol = Math.max(0, Math.min(bbox1.x + bbox1.width, bbox2.x + bbox2.width) - Math.max(bbox1.x, bbox2.x));
                var yol = Math.max(0, Math.min(bbox1.y + bbox1.height, bbox2.y + bbox2.height) - Math.max(bbox1.y, bbox2.y));
                return xol * yol;
            },

            render: function() {
                if (this.params.full_width)
                    this.params.width = this.collection.params.width;

                if (this.params.draggable && !this.draggable)
                    this.draggable = this.make_draggable();

                if (this.params.droppable && !this.droppable)
                   this.droppable = this.make_droppable();
            },

            make_draggable: function(params) {
                var collection = this.collection;
                var component = this;
                var bbox = component.bbox();
                var defaults = {
                    bounds: {
                        x1: 2, x2: collection.size().width - bbox.width - 2,
                        y1: 2, y2: collection.size().height - bbox.height - 2
                    },
                    come_back: 'start'
                };
                params = $.extend(defaults, params);
                var start_x, start_y;
                var previous_x, previous_y;

                if (typeof this.drag != "undefined") {
                    var activeDroppable = null;
                    var start = function() {
                        if (typeof this.toFront != "undefined")
                            this.toFront();
                        this.ox = component.bbox().x;
                        this.oy = component.bbox().y;
                        start_x = start_x ? start_x : this.ox;
                        start_y = start_y ? start_y : this.oy;
                        previous_x = previous_x ? previous_x : this.ox;
                        previous_y = previous_y ? previous_y : this.oy;
                    },
                    move = function(dx, dy) {
                        var bbox = component.bbox();
                        var x = Math.max(params.bounds.x1, this.ox + dx);
                        var y = Math.max(params.bounds.y1, this.oy + dy);
                        x = Math.min(x, params.bounds.x2);
                        y = Math.min(y, params.bounds.y2);

                        // Detect overlaps
                        $.each(collection.components, function() {
                            if (!(this instanceof Droppable)) {
                                return true;
                            }
                            if (Raphael.isBBoxIntersect(bbox, this.bbox())) {
                                if (activeDroppable && activeDroppable != this && !this.activeDraggable) {
                                    // Only if more overlap
                                    if (component.overlapArea(activeDroppable) < component.overlapArea(this)) {
                                        activeDroppable.draggedOut(component);
                                        activeDroppable = this;
                                        activeDroppable.draggedOver(component);
                                    }
                                } else if (!this.activeDraggable) {
                                    activeDroppable = this;
                                    activeDroppable.draggedOver(component);
                                }
                            } else if (this == activeDroppable) {
                                activeDroppable.draggedOut(component);
                                activeDroppable = null;
                            }
                        });
                        component.move(x, y);
                    },
                    up = function() {
                        var bbox = component.bbox();
                        var x = bbox.x;
                        var y = bbox.y;

                        // Snap to droppable middle
                        if (activeDroppable) {
                            var dbbox = activeDroppable.bbox();
                            x = previous_x = Math.floor(dbbox.x + (dbbox.width - bbox.width) / 2);
                            y = previous_y = Math.floor(dbbox.y + (dbbox.height - bbox.height) / 2);
                        } else if (params.come_back == 'previous') {
                            x = previous_x;
                            y = previous_y;
                        } else if (params.come_back == 'start') {
                            x = start_x;
                            y = start_y;
                        }
                        component.move(x, y);

                        // After snapping call draggedInto listener
                        if (activeDroppable) {
                            activeDroppable.draggedInto(component);
                        }
                    };
                    this.drag(move, start, up);
                }
                return this;
            },

            make_droppable: function() {
                var that = this;
                var draggedOver = function() {
                    if (that instanceof RaphaelComponent) {
                        that.element.attr({'opacity': 0.7});
                    }
                };
                var draggedOut = function() {
                    if (that instanceof RaphaelComponent) {
                        that.element.attr({'opacity': 1});
                    }
                };
                var draggedInto = function(droppable) {
                    // Clone droppable value into the original component
                    that.value = droppable.value;
                };
                this.droppable = new Droppable({
                    name: this.params.name,
                    answer: this.params.answer,
                    component: this,
                    activeComponent: this,
                    draggedOver: draggedOver,
                    draggedOut: draggedOut,
                    draggedInto: draggedInto});
                this.params.answer = false;
                this.params.name = null;
                return this.droppable;
            }
        });


        /* Turns HTML content into a component
        */
        var HTML = Component.extend({
            init: function(params) {
                this._super(params);
                var defaults = {
                    style: {},
                    height: 'auto'
                };
                this.params = $.extend(defaults, this.params);
                this.html_container = $('<div></div>')
                    .css(this.params.style)
                    .css('position', 'absolute')
                    .css('overflow', 'hidden');
                this.html_container.appendTo(this.collection.box);
                this.render();
            },

            render: function() {
                this._super();
                this.html_container
                    .html(this.params.content || this.params.text || '')
                    .css(this.params.style)
                    .css('left', this.params.x)
                    .css('top', this.params.y)
                    .width(this.params.width)
                    .height(this.params.height);
            },

            bbox: function() {
                var pos = this.html_container.position();
                var width = this.html_container.outerWidth();
                var height = this.html_container.outerHeight();
                return {x: pos.left,
                        y: pos.top,
                        x2: pos.left + width,
                        y2: pos.top + height,
                        width: width,
                        height: height};
            },

            pointInside: function(x, y) {
                // Hidden HTML element position can not be reliably detected
                if (!this.html_container.is(':visible')) {
                    return false;
                }
                return this._super();
            },

            move: function(x, y) {
                this.params.x = x;
                this.params.y = y;
                this.render();
                return this;
            },

            drag: function(move, start, up) {
                this.html_container.css('cursor', 'pointer');

                this.html_container
                    .drag(function(ev, dd) {
                        move(dd.deltaX, dd.deltaY, dd.startX + dd.deltaX, dd.startY + dd.deltaY);
                    }, {relative: true})
                    .drag('start', function(ev, dd) {
                        start();
                    })
                    .drag('end', function(ev, dd) {
                        up();
                    });
            },

            hide: function() {
                this.html_container.hide();
                return this;
            },

            show: function() {
                this.html_container.show();
                return this;
            }
        });


        /* Turns Raphael element into a component
        */
        var RaphaelComponent = Component.extend({
            init: function(params) {
                this._super(params);
                this.element = params.element;
                if (this.element)
                    this.render();
            },

            render: function() {
                this._super();
                this.move(this.params.x, this.params.y);
            },

            bbox: function() {
                return this.element.getBBox();
            },

            move: function(x, y) {
                var x = Math.floor(x);
                var y = Math.floor(y);
                var attr = this.element.attr();
                if (attr.cx) {
                    this.element.attr({cx: x + attr.r,
                                       cy: y + attr.r});
                } else {
                    this.element.attr({x: x, y: y});
                }
                this.params.x = x;
                this.params.y = y;
                return this;
            },

            drag: function(move, start, up) {
                this.element.attr({cursor: 'pointer'});
                this.element.drag(move, start, up);
            },

            hide: function() {
                this.element.hide();
                return this;
            },

            show: function() {
                this.element.show();
                return this;
            }
        });


        /* Rectangle
         */
        var Rectangle = RaphaelComponent.extend({
            init: function(params) {
                this._super(params);
                var defaults = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                this.params = $.extend(defaults, this.params);
                this.element = collection.canvas.rect(this.params.x,
                                                      this.params.y,
                                                      this.params.width,
                                                      this.params.height);
                this.element.attr({stroke: null});
                if (this.params.fill) {
                    this.element.attr({fill: this.params.fill});
                }
                this.render();
            },

            render: function() {
                // Call parent renderer
                this._super();

                // Resize the rectangle
                if (this.element) {
                    this.element.attr({fill: this.params.fill,
                                       width: this.params.width,
                                       height: this.params.height});
                }
            }
        });


        /* Text Field
        */
        var TextField = Component.extend({
            init: function(params) {
                this._super(params);
                this.field = $('<input type="text"/>')
                        .css('position', 'absolute')
                        .css('z-index', 1);
                this.render();
            },

            bbox: function() {
                var pos = this.field.position();
                return {x: pos.left,
                        y: pos.top,
                        width: this.field.outerWidth(),
                        height: this.field.outerHeight()};
            },

            move: function(x, y) {
                this.params.x = x;
                this.params.y = y;
                this.render();
                return this;
            },

            render: function() {
                this._super();
                if (this.params.width);
                    this.field.outerWidth(this.params.width);
                this.field
                    .css('left', this.params.x)
                    .css('top', this.params.y);
                this.field.appendTo(this.collection.box);
            },

            state: function() {
                return {name: this.name,
                        value: this.field.val()};
            }
        });


        /* Image
        */
        var Picture = RaphaelComponent.extend({
            init: function(params) {
                this._super(params);
                this.img = new Image();
                this.img.src = this.params.url;

                var size = this.calc_size();
                this.element = collection.canvas.image(this.params.url,
                        this.params.x,
                        this.params.y,
                        size.width,
                        size.height);

                // Disable default dragging
                this.element.node.onmousedown = function(e) {
                    e.preventDefault();
                };

                this.render();
            },

            calc_size: function() {
                var height = this.params.height ? this.params.height : null;
                var width = this.params.width ? this.params.width : null;
                if (height == null && this.params.width)
                    height = this.img.height / this.img.width * this.params.width;
                if (width == null && this.params.height)
                    width = this.img.width / this.img.height * this.params.height;
                height = height ? height : this.img.height;
                width = width ? width : this.img.width;
                return {width: width,
                        height: height};
            },

            render: function() {
                // Call parent renderer
                this._super();

                // Calculate width and height
                this.img.src = this.params.url;
                var size = this.calc_size();

                // Resize the image
                if (this.element) {
                    this.element.attr({src: this.params.url,
                                       width: size.width,
                                       height: size.height});
                }
            }
        });


        /* Droppable
        */
        var Droppable = Component.extend({
            init: function(params) {
                this._super(params);
                var that = this;
                var defaults = {
                    component: null,
                    activeComponent: null,
                    draggedOver: function() {},
                    draggedOut: function() {},
                    draggedInto: function() {}
                };
                this.params = $.extend(defaults, this.params);

                if (typeof this.params == "undefined" || !this.params.component) {
                    this.params.component = new RaphaelComponent({
                        element: collection.canvas.rect(0, 0, 50, 20)
                    });
                    if (!this.params.activeComponent) {
                        this.params.activeComponent = this.params.component;
                    }
                }

                this.draggedOver = function(draggable) {
                    that.params.component.hide();
                    that.params.activeComponent.show();
                    that.params.draggedOver(that);
                };
                this.draggedOut = function(draggable) {
                    that.activeDraggable = null;
                    that.value = null;
                    that.params.activeComponent.hide();
                    that.params.component.show();
                    that.params.draggedOut(that);
                };
                this.draggedInto = function(draggable) {
                    if (that.activeDraggable == null) {
                        that.activeDraggable = draggable;
                        that.value = draggable.value;
                        that.params.component.hide();
                        that.params.activeComponent.show();
                    }
                    that.params.draggedInto(that);
                };
                this.render();
            },

            bbox: function() {
                return this.params.component.bbox();
            },

            move: function(x, y) {
                this.params.component.move(x, y);
                this.params.activeComponent.move(x, y);
                return this;
            },

            render: function() {
                this._super();
                this.params.activeComponent.hide();
                this.params.component.show();
            },

            state: function() {
                return {name: this.name,
                        value: this.value};
            }
        });


        /*
         * Switch
         *
         * The switch either takes two components (on_state and off_state)
         * to be shown for each state, or draws components from url and text
         * with the specified background colors and padding.
         *
         * If on_state and off_state are given, padding, background, url and
         * text parameters are ignored.
         *
         */
        var Switch = Component.extend({
            init: function(params) {
                this._super(params);
                var defaults = {};
                this.params = $.extend(defaults, this.params);
                this.value = this.params.value != null ? this.params.value : 0;
                this.states = [];
                this.addState(this.params.off_state);
                this.addState(this.params.on_state);
                if (this.states.length) {
                    this.states[0].show();
                }
                this.render();
            },

            addState: function(component) {
                if (component) {
                    this.states.push(component);
                    component.move(this.params.x, this.params.y);
                    component.hide();

                    // Set cursors
                    if (component instanceof RaphaelComponent) {
                        component.element.attr('cursor', 'pointer');
                    } else {
                        component.html_container.css('cursor', 'pointer');
                    }
                }
            },

            getStates: function() {
                // If url given, draw states as images
                var that = this;
                param_state = [this.params.url, this.params.text, this.params.border,
                               this.params.background_on, this.params.background_off,
                               this.params.width, this.params.height];
                if ((this.params.url || this.params.text) && param_state != this.last_param_state) {
                    $.each(this.states, function(index) {
                        this.hide();
                    });
                    var image_part = this.params.url ?
                                     ('<img src="' + this.params.url + '" alt="" style="height:100%"/>') : '';
                    var text_part = this.params.text ? this.params.text : '';
                    var background_on = this.params.background_on ? this.params.background_on : '#83D383';
                    var background_off = this.params.background_off ? this.params.background_off : 'none';
                    var padding = isNumber(this.params.padding) ? this.params.padding : 10;
                    this.states[0] = new HTML({
                        width: this.params.width ? this.params.width - padding * 2 : null,
                        height: this.params.height ? this.params.height - padding * 2: null,
                        style: {background: background_off,
                                padding: padding,
                                border: 'solid #444 1px',
                                'text-align': 'center',
                                'line-height': 'normal'},
                        x: this.params.x, y: this.params.y,
                        content: image_part + text_part});
                    this.states[1] = new HTML({
                        width: this.params.width ? this.params.width - padding * 2 : null,
                        height: this.params.height ? this.params.height - padding * 2: null,
                        style: {padding: padding,
                                background: background_on,
                                border: 'solid #444 1px',
                                'text-align': 'center',
                                'line-height': 'normal'},
                        x: this.params.x, y: this.params.y,
                        content: image_part + text_part});
                    this.states[0].html_container.css('cursor', 'pointer');
                    this.states[1].html_container.css('cursor', 'pointer');
                    this.states[1].hide();
                }

                this.params.click = function() {
                    that.toggle();
                };
                this.last_param_state = param_state;
            },

            render: function() {
                this._super();
                this.getStates();
            },

            toggle: function(state) {
                var old_state = this.value;
                var new_state = typeof state != 'undefined' ? state : (this.value + 1) % this.states.length;
                this.states[this.value].hide();
                this.states[new_state].show();
                this.value = new_state;
                if (old_state != new_state && typeof this.params.change != 'undefined') {
                    this.params.change.call(this, this.value);
                }
            },

            bbox: function() {
                if (!this.states.length)
                    return {
                        x: this.params.x,
                        y: this.params.y,
                        width: 40,
                        height: 40
                    }
                if (typeof this.value != 'undefined') {
                    return this.states[this.value].bbox();
                }
            },

            move: function(x, y) {
                this.params.x = x;
                this.params.y = y;
                $.each(this.states, function() {
                    this.move(x, y);
                });
            }
        });


        /* Switch group
        */
        var SwitchGroup = Component.extend({
            init: function(params) {
                this._super(params);

                var defaults = {
                    switches: [],
                    layout: 'grid',
                    rows: 2,
                    randomize: true,
                    item_padding: 0,
                    padding: {x: 0, y: 0}
                };
                this.params = $.extend(defaults, this.params);

                if (this.params.layout == 'grid') {
                    this.switch_layout = new task.GridLayout(this.params.switches, {
                        x: this.params.x, y: this.params.y,
                        padding: this.params.padding,
                        item_padding: this.params.item_padding,
                        rows: this.params.rows,
                        randomize: this.params.randomize});
                } else {
                    this.switch_layout = new task.LinearLayout(this.params.switches, {
                        x: this.params.x, y: this.params.y,
                        padding: this.params.padding,
                        item_padding: this.params.item_padding,
                        randomize: this.params.randomize});
                }
                this.setListeners();
            },


            setListeners: function() {
                var that = this;
                $.each(this.params.switches, function() {
                    this.params.change = function(state) {
                        if (state) {
                            var current_switch = this;
                            // Turn other switches off
                            $.each(that.params.switches, function() {
                                if (current_switch != this) {
                                    this.toggle(0);
                                }
                            });
                        }
                    };
                });
            },

            render: function() {
                this._super();
                this.switch_layout.render();
            },

            add: function(component) {
                this.params.switches.push(component);
                this.switch_layout.add(component);
                this.setListeners(),
                this.render();
                return component;
            },

            remove: function(component) {
                this.switch_layout.remove(component);
                this.render();
                return component;
            },

            state: function() {
                var active_index = null;
                $.each(this.params.switches, function(index) {
                    if (this.value)
                        active_index = index;
                });
                return {
                    name: this.name,
                    value: active_index
                }
            },

            bbox: function() {
                return this.switch_layout.bbox();
            },

            move: function(x, y) {
                this.switch_layout.move(x, y);
            }
        });


        /* Graph
        */
        var Graph = Component.extend({
            init: function(params) {
                this._super(params);

                var defaults = {
                    drag_bounds: {
                        x1: 2, x2: collection.size().width - 2,
                        y1: 2, y2: collection.size().height - 2
                    },
                    editable: false,
                    vertices: [],
                    edges: [],
                    draggedOver: function() {
                        if (this instanceof RaphaelComponent) {
                            if (typeof this.glow != "undefined")
                                this.glow.remove();
                            this.glow = this.element.glow({color: '#080'});
                        }
                    },
                    draggedOut: function() {
                        if (this instanceof RaphaelComponent) {
                            this.glow.remove();
                        }
                    }
                };
                this.params = $.extend(defaults, this.params);

                var that = this;
                this.vertices = this.params.vertices;
                this.edges = [];
                this.value = {};

                // Initialize predefined edges
                $.each(this.params.edges, function() {
                    that.addEdge(this[0], this[1]);
                });

                // Drag listeners
                if (this.params.editable) {
                    $.each(this.vertices, function(index, vertex) {
                        var edge_drawables;
                        var activeVertex = null;
                        var start = function(x, y) {
                            edge_drawables = that.drawEdge(0, 0, 0, 0);
                            var bbox = vertex.bbox();
                            this.cx = bbox.x + bbox.width / 2;
                            this.cy = bbox.y + bbox.height / 2;
                            this.rx = that.collection.canvas_container.offset().left;
                            this.ry = that.collection.canvas_container.offset().top;
                        },
                        move = function(dx, dy, x, y) {
                            var bbox = vertex.bbox();
                            var x = Math.max(that.params.drag_bounds.x1, x - this.rx);
                            var y = Math.max(that.params.drag_bounds.y1, y - this.ry);
                            x = Math.min(x, that.params.drag_bounds.x2);
                            y = Math.min(y, that.params.drag_bounds.y2);
                            $.each(edge_drawables, function() {this.remove()});
                            edge_drawables = that.drawEdge(this.cx, this.cy, x, y);

                            // Detect overlaps
                            $.each(that.vertices, function() {
                                if (this == vertex) {
                                    return true;
                                }

                                if (Raphael.isPointInsideBBox(this.bbox(), x, y)) {
                                    if (activeVertex && activeVertex != this) {
                                        activeVertex.draggedOut(vertex);
                                    }
                                    if (!this.activeDraggable) {
                                        activeVertex = this;
                                        activeVertex.draggedOver(vertex);
                                        return false;
                                    }
                                } else if (this == activeVertex) {
                                    activeVertex.draggedOut(vertex);
                                    activeVertex = null;
                                }
                            });
                        },
                        up = function() {
                            $.each(edge_drawables, function() {this.remove()});
                            if (activeVertex != null) {
                                that.addEdge(vertex, activeVertex);
                                activeVertex.draggedOut(vertex);
                            }
                        };
                        vertex.drag(move, start, up);
                    });
                }

                this.render();
            },

            render: function() {
                this._super();
                var that = this;
                var bbox = this.bbox();
                $.each(this.vertices, function(index, vertex) {
                    // Position vertices
                    vertex.move(vertex.params.x + (that.params.x - bbox.x),
                                vertex.params.y + (that.params.y - bbox.y));

                    // Handle events when edge is dragged over this a vertex
                    vertex.draggedOver = that.params.draggedOver;
                    vertex.draggedOut = that.params.draggedOut;
                });
                $.each(that.edges, function(index, edge) {
                    // Redraw edges
                    $.each(edge.drawables, function() {this.remove()});
                    that.drawVertexEdge(edge.from, edge.to, edge);
                });
            },

            bbox: function() {
                var x = 5000, y = 5000, x2 = 0, y2 = 0;
                $.each(this.vertices, function(index, vertex) {
                    var bbox = vertex.bbox();
                    x = x < bbox.x ? x : bbox.x;
                    y = y < bbox.y ? y : bbox.y;
                    x2 = x2 > bbox.x2 + bbox.width ? x2 : bbox.x2 + bbox.width;
                    y2 = y2 > bbox.y2 + bbox.height? y2 : bbox.y2 + bbox.height;
                });
                return {x: x, y: y,
                        x2: x2, y2: y2,
                        width: x2 - x,
                        height: y2 - y};
            },

            drawEdge: function(x1, y1, x2, y2, r1, r2) {
                var r1 = typeof r1 != 'undefined' ? r1 : 0;
                var r2 = typeof r2 != 'undefined' ? r2 : 0;
                function center_offset(x1, y1, x2, y2, r) {
                    // Find where circle with radius r intersects the edge
                    var tg = (y2 - y1) / (x1 - x2);
                    var dx = Math.sqrt(Math.pow(r, 2) / (1 + Math.pow(tg, 2)));
                    var dy = Math.sqrt(Math.pow(r, 2) - Math.pow(dx, 2));
                    var signx = (x1 - x2) && (x1 - x2) / Math.abs(x1 - x2);
                    var signy = (y1 - y2) && (y1 - y2) / Math.abs(y1 - y2);
                    return [signx * dx, signy * dy];
                }
                var size = 5;
                var canvas = this.collection.canvas;
                var angle = Math.atan2(x1 - x2, y2 - y1);
                angle = (angle / (2 * Math.PI)) * 360;
                // Line is draw not to the center of vertex, but to the side
                var offset1 = center_offset(x2, y2, x1, y1, r1);
                var offset2 = center_offset(x1, y1, x2, y2, r2);
                x1 += offset1[0];
                y1 += offset1[1];
                x2 += offset2[0];
                y2 += offset2[1];
                var arrowPath = canvas.path("M" + x2 + " " + y2 +
                                            " L" + (x2 - size) + " " + (y2 - size) +
                                            " L" + (x2 - size) + " " + (y2 + size) +
                                            " L" + x2 + " " + y2 )
                    .attr("fill", "black").rotate((90 + angle), x2, y2);
                var linePath = canvas.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
                linePath.attr('stroke-width', 2);
                if (this.params.editable) {
                    linePath.attr('cursor', 'pointer')
                }
                return [arrowPath, linePath];
            },

            drawVertexEdge: function(from_vertex, to_vertex, edge) {
                var that = this;
                var to_bbox = to_vertex.bbox();
                var from_bbox = from_vertex.bbox();
                var final_edge = this.drawEdge(
                        from_bbox.x + from_bbox.width / 2,
                        from_bbox.y + from_bbox.height / 2,
                        to_bbox.x + to_bbox.width / 2,
                        to_bbox.y + to_bbox.height / 2,
                        Math.max(from_bbox.width, from_bbox.height) / 2,
                        Math.max(to_bbox.width, to_bbox.height) / 2);
                final_edge[1].click(function() {
                    // Remove edge
                    if (that.params.editable) {
                        delete that.value[that.edgeKey(from_vertex, to_vertex)];
                        that.edges.pop(edge);
                        final_edge[0].remove();
                        final_edge[1].remove();
                    }
                });
                edge.from = from_vertex;
                edge.to = to_vertex;
                edge.drawables = final_edge;
            },

            edgeKey: function(from_vertex, to_vertex) {
                var edge_key = [];
                edge_key.push(from_vertex.name ? from_vertex.name : this.vertices.indexOf(from_vertex));
                edge_key.push(to_vertex.name ? to_vertex.name : this.vertices.indexOf(to_vertex));
                return edge_key;
            },

            addEdge: function(from_vertex, to_vertex) {
                // Create edge key (name or index in vertex list)
                var edge_key = this.edgeKey(from_vertex, to_vertex);

                // Add edge if it did not exist yet
                if (!(edge_key in this.value)) {
                    var edge = {};
                    this.drawVertexEdge(from_vertex, to_vertex, edge);
                    this.value[edge_key] = '';
                    this.edges.push(edge);
                }
            },

            move: function(x, y) {
                this.params.x = x;
                this.params.y = y;
                this.render();
            },

            state: function() {
                return {
                    name: this.name,
                    value: Object.keys(this.value)
                }
            }
        });


        /* Text with infixes
        */
        var InfixText = Component.extend({
            init: function(params) {
                this._super(params);
                var defaults = {
                    infix_padding: 2
                };
                this.params = $.extend(defaults, this.params);
                this.text_container = $('<span></span>')
                    .css('position', 'absolute')
                    .css('z-index', '-1');
                this.text = this.params.text.replace('\\%', '&#37;');
                this.text = this.text.replace(/%/g, '<span class="infix"></span>');
                this.infixes = this.params.infixes;
                this.render();
            },

            render: function() {
                this._super();
                var that = this;
                this.text_container.width(this.params.width);
                this.text_container.html(this.text).appendTo(this.collection.box);
                $('.infix', this.text_container).each(function(index, infix_html) {
                    var parent_pos = $(this).parent().position();
                    var infix = that.infixes[index];
                    infix.render();
                    $(infix_html).width(infix.bbox().width)
                            .height(infix.bbox().height + that.params.infix_padding * 2)
                            .css('display', 'inline-block')
                            .css('vertical-align', 'middle');
                    var pos = $(this).position();
                    infix.move(pos.left + parent_pos.left,
                            pos.top + parent_pos.top + that.params.infix_padding);
                });
            },

            bbox: function() {
                var pos = this.text_container.position();
                return {x: pos.left,
                        y: pos.top,
                        width: this.text_container.width(),
                        height: this.text_container.height()};
            },

            move: function(x, y) {
                this.text_container.css('left', x).css('top', y);
                this.render();
            },

            state: function() {
                return {
                    name: this.name,
                    value: $.map(this.infixes, function(infix) {
                        return infix.state();
                    })};
            }
        });


        /* Layout
        */
        var LinearLayout = Class.extend({
            init: function() {
                var defaults = {
                    x: 0, y: 0,
                    direction: 'horizontal',
                    padding: {x: 0, y: 0},
                    item_padding: 0,
                    align: 'center',
                    full_width: false,
                    randomize: false
                };
                var components, params;
                if (arguments.length > 1) {
                    components = arguments[0];
                    params = arguments[1];
                } else {
                    params = arguments[0];
                }
                this.params = $.extend(defaults, params);
                this.components = components ? components.slice() : [];
                this.randomize();
                this.render();
            },

            randomize: function() {
                if (this.params.randomize) {
                    for (var i = this.components.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = this.components[i];
                        this.components[i] = this.components[j];
                        this.components[j] = temp;
                    }
                }
            },

            render: function() {
                var that = this;
                var max_height = 0;
                var max_width = 0;

                $.each(this.components, function(index, component) {
                    max_height = Math.max(max_height, component.bbox().height);
                    max_width = Math.max(max_width, component.bbox().width);
                });

                if (this.components.length) {
                    this.collection = this.components[0].collection;
                }

                var next_x = this.params.x + this.params.padding.x;
                var next_y = this.params.y + this.params.padding.y;
                $.each(this.components, function(index, component) {
                    var bbox = component.bbox();
                    var x = next_x;
                    var y = next_y;
                    if (that.params.direction == 'horizontal') {
                        var horiz_delta = bbox.width;
                        if (that.params.full_width) {
                            // Try distributing elements evenly and resizing accordingly
                            horiz_delta = that.collection.params.width / that.components.length;
                            component.params.width = horiz_delta;
                            component.render();
                        }
                        next_x += horiz_delta + that.params.item_padding;
                        if (that.params.align == 'center')
                            y += (max_height - bbox.height) / 2;
                    } else {
                        next_y += bbox.height + that.params.item_padding;
                        if (that.params.align == 'center')
                            x += (max_width - bbox.width) / 2;
                    }
                    component.move(x, y);
                });
            },

            add: function(component) {
                this.components.push(component);
                this.randomize();
                this.render();
                return component;
            },

            remove: function(component) {
                var index = this.components.indexOf(component);
                if (index != -1) {
                    this.components.remove(index);
                    this.randomize();
                    this.render();
                    return component;
                }
            },

            bbox: function() {
                var width = 0;
                var height = 0;
                if (this.params.direction == 'horizontal') {
                    $.each(this.components, function(index, component) {
                        width += component.bbox().width;
                        height = Math.max(height, component.bbox().height);
                    });
                    width += this.params.item_padding * this.components.length;
                } else {
                    $.each(this.components, function(index, component) {
                        height += component.bbox().height;
                        width = Math.max(width, component.bbox().width);
                    });
                    height += this.params.item_padding * this.components.length;
                }
                return {x: this.params.x,
                        y: this.params.y,
                        width: width + this.params.padding.x * 2,
                        height: height + this.params.padding.y * 2};
            },

            move: function(x, y) {
                this.params.x = x;
                this.params.y = y;
                this.render();
            }
        });


        /* Grid layout
        */
        var GridLayout = LinearLayout.extend({
            init: function(components, params) {
                this._super(components, params);
                var defaults = {
                    rows: 0,
                    columns: 0,
                    x: 0, y: 0,
                    padding: {x: 0, y: 0},
                    item_padding: 0,
                    align: 'center',
                    randomize: false
                };
                this.params = $.extend(defaults, params);
                this.randomize();
                this.render();
            },

            render: function() {
                var rows = parseInt(this.params.rows);
                var columns = parseInt(this.params.columns);
                if (!rows && columns)
                    rows = Math.max(1, Math.ceil(this.components.length / columns));

                if (!columns && rows)
                    columns = Math.max(1, Math.ceil(this.components.length / rows));

                this.table = new LinearLayout([], {
                    direction: 'vertical',
                    x: this.params.x,
                    y: this.params.y,
                    padding: this.params.padding,
                    item_padding: this.params.item_padding});

                for (var i = 0; i < rows; i++) {
                    var row_items = this.components.slice(
                        i * columns,
                        i * columns + columns);
                    var line = new LinearLayout(row_items,
                                                {item_padding: this.params.item_padding});
                    this.table.add(line);
                }
            },

            bbox: function() {
                var table_bbox = this.table.bbox();
                return {x: this.params.x,
                        y: this.params.y,
                        width: table_bbox.width + this.params.padding.x * 2,
                        height: table_bbox.height + this.params.padding.y * 2};
            }
        });

        return {
            params: collection.parsed_params,
            canvas: collection.canvas,
            getVisuals: function(name) {return collection.visuals},
            get: function(name) {return collection.visuals[name]},
            add: function(name, comp) {return collection.visuals[name] = comp},
            load: function() {return collection.load()},
            unload: function() {return collection.unload()},
            getAnswer: function() {return collection.result()},

            Component: Component,
            HTML: HTML,
            RaphaelComponent: RaphaelComponent,
            Rectangle: Rectangle,
            TextField: TextField,
            InfixText: InfixText,
            Droppable: Droppable,
            Picture: Picture,
            Graph: Graph,
            Switch: Switch,
            SwitchGroup: SwitchGroup,
            LinearLayout: LinearLayout,
            GridLayout: GridLayout,
        }
    };
})();
