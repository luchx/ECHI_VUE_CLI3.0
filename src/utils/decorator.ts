/**
 * 定义规则,统一以大驼峰且DR开头
 * @date 2018-11-27
 */

import {
    MessageBox, Message,
} from 'element-ui';
import {
    noop,
    isType,
    isNotEmpty
} from '@/utils';
import router from '../router';

// 网络连接错误
let netErrorStatus = false;
const NET_ERROR = (retryHandle: Function = noop) => {
    if (netErrorStatus) {
        return;
    }
    netErrorStatus = true;
    return MessageBox.confirm('连接出错,是否重试?', '提示', {
        confirmButtonText: '立即重试',
        type: 'warning',
        center: true
    }).then(() => {
        netErrorStatus = false;
        retryHandle();
    }).catch(() => {
        netErrorStatus = false;
    });
};

/**
 * 用于处理请求response的信息
 * @tips 请注意,参数params中的回调函数不能使用箭头函数,否则将会引起上下文变动
 * @param [Object | Function] params 接收参数回调
 * @param [params.success] success 默认接收Function类型的参数,或者接收 Object 对象中的success方法
 * @param [params.fail] fail 接收 Object 对象中的fail方法
 * @param [params.error] error 接收 Object 对象中的error方法,默认不执行则需要配合@DRCatchError装饰器
 * @param [params.done] done 接收 Object 对象中的done方法,用于请求回调后执行
 * @returns descriptor
 */
export const DRRequest = (params) => (target, key, descriptor) => {
    const original = descriptor.value;
    if (typeof original !== 'function') {
        throw new Error('The @DRRequest() decorator can only be used on function.');
    }
    let successHandler: any = noop;
    let failHandler: any = noop;
    let errorHandler: any = null;
    let doneHandler: any = noop;
    let exceptionDeal: boolean = false;
    // 如果当前有且只有一个参数类型为Function,则默认赋值为成功回调
    if (isType(params) === 'function') {
        successHandler = params;
    } else if (isType(params) === 'object') {
        successHandler = isType(params.success) === 'function' ? params.success : noop;
        failHandler = isType(params.fail) === 'function' ? params.fail : noop;
        errorHandler = params.error;
        doneHandler = isType(params.done) === 'function' ? params.done : noop;
        exceptionDeal = params.exception || false;
    } else {
        throw new Error('The @DRRequest() decorator can only recept params type of Object or Function.');
    }
    descriptor.value = function () {
        let retryHandle = (async () => {
            try {
                const request = await original.apply(this, arguments);
                // 非请求字段不予执行
                if (!isNotEmpty(request) || isType(request) !== 'object') {
                    return;
                }
                // 判断返回参数是否请求成功
                if (request['status']) {
                    successHandler.apply(this, [request.data]);
                } else {
                    failHandler.apply(this, [request.message]);
                }
            } catch (error) {
                // 如果当前是由于重复发起请求导致的error,则不再提示
                if (error.message === 'Network Error') {
                    return NET_ERROR(retryHandle);
                }
                let resp = (error && error.response) || {};
                let data = resp.data;
                // 当前有执行异常事件
                if (isType(errorHandler) === 'function') {
                    return errorHandler.call(this, data || error.message);
                }
                let status = resp.status || (resp.data && resp.data.status);
                if (status === 404 && exceptionDeal) {
                    router.push({
                        name: '404'
                    });
                } else if (status === 500 && exceptionDeal) {
                    router.push({
                        name: '500'
                    });
                } else {
                    //弱提示
                    Message({
                        type: 'error',
                        message: error.message,
                        duration: 1500
                    });
                }
            }finally {
                doneHandler.call(this);
            }
        });
        return retryHandle();
    };
    return descriptor;
};

/**
 * 用于捕获Error
 * @tips 请注意,参数params中的回调函数不能使用箭头函数,否则将会引起上下文变动
 * @param [Object | Function] params 接收异常捕获回调,非必选参数
 * @param [params.callback] callback 默认接收Function类型的参数,或者接收 Object 对象中的callback方法
 * @returns descriptor
 */
export const DRCatchError = (params: any = noop) => (target, key, descriptor) => {
    const original = descriptor.value;
    let errorHandler: any = null;
    if (isType(params) === 'function') {
        errorHandler = params;
    } else if (isType(params) === 'object') {
        errorHandler = params.callback;
    }
    descriptor.value = async function () {
        try {
            await original.apply(this, arguments);
        } catch (error) {
            let resp = (error && error.response) || {};
            let errorData = resp.data || error.message;
            if (typeof errorHandler === 'function') {
                errorHandler.call(this, errorData);
            } else {
                console.error(error);
            }
        }
    };
    return descriptor;
};

/**
 * 用于操作方法防抖
 * @param [wait: number] 延时ms
 * @param [immediate: boolean] 立即执行
 * @returns descriptor
 */
export const DRDebounce = (wait: number, immediate: boolean = false) => (target, key, descriptor) => {
    let timeout: any;
    const original = descriptor.value;
    descriptor.value = function () {
        let later = () => {
            timeout = null;
            if (!immediate) {
                original.apply(this, arguments);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            original.apply(this, arguments);
        }
    };
    return descriptor;
};

/**
 * 用于操作函数节流
 *  @param [delay: number] 延时ms
 */
export const DRThrottle = (delay: number) => (target, key, descriptor) => {
    let last: any;
    let deferTimer: any;
    const original = descriptor.value;
    descriptor.value = function() {
        let now = +new Date();
        if (last && now < last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                original.apply(this, arguments);
            }, delay);
        }else {
            last = now;
            original.apply(this, arguments);
        }
    };
    return descriptor;
};
