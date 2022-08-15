Component({
  properties: {
    name: String,
    style: String,
  },
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  methods: {
    handleClick(event) {
      this.triggerEvent('eventTap', event, {});
    }
  }
});
