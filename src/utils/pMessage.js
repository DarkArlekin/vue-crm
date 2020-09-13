export default {
  install({ prototype }) {
    prototype.$message = (html, options = false) => {
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
