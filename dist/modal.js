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
    
    var Modal = function (content, options) {
        if (!(this instanceof Modal)) {
            return new Modal(content, options);
        }

        if (!content) {
            console.warn('Modal: Do not instantiate the plugin without defining the content');
            return;
        }

        this.content  = content;
        this.maxWidth = options.maxWidth || 600;
        this.onOpen   = options.onOpen   || undefined;
        this.onClose  = options.onClose  || undefined;

        this.ready();
    };

    Modal.prototype = {
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
            var overlay, modal, modalContent, btn;

            overlay      = this.createEls('div', { className: 'overlay' });
            modal        = this.createEls('div', { className: 'modal', id: 'modal' });
            modalContent = this.createEls('div', { className: 'modal-content' });
            btn          = this.createEls('button', { className: 'modal-close close-button', type: 'button' }, 'X');

            modal.style.maxWidth = this.maxWidth + "px";

            modal.appendChild(btn);
            modal.appendChild(modalContent);

            document.body.appendChild(overlay);
            document.body.appendChild(modal);
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
            var root    = document.body,
                overlay = document.querySelector('.overlay'),
                modal   = document.querySelector('.modal');

            if (overlay !== null && modal !== null) {
                root.removeChild(overlay);
                root.removeChild(modal);

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