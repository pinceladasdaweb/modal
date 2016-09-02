/*! modal v0.0.1 | (c) 2016 Pedro Rogerio | https://github.com/pinceladasdaweb/modal */
(function (root, factory) {
    "use strict";
    
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Modal = factory();
    }
}(this, function () {
    "use strict";
    
    var Modal = function (options) {
        if (!(this instanceof Modal)) {
            return new Modal(options);
        }

        if (!content) {
            console.warn('Modal: Do not instantiate the plugin without defining the content');
            return;
        }

        this.content   = options.content;
        this.minHeight = options.minHeight || 250;
        this.maxWidth  = options.maxWidth  || 600;
        this.onOpen    = options.onOpen    || undefined;
        this.onClose   = options.onClose   || undefined;

        this.ready();
    };

    Modal.prototype = {
        whichAnimationEvent: function () {
            var el = document.createElement("fakeelement"),
            animations, t;

            animations = {
                "animation"      : "animationend",
                "OAnimation"     : "oAnimationEnd",
                "MozAnimation"   : "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            }

            for (t in animations){
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        },
        hasClass: function (el, name) {
            return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
        },
        addClass: function (el, name) {
            if (!this.hasClass(el, name)) {
                el.className += (el.className ? ' ' : '') + name;
            }
        },
        removeClass: function (el, name) {
            if (this.hasClass(el, name)) {
                el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
            }
        },
        createEls: function (name, props, text) {
            var el = document.createElement(name), p;

            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }

            if (text) {
                el.appendChild(document.createTextNode(text));
            }

            return el;
        },
        drawElements: function () {
            var animationEvent = this.whichAnimationEvent(),
                overlay, modal, modalContent, btn;

            overlay      = this.createEls('div', { className: 'overlay' });
            modal        = this.createEls('div', { className: 'modal fade-and-drop', id: 'modal' });
            modalContent = this.createEls('div', { className: 'modal-content' });
            btn          = this.createEls('button', { className: 'modal-close close-button', type: 'button' }, 'X');

            modal.style.minHeight = this.minHeight + "px";
            modal.style.maxWidth  = this.maxWidth + "px";

            modal.appendChild(btn);
            modal.appendChild(modalContent);

            document.body.appendChild(overlay);
            document.body.appendChild(modal);

            overlay.addEventListener(animationEvent, function () {
                this.addClass(modal, 'open');
            }.bind(this), false);
        },
        injectHtml: function () {
            var modalContent = document.querySelector('.modal-content');

            if (this.content instanceof Node) {
                if (this.content.hasAttribute("style")) {
                    this.content.removeAttribute("style");
                }

                modalContent.appendChild(this.content);
            } else {
                modalContent.insertAdjacentHTML('beforeend', this.content);
            }

            typeof this.onOpen === 'function' && this.onOpen.call();
        },
        close: function () {
            var root           = document.body,
                animationEvent = this.whichAnimationEvent(),
                overlay        = document.querySelector('.overlay'),
                modal          = document.querySelector('.modal');

            if (overlay !== null && modal !== null) {
                this.addClass(overlay, 'overlay-hide');
                this.removeClass(modal, 'open');

                overlay.addEventListener(animationEvent, function () {
                    root.removeChild(overlay);
                    root.removeChild(modal);
                }, false);

                typeof this.onClose === 'function' && this.onClose.call();
            }
        },
        events: function () {
            var btnClose = document.querySelector('.modal-close'),
                root     = document.body;

            root.addEventListener('keyup', function (e) {
                if ((e.keyCode || e.which) === 27) {
                    this.close();
                }
            }.bind(this), false);

            btnClose.addEventListener('click', function (e) {
                this.close();
            }.bind(this), false);
        },
        ready: function () {
            this.drawElements();
            this.injectHtml();
            this.events();
        }
    };

    return Modal;
}));