import * as migration_20241215_130325_tables from './20241215_130325_tables';
import * as migration_20241215_232145 from './20241215_232145';

export const migrations = [
  {
    up: migration_20241215_130325_tables.up,
    down: migration_20241215_130325_tables.down,
    name: '20241215_130325_tables',
  },
  {
    up: migration_20241215_232145.up,
    down: migration_20241215_232145.down,
    name: '20241215_232145'
  },
];
