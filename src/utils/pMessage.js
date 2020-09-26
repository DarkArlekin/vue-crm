export default {
  install(Vue) {
    Vue.prototype.$message = (html, options = false) => {
      let displayLength = 1200
      if (options) {
        options.err && (html += '[error] ');
        options.displayLength && (displayLength = options.displayLength);
      }

      M.toast({
        html,
        displayLength
      });
    };
  },
};
