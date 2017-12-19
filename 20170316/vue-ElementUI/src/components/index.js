import Button from './button';
import Thumbnail from './thumbnail';

const components = [
    Button,
    Thumbnail
];

const install = function(Vue, opts = {}) {
    if (install.installed) return;

    components.map(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...components
};
