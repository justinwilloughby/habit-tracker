const { db } = require('@vercel/postgres');
const {
  entries
} = require('../lib/placeholder-data.js');

async function seedEntries(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS entries (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                date DATE NOT NULL,
                status VARCHAR(255) NOT NULL
            );
        `;

        console.log(`Created "entries" table`);

        const insertedEntries = await Promise.all(
            entries.map((entry) => client.sql`
                INSERT INTO entries (date, status)
                VALUES (${entry.date}, ${entry.status})
                ON CONFLICT (id) DO NOTHING;
            `),
        );

        console.log(`Seeded ${insertedEntries.length} entries`);

        return {
            createTable,
            entries: insertedEntries,
        };
    } catch (error) {
        console.error('Error seeding entries:', error);
        throw error;
    }
}

async function main() {
  const client = await db.connect();

  await seedEntries(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
