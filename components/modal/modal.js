Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
  },
  properties: {
    visible: Boolean,
    style: String,
    opacity: Number,
  },
  methods: {
    handleClose(event) {
      this.triggerEvent('onCancel', event, {});
    },
  },
});
