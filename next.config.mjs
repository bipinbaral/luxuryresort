import fs from 'node:fs';

// Workaround for Node.js v22 bug on Windows where fs.readlink on non-symlink files returns EISDIR instead of EINVAL,
// which breaks Webpack's symlink resolution in Next.js.
const patchError = (err) => {
  if (err && (err.code === 'EISDIR' || err.errno === -4068 || err.errno === -4048)) {
    err.code = 'EINVAL';
  }
  return err;
};

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

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(this, path, options);
  } catch (err) {
    throw patchError(err);
  }
};

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
