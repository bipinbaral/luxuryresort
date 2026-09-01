const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.platform === 'win32') {
  const origCreateWriteStream = fs.createWriteStream;
  fs.createWriteStream = function (filePath, options) {
    if (typeof filePath === 'string' && (filePath.endsWith('trace') || path.basename(filePath) === 'trace')) {
      const tmpPath = path.join(os.tmpdir(), `next-trace-${Date.now()}`);
      return origCreateWriteStream.call(this, tmpPath, options);
    }
    return origCreateWriteStream.call(this, filePath, options);
  };

  const origOpen = fs.open;
  fs.open = function (filePath, flags, mode, callback) {
    if (typeof mode === 'function') {
      callback = mode;
      mode = undefined;
    }
    if (typeof flags === 'function') {
      callback = flags;
      flags = 'r';
    }
    if (typeof filePath === 'string' && (filePath.endsWith('trace') || path.basename(filePath) === 'trace')) {
      const tmpPath = path.join(os.tmpdir(), `next-trace-${Date.now()}`);
      return origOpen.call(this, tmpPath, flags, mode, callback);
    }
    return origOpen.call(this, filePath, flags, mode, callback);
  };

  const origOpenSync = fs.openSync;
  fs.openSync = function (filePath, flags, mode) {
    if (typeof filePath === 'string' && (filePath.endsWith('trace') || path.basename(filePath) === 'trace')) {
      const tmpPath = path.join(os.tmpdir(), `next-trace-${Date.now()}`);
      return origOpenSync.call(this, tmpPath, flags, mode);
    }
    return origOpenSync.call(this, filePath, flags, mode);
  };
}
