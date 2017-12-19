import Vue from 'vue';
let MaskingConstructor = Vue.extend(require('./index.vue'));

let instance;

let Masking = function() {
    if (instance) {
        instance.vm.visible = true;
    } else {
        instance = new MaskingConstructor();
        instance.vm = instance.$mount();
        instance.vm.visible = true;
        document.body.appendChild(instance.vm.$el);
        return instance.vm;
    }
};

Masking.close = function() {
    instance && instance.vm && (instance.vm.visible = false);
};

export default {
    install() {
        Vue.prototype.$masking = Masking;
        Vue.prototype.$unmask = Masking.close;
    }
};
