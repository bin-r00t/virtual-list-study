/** 节流函数1 */
// export function throttle(fn, delay = 500) {
//   let oldtime = Date.now();
//   return function (...args) {
//     let newtime = Date.now();
//     if (newtime - oldtime >= delay) {
//       fn.apply(null, args);
//       oldtime = Date.now();
//     }
//   };
// }

/** 节流函数2 */
// export function throttle(fn, delay = 500) {
//   let timer = null;
//   return function (...args) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//         timer = null;
//       }, delay);
//     }
//   };
// }

/** 节流函数3 */
export function throttle(fn, delay) {
  let timer = null;
  let starttime = Date.now();
  return function (args) {
    let curTime = Date.now(); // 当前时间
    let remaining = delay - (curTime - starttime); // 从上一次到现在，还剩下多少多余时间
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(this, args);
      starttime = Date.now();
    } else {
      timer = setTimeout(fn.bind(this, args), remaining);
    }
  };
}
