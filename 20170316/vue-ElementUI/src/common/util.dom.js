import { typeIs } from './util.string';

export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
export const isEventSupported = (function() {
    const TAGNAMES = {
        select: 'input',
        change: 'input',
        submit: 'form',
        reset: 'form',
        error: 'img',
        load: 'img',
        abort: 'img'
    };

    function isEventSupported(e) {
        const eventName = 'on' + e;
        let el = document.createElement(TAGNAMES[e] || 'div');
        let isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        if (!isSupported) {
            isSupported = el.style[e] !== undefined;
        }
        el = null;
        return isSupported;
    }

    return isEventSupported;
})();

export function htmldecode(s) {
    let div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}

export function htmldecodeRecursive(data) {
    if (typeIs(data) === 'object') {
        let temp = {};
        Object.keys(data).forEach(key => {
            temp[key] = htmldecodeRecursive(data[key]);
        });
        return temp;
    }
    if (typeIs(data) === 'array') {
        return data.map(i => htmldecodeRecursive(i));
    }
    if (typeIs(data) === 'string') {
        return htmldecode(data);
    }
    return data;
}

export function toggleClass(element, className, force) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    let nameIndex = classString.indexOf(className);
    if (force && nameIndex === -1) {
        classString += ' ' + className;
        element.className = classString;
        return;
    }
    if (!force && nameIndex !== -1) {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        element.className = classString;
        return;
    }
}

// 触发事件
export function triggerEvent(el, event) {
    if (!el || !event) {
        return;
    }
    el = typeIs(el) === 'string' ? document.querySelector(el) : el;
    const evObj = document.createEvent('MouseEvents');
    evObj.initEvent(event, true, false);
    el.dispatchEvent(evObj);
}
