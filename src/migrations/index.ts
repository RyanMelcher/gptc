import * as migration_20260612_191435_baseline from './20260612_191435_baseline';
import * as migration_20260721_212321_admin_customization from './20260721_212321_admin_customization';

export const migrations = [
  {
    up: migration_20260612_191435_baseline.up,
    down: migration_20260612_191435_baseline.down,
    name: '20260612_191435_baseline',
  },
  {
    up: migration_20260721_212321_admin_customization.up,
    down: migration_20260721_212321_admin_customization.down,
    name: '20260721_212321_admin_customization'
  },
];
