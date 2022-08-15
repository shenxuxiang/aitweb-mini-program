const request = require('../../utils/request.js');

Page({
  data: {
    title: '',
    introduce: '',
    modules: [],
  },
  onLoad(options) {
    const query = { course: options.query };
    wx.showLoading({ title: 'loading...' });
    request('/mini-program/syllabus', 'post', query)
      .then(response => {
        const { code, data } = response;
        if (code === 0) {
          const { title, introduce, modules } = data;
          this.setData({ title, introduce, modules });
        }
      })
      .finally((error) => {
        wx.hideLoading();
      });
  }
});
