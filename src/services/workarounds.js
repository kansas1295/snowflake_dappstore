/**
 * This file contains a few "workaround" functions
 * These functions must only be used during the migration, from the "legacy" phase to the new one
 */

import resolvers from '../legacy/resolvers.json';

function getResolverName(resolverId) {
  if (resolvers[resolverId].title && resolverId !== '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A') {
    return resolvers[resolverId].title;
  }

  return 'Default';
}

export {
  getResolverName,
};
