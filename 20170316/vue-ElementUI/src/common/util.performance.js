/**
 * debounce，性能优化。对应的还有throttle。
 * @param func
 * @param wait
 * @param immediate
 * @returns {debounced}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
    if (wait == null) wait = 100;

    function later() {
        const last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }

    function debounced() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        const callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    }

    debounced.clear = function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    debounced.flush = function() {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;

            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
};
