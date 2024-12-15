import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` RENAME COLUMN "description" TO "subtitle";`)
  await db.run(sql`ALTER TABLE \`pages\` RENAME COLUMN "content" TO "markdown";`)
  await db.run(sql`ALTER TABLE \`categories\` RENAME COLUMN "description" TO "subtitle";`)
  await db.run(sql`ALTER TABLE \`settings\` RENAME COLUMN "about" TO "subtitle";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` RENAME COLUMN "subtitle" TO "description";`)
  await db.run(sql`ALTER TABLE \`pages\` RENAME COLUMN "markdown" TO "content";`)
  await db.run(sql`ALTER TABLE \`categories\` RENAME COLUMN "subtitle" TO "description";`)
  await db.run(sql`ALTER TABLE \`settings\` RENAME COLUMN "subtitle" TO "about";`)
}
