const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const trim = function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

const camelCase = function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export const on = (() => {
    if (document.addEventListener) {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

export const off = (() => {
    if (document.removeEventListener) {
        return (element, event, handler) => {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return (element, event, handler) => {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

export function hasClass(el, cls) {
    if (!el || !cls) {
        return false;
    }
    if (cls.indexOf(' ') !== -1) {
        throw new Error('className should not contain space.');
    }
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

export function addClass(el, cls) {
    if (!el) {
        return;
    }
    let curClass = el.className;
    let classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) {
            continue;
        }

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

export function removeClass(el, cls) {
    if (!el || !cls) {
        return;
    }
    let classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) {
            continue;
        }

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

export function getStyle (element, styleName) {
    if (!element || !styleName) {
        return null;
    }
    let _styleName = camelCase(styleName);
    if (_styleName === 'float') {
        _styleName = 'cssFloat';
    }
    try {
        let computed = (document as any).defaultView.getComputedStyle(element, '');
        return element.style[_styleName] || computed ? computed[_styleName] : null;
    } catch (e) {
        return element.style[_styleName];
    }
}

export function setStyle(element, styleName, value = '') {
    if (!element || !styleName) {
        return;
    }

    if (typeof styleName === 'object') {
        for (let prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        let _styleName = camelCase(styleName);
        element.style[_styleName] = value;
    }
}

export function setToPx(value) {
    return value + 'px';
}