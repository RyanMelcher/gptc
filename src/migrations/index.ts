import * as migration_20260612_191435_baseline from './20260612_191435_baseline';

export const migrations = [
  {
    up: migration_20260612_191435_baseline.up,
    down: migration_20260612_191435_baseline.down,
    name: '20260612_191435_baseline'
  },
];
