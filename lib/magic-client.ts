import { Magic } from 'magic-sdk';

const createMagic = () => {
  return typeof window !== 'undefined' && new Magic('pk_live_0532FEDD26C87A09');
};

export const magic: any = createMagic();

console.log('magic setup', magic);
