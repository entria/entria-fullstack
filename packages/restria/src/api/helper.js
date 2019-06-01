// @flow

import jwt from 'jsonwebtoken';
// import { User } from '../models';
import { jwtSecret } from '../common/config';
import { validLoginTokenScopes } from '../common/consts';

import type { LocationHeaders } from '../TypeDefinition';

/**
 * Return user and seller given a JWT token
 * @param token - jwt token with userId
 * @returns {*}
 */
export async function getUser(token: string) {
  // console.log(token);
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt.verify(token.replace('JWT', '').trim(), jwtSecret);

    if (Object.values(validLoginTokenScopes).indexOf(decodedToken.scope) === -1) {
      return null;
    }

    return {};
    // return await User.findOne({
    //   _id: decodedToken.id,
    // });
  } catch (err) {
    return null;
  }
}

export function getLocation({ longitude, latitude, locationtimestamp }: LocationHeaders) {
  if (longitude && latitude && locationtimestamp) {
    return {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      timestamp: new Date(locationtimestamp),
    };
  }

  return null;
}
