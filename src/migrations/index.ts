import * as migration_20241215_130325_tables from './20241215_130325_tables';

export const migrations = [
  {
    up: migration_20241215_130325_tables.up,
    down: migration_20241215_130325_tables.down,
    name: '20241215_130325_tables'
  },
];
