import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Create a new database connection
const pool = new Pool({
  connectionString: databaseUrl,
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('Starting migration...');

    // Get all migration files and sort them
    const migrationsDir = path.join(__dirname, '..', 'lib', 'db', 'migrations');
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files`);

    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "_migrations" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
        "applied_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get already applied migrations
    const { rows: appliedMigrations } = await client.query(
      'SELECT name FROM "_migrations"'
    );
    const appliedMigrationNames = appliedMigrations.map((m: { name: string }) => m.name);

    // Begin transaction
    await client.query('BEGIN');

    // Apply each migration in order
    for (const migrationFile of migrationFiles) {
      if (appliedMigrationNames.includes(migrationFile)) {
        console.log(`Migration ${migrationFile} already applied, skipping`);
        continue;
      }

      console.log(`Applying migration: ${migrationFile}`);
      const migrationPath = path.join(migrationsDir, migrationFile);
      const migrationSql = fs.readFileSync(migrationPath, 'utf8');

      await client.query(migrationSql);
      await client.query(
        'INSERT INTO "_migrations" (name) VALUES ($1)',
        [migrationFile]
      );
    }

    // Commit transaction
    await client.query('COMMIT');
    console.log('Migration completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migration
runMigration(); 