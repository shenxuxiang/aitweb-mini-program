function Iterator(start, end, step) {
  this.start = start;
  this.end = end;
  // 步长，每次累加的数。
  this.step = step;
  // 计数器，记录当前的值。
  this.counter = this.start;
}

Iterator.prototype.next = function () {
  this.counter += this.step;
  let done = this.counter >= this.end;
  //
  if (this.step < 0) done = this.counter <= this.end;
  return { value: this.counter, done };
}
Iterator.prototype.interval = function(callback, time) {
  const iterator = this;
  function workLoop() {
    setTimeout(() => {
      const { value, done } = iterator.next();
      callback(value);
      if (!done) workLoop();
    }, time);
  }
  workLoop();
}

function dateFormat(timeStamp = 0, format = 'YYYY-MM-DD hh:mm:ss') {
  var dt = new Date(timeStamp);
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();

  format = format.replace(/Y+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('' + year).slice(-len);
  });
  format = format.replace(/M+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('0' + month).slice(-len);
  });
  format = format.replace(/D+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('0' + date).slice(-len);
  });
  format = format.replace(/h+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('' + hours).slice(-len);
  });
  format = format.replace(/m+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('0' + minutes).slice(-len);
  });
  format = format.replace(/s+/, function() {
    var match = arguments[0];
    var len = match.length;
    return ('0' + seconds).slice(-len);
  });

  return format;
}


module.exports = {
  Iterator,
  dateFormat,
}
