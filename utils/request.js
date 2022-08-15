
const baseURL = 'https://aitweb.cn';

function send(url, method, body) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: body,
      method: method.toUpperCase(),
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          return resolve(response.data);
        } else {
          // 抛出错误信息。此时错误信息存放在 response.data
          return reject(new Error(response.data));
        }
      },
      fail: (error) => {
        // 抛出错误信息
        return reject(new Error(error.errMsg));
      },
    });
  });
}

module.exports = function request(url, method, body) {
  return send(url, method, body)
    .then(response => {
      const { code, msg } = response;
      // code === 0 表示返回正确的结果。此时全局抛出一个 toast 提示。
      if (code !== 0) wx.showToast({ icon: 'none', title: msg, duration: 2000 });
      // 将结果直接返回给业务层。
      return response;
    })
    .catch(error => {
      wx.showToast({ icon: 'none', title: error.message, duration: 2000 });
    });
}

