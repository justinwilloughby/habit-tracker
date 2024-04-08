import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Entry, Streak } from './definitions';

export async function fetchEntries() {
    // noStore();

    try {
        console.log('Fetching entries...');

        const data = await sql<Entry>`
            SELECT * FROM entries
            ORDER BY date ASC
        `;

        console.log('Entries fetched:', data);

        return data.rows;
    } catch (error) {
        console.error('Failed to fetch entries:', error);
        throw new Error('Failed to fetch entries');
    }
}

export async function fetchCurrentStreak() {
    // noStore();

    try {
        console.log('Fetching current streak...');

        const data = await sql<Streak>`
            WITH ranked_entries AS (
                SELECT
                id,
                date,
                status,
                ROW_NUMBER() OVER (ORDER BY date) AS rn
                FROM
                entries
                WHERE
                status = 'Success'
            ),
            streak_groups AS (
                SELECT
                id,
                date,
                status,
                date - INTERVAL '1 day' * rn AS grp
                FROM
                ranked_entries
            )
            SELECT
                MIN(date) AS start_date,
                MAX(date) AS end_date,
                COUNT(*) AS streak_length
            FROM
                streak_groups
            GROUP BY
                grp
            ORDER BY
                start_date DESC
            LIMIT 1;
        `;

        console.log('Current streak fetched:', data);

        return data.rows[0];
    } catch (error) {
        console.error('Failed to fetch current streak:', error);
        throw new Error('Failed to fetch current streak');
    }
}