export default {
  install(Vue) {
    Vue.prototype.$message = (html, options = false) => {
      if (options) {
        options.err && (html += '[error] ');
      }

      M.toast({
        html,
        displayLength: 1200
      });
    };
  },
};
