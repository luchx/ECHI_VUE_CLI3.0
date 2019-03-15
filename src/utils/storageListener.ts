/**
 * @author Echi
 * @desc 用于解决跨页面的数据交互问题
 */

import {
    on,
    off
} from './dom';

// 修改本地storage用于触发事件监听
export function emitStorage(key) {
    try {
        window.localStorage.setItem(`mutations-sharer_storage_${key}`, key);
        window.localStorage.removeItem(`mutations-sharer_storage_${key}`);
    } catch (e) {
        console.error(
            'Unable to use setItem on localStorage. Disabling plugin.',
        );
        return;
    }
}

// 触发当前绑定的事件
export function onStorage(key, callback) {
    window[`__callback${key}__`] = (event) => {
        let buildKey = `mutations-sharer_storage_${key}`;
        if (event.newValue === null) return;
        if (event.key !== buildKey) return;
        if (typeof callback === 'function') {
            callback(event);
        } else {
            console.error(
                'This method[callback] must be a function.',
            );
        }
    };
    on(window, 'storage', window[`__callback${key}__`]);
}

// 解绑当前绑定的事件
export function offStorage(key) {
    off(window, 'storage', window[`__callback${key}__`]);
    delete window[`__callback${key}__`];
}