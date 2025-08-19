import * as jwt_decode_ns from 'jwt-decode';

const isTokenValid = (token: string): boolean => {
    if (!token) return false;
    return true;
}

const jwt_decode = (token: string): Record<string, unknown> => {
  const fn = (jwt_decode_ns as unknown as { default?: unknown })?.default || jwt_decode_ns;
  return (fn as unknown as (t: string) => Record<string, unknown>)(token);
};

export {
    isTokenValid,
    jwt_decode
};