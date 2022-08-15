Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
  },
  properties: {
    visible: Boolean,
    phoneNumber: String,
    qrCode: String,
  },
  data: {
    showQrCodeModal: false,
  },
  methods: {
    handleCloseModal(event) {
      this.triggerEvent('onCancel', event, {});
    },
    handleConsultWechat() {
      this.triggerEvent('onCancel', {}, {});
      wx.nextTick(() => {
        this.setData({ showQrCodeModal: true });
      });
    },
    handleConsultPhone () {
      this.triggerEvent('onCancel', {}, {});
      wx.nextTick(() => {
        wx.makePhoneCall({ phoneNumber: this.properties.phoneNumber });
      });
    },
    handleCloseQrCodeModal() {
      this.setData({ showQrCodeModal: false });
    },
  },
});
