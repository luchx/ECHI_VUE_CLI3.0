import {
    isNotEmpty
} from '@/utils';

/**
 * @author Echi
 * @desc 添加自定义过滤器
 */

/**
 *  week
 * @desc 返回当前星期
 * @example
 * ```vue
 * <div>{{date | week(lang?)}}</div>
 * ```
 */
export function week(item, lang) {
    switch (lang) {
        case 'en':
            return {
                0: 'Su',
                1: 'Mo',
                2: 'Tu',
                3: 'We',
                4: 'Th',
                5: 'Fr',
                6: 'Sa'
            } [item];
        case 'ch':
            return {
                0: '日',
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六'
            } [item];
        default:
            return item;
    }
}

/**
 *  month
 * @desc 返回当前月份
 * @example
 * ```vue
 * <div>{{date | month(lang?)}}</div>
 * ```
 */
export function month(item, lang) {
    switch (lang) {
        case 'en':
            return {
                1: 'Jan',
                2: 'Feb',
                3: 'Mar',
                4: 'Apr',
                5: 'May',
                6: 'Jun',
                7: 'Jul',
                8: 'Aug',
                9: 'Sep',
                10: 'Oct',
                11: 'Nov',
                12: 'Dec'
            } [item];
        case 'ch':
            return {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12'
            } [item];
        default:
            return item;
    }
}

/**
 *  prefix
 * @desc 返回添加前缀
 * @example
 * ```vue
 * <div>{{url | prefix(text?)}}</div>
 * ```
 */
export function prefix(value, text) {
    const preText = text || process.env.VUE_APP_URL;
    return value ? preText + value : null;
}

/**
 *  toPercentage
 * @desc 保留小数点后几位
 * @example
 * ```vue
 * <div>{{floatNum | toPercentage(2)}}</div>
 * ```
 */
export function toPercentage(x, num) {
    let s = (Number(x * 100));
    if (isNaN(x)) return s;
    return s.toFixed(num || 2) + '%';
}

/**
 *  num
 * @desc 不足10加0
 * @example
 * ```vue
 * <div>{{num | fixTen}}</div>
 * ```
 */
export function fixTen(num) {
    return ('0' + num).slice(-2);
}