import { LowSync, JSONFileSync } from 'lowdb';
import lodash from 'lodash';

import initialLocal from './initialLocal';

const path = window.require('path');
const os = window.require('os');

const adapter = new JSONFileSync(
  path.join(
    os.homedir(),
    'LenThienDang',
    `AILenThienDang-awaken-patterns.json`
  ),
  {
    serialize: (data) => data,
    deserialize: (data) => data,
  }
);

const db = new LowSync(adapter);
db.read();

if (!db.data) {
  const initialPatterns = {
    awakenPatterns: initialLocal.awakenPatterns,
  };

  db.data = initialPatterns;
  db.write();
}

db.chain = lodash.chain(db.data);
const { awakenPatterns } = db.data;

export const readLocalAwakenPatterns = () => awakenPatterns;

export const readLocalAwakenPattern = (id) =>
  db.chain.get('awakenPatterns').find({ id }).value();

export const readLocalAwakenPatternId = (id) =>
  db.chain.get('awakenPatterns').findIndex({ id }).value();

export const setLocalAwakenPatterns = (newAwakenPatterns) => {
  awakenPatterns.splice(0, awakenPatterns.length);
  newAwakenPatterns.forEach((awakenPattern) => {
    awakenPatterns.push(awakenPattern);
  });
  db.write();
};

export default db;
