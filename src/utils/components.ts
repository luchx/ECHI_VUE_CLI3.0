/**
 * The file enables `@/components/*.vue` to import all components modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./../components', true, /\.vue$/);
const modules: { [key: string]: any } = {};

files.keys().forEach((key) => {
    let keyArray = key.replace(/(\.\/|\.vue)/g, '').split('/');
    modules['c-' + keyArray[1]] = files(key).default;
});

export default modules;