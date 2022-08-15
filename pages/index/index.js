const { Iterator, dateFormat } = require('../../utils/index.js');
const request = require('../../utils/request.js');

Page({
  data: {
    // 活动是否进行中
    activityInProgress: false,
    banners: [],
    about: [],
    industryPrice: [],
    characteristic: [],
    courses: [],
    contact: {},
    advantages: [],
    cutOffTime: '0000-00-00',
    countdown: '00:00:00',
    days: '0',
    showConsultModal: false,
    address: {},
    shareInfo: {},
    teacherInfo: {},
    friendlyTips: '',
  },
  onLoad() {
    wx.showLoading({ title: 'loading...' });
    request('/mini-program/active-info', 'post', null)
      .then(response => {
        const {
          about,
          address,
          advantages,
          banners,
          characteristic,
          industryPrice,
          signUpCutOffTime,
          shareInfo,
          contact,
          teacherInfo,
          friendlyTips,
          courses,
          activityInProgress,
        } = response?.data ?? {};
        // 活动未开始
        if (activityInProgress === false) {
          wx.showToast({ title: '活动未开始', icon: 'none' });
          return;
        }

        // 如果报名截止时间存在，则开启倒计时。注意 signUpCutOffTime 是毫秒级别的。
        if (signUpCutOffTime > 0) {
          this.handleCountdown(signUpCutOffTime);
          // 创建一个倒计时的迭代器。迭代器的迭代速度以秒作为单位。
          const iterator = new Iterator(signUpCutOffTime / 1000 - Math.floor(Date.now() / 1000), 0, -1);
          // 每秒钟执行一次倒计时计算。
          iterator.interval(() => this.handleCountdown(signUpCutOffTime), 1000);
        }

        this.setData({
          about,
          address,
          advantages,
          characteristic,
          industryPrice,
          banners,
          shareInfo,
          teacherInfo,
          friendlyTips,
          courses,
          contact,
          cutOffTime: dateFormat(signUpCutOffTime, 'YYYY-MM-DD'),
          activityInProgress: true,
        });
      })
      .finally(() => wx.hideLoading());
  },
  // 分享好友
  onShareAppMessage () {
    return this.data.shareInfo;
  },
  // 分享朋友圈
  onShareTimeline() {
    return this.data.shareInfo;
  },
  handleNavigate(event) {
    const { dataset } = event.currentTarget;
    const options = dataset?.options;
    wx.navigateTo({ url: '/pages/syllabus/syllabus?query=' + options });
  },
  // @params targetTimeStamp { Number } 表示截止时间的时间戳
  handleCountdown(targetTimeStamp) {
    const dt = new Date(targetTimeStamp);
    const timeStamp = Date.parse(dt) - Date.now();
    // 86400000 === 24 * 60 * 60 * 1000 表示一天累计的时间毫秒数。
    const days = Math.floor(timeStamp / 86400000);
    this.setData({ days });
    // 表示剩余的小时时间戳
    let remainingTimeStamp = timeStamp % 86400000;
    let hours = '0' + Math.floor(remainingTimeStamp / 3600000);
    // 表示剩余的分钟时间戳
    remainingTimeStamp = remainingTimeStamp % 3600000;
    let minutes = '0' + Math.floor(remainingTimeStamp / 60000);
    // 表示剩余的秒钟时间戳
    remainingTimeStamp = remainingTimeStamp % 60000;
    let seconds = '0' + Math.floor(remainingTimeStamp / 1000);

    hours = hours.slice(-2);
    minutes = minutes.slice(-2);
    seconds = seconds.slice(-2);
    this.setData({ countdown: hours + ':' + minutes + ':' + seconds });
  },
  // 点击咨询按钮
  handleClickConsultButton () {
    this.setData({ showConsultModal: true });
  },
  // 关闭咨询弹框
  handleCloseConsultModal(event) {
    this.setData({ showConsultModal: false });
  },
  // 打开微信地图
  handleOpenLocation() {
    wx.openLocation({ ...this.data.address });
  },
});
