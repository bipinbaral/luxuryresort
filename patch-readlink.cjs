const fs = require('fs');
const path = require('path');

// Strictly run ONLY on Windows to fix Node 22 libuv EISDIR & missing parent dir bugs.
// Does NOTHING on Vercel/Linux so node fs is 100% standard on Linux deployments.
if (process.platform !== 'win32') {
  return;
}

function patchError(err) {
  if (err && (err.code === 'EISDIR' || err.errno === -4068 || err.errno === -4048)) {
    err.code = 'EINVAL';
  }
  return err;
}

if (fs.readlink) {
  const origReadlink = fs.readlink;
  fs.readlink = function (filePath, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    return origReadlink.call(this, filePath, options, (err, linkString) => {
      if (callback) callback(patchError(err), linkString);
    });
  };
}

if (fs.readlinkSync) {
  const origReadlinkSync = fs.readlinkSync;
  fs.readlinkSync = function (filePath, options) {
    try {
      return origReadlinkSync.call(this, filePath, options);
    } catch (err) {
      throw patchError(err);
    }
  };
}

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (filePath, options) {
    try {
      return await origPromisesReadlink.call(this, filePath, options);
    } catch (err) {
      throw patchError(err);
    }
  };
}

function ensureParentDir(destPath) {
  try {
    if (typeof destPath === 'string') {
      const parent = path.dirname(destPath);
      if (parent && !fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
      }
    }
  } catch (e) {}
}

if (fs.openSync) {
  const origOpenSync = fs.openSync;
  fs.openSync = function (filePath, flags, mode) {
    if (typeof flags === 'string' && (flags.includes('w') || flags.includes('a') || flags.includes('+'))) {
      ensureParentDir(filePath);
    }
    return origOpenSync.call(this, filePath, flags, mode);
  };
}

if (fs.open) {
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
    if (typeof flags === 'string' && (flags.includes('w') || flags.includes('a') || flags.includes('+'))) {
      ensureParentDir(filePath);
    }
    return origOpen.call(this, filePath, flags, mode, callback);
  };
}

if (fs.renameSync) {
  const origRenameSync = fs.renameSync;
  fs.renameSync = function (oldPath, newPath) {
    ensureParentDir(newPath);
    return origRenameSync.call(this, oldPath, newPath);
  };
}

if (fs.rename) {
  const origRename = fs.rename;
  fs.rename = function (oldPath, newPath, callback) {
    ensureParentDir(newPath);
    return origRename.call(this, oldPath, newPath, callback);
  };
}

if (fs.promises && fs.promises.rename) {
  const origPromisesRename = fs.promises.rename;
  fs.promises.rename = async function (oldPath, newPath) {
    ensureParentDir(newPath);
    return await origPromisesRename.call(this, oldPath, newPath);
  };
}
