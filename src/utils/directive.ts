/**
 * @author Echi
 * @desc 添加自定义指令
 */

import {
  on,
  off,
} from '@/utils/dom';
import { setStyle } from './dom';

/**
 *  v-focus
 * @desc 点击目标获取目标焦点, 用于自动获取输入框焦点,修复在ios下获取不到焦点的bug
 * @example
 * ```vue
 * <div v-focus="handleFocus?:function">
 * ```
 */
export const focus = {
  bind(el, binding) {
    el.__callBackFocus__ = (e) => {
      el.focus();
      if (binding.expression) {
        binding.value(e);
      }
    };
    on(el, 'click', el.__callBackFocus__);
  },
  unbind(el) {
    off(el, 'click', el.__callBackFocus__);
    delete el.__callBackFocus__;
  },
};

/**
 * v-leave
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-leave="handleLeave?:function">
 * ```
 */
export const leave = {
  bind(el, binding, vnode) {
    el.__callBackLevea__ = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    };
    on(document, 'click', el.__callBackLevea__);
  },
  unbind(el) {
    off(document, 'click', el.__callBackLevea__);
    delete el.__callBackLevea__;
  },
};


/**
 * v-draggable
 * @desc 拖拽指令 v-draggable="options"
 * @example
 * options = {
 *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
 *  body:    /这里传入需要移动容器的CSS选择器/,
 *  recover: /拖动结束之后是否恢复到原来的位置/
 * }
 * ```vue
 * <div v-draggable="options:object">
 * ```
 */
export const draggable = {
  inserted: (el, binding, vnode) => {
    let triggerDom = document.querySelector(binding.value.trigger);
    triggerDom.style.cursor = 'move';
    let bodyDom = document.querySelector(binding.value.body);
    let pageX = 0;
    let pageY = 0;
    let transformX = 0;
    let transformY = 0;
    let canMove = false;
    const handleMousedown = e => {
      let transform: any = /\(.*\)/.exec(bodyDom.style.transform);
      if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1);
        let splitxy = transform.split('px, ');
        transformX = parseFloat(splitxy[0]);
        transformY = parseFloat(splitxy[1].split('px')[0]);
      }
      pageX = e.pageX;
      pageY = e.pageY;
      canMove = true;
    };
    const handleMousemove = e => {
      let xOffset = e.pageX - pageX + transformX;
      let yOffset = e.pageY - pageY + transformY;
      if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };
    const handleMouseup = e => {
      canMove = false;
    };
    on(triggerDom, 'mousedown', handleMousedown);
    on(document, 'mousemove', handleMousemove);
    on(document, 'mouseup', handleMouseup);
  },
  update: (el, binding, vnode) => {
    if (!binding.value.recover) return;
    let bodyDom = document.querySelector(binding.value.body);
    bodyDom.style.transform = '';
  }
};

/**
 * v-scroll
 * @desc 自定义监听滚动事件
 * @example
 * ```vue
 * <div v-scroll="handleScroll?:function">
 * 你也可以添加修饰符 lazy ,这样滚动事件只会触发一次
 * <div v-scroll.lazy="handleScroll?:function">
 * ```
 */
export const scroll = {
  bind(el, binding, vnode) {
    el.__timeout__ = null;
    el.__callBackScroll__ = (e) => {
      window.requestAnimationFrame(() => {
        if (!binding.expression) {
          return;
        }
        const lazy = binding.modifiers.lazy;
        if (lazy) {
          const scrollTopOld = el.scrollTop;
          clearTimeout(el.__timeout__);
          el.__timeout__ = setTimeout(() => {
            const scrollTopNew = el.scrollTop;
            if (scrollTopOld === scrollTopNew) {
              binding.value(e);
            }
            clearTimeout(el.__timeout__);
            el.__timeout__ = null;
          }, 100);
          return;
        }
        binding.value(e);
      });
    };
    on(el, 'scroll', el.__callBackScroll__);
  },
  unbind(el) {
    off(el, 'scroll', el.__callBackScroll__);
    clearTimeout(el.__timeout__);
    delete el.__timeout__;
    delete el.__callBackScroll__;
  },
};

/**
 * v-ele-enter
 * @desc 修改element组件居中布局, 默认绑定在dialog
 * @example
 * options = {
 *  target: /这里传入作为内容区的CSS选择器/,
 *  body:    /这里传入需要修改容器的CSS选择器/
 * }
 * ```vue
 * <ele v-ele-enter="option?">
 * ```
 */
export const eleEnter = {
    update: (el, binding, vnode) => {
        let winHeight = el.offsetHeight;
        let params = binding.value || {};
        let wrapper = el.querySelector(params.body || '.el-dialog');
        let content = el.querySelector(params.target || '.el-dialog__body');
        if (!wrapper || !content) {
            return;
        }
        let wrapperHeight = wrapper.offsetHeight;
        if (wrapperHeight > winHeight) {
            setStyle(content, {
                overflow: 'auto',
                maxHeight: `${content.offsetHeight - wrapperHeight + winHeight}px`
            });
        }else {
            setStyle(el, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            });
        }
    }
};