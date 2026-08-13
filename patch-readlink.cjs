const fs = require('fs');

function patchError(err) {
  if (err && (err.code === 'EISDIR' || err.errno === -4068 || err.errno === -4048)) {
    err.code = 'EINVAL';
  }
  return err;
}

if (fs.readlink) {
  const origReadlink = fs.readlink;
  fs.readlink = function (path, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    return origReadlink.call(this, path, options, (err, linkString) => {
      if (callback) callback(patchError(err), linkString);
    });
  };
}

if (fs.readlinkSync) {
  const origReadlinkSync = fs.readlinkSync;
  fs.readlinkSync = function (path, options) {
    try {
      return origReadlinkSync.call(this, path, options);
    } catch (err) {
      throw patchError(err);
    }
  };
}

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(this, path, options);
    } catch (err) {
      throw patchError(err);
    }
  };
}

if (fs.realpathSync) {
  const origRealpathSync = fs.realpathSync;
  fs.realpathSync = function (path, options) {
    try {
      return origRealpathSync.call(this, path, options);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.errno === -4068 || err.errno === -4048)) {
        return typeof path === 'string' ? path : path.toString();
      }
      throw err;
    }
  };
  if (fs.realpathSync.native) {
    const origNative = fs.realpathSync.native;
    fs.realpathSync.native = function (path, options) {
      try {
        return origNative.call(this, path, options);
      } catch (err) {
        if (err && (err.code === 'EISDIR' || err.errno === -4068 || err.errno === -4048)) {
          return typeof path === 'string' ? path : path.toString();
        }
        throw err;
      }
    };
  }
}
