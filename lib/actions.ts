'use server';

import { sql } from '@vercel/postgres';
import { Entry } from './definitions';
import { revalidatePath } from 'next/cache';

export async function upsertEntry(date: Date, status: string) {
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Extract the day from the date

    const existingEntry = await sql`SELECT * FROM entries WHERE date::date = ${day.toISOString()}`;

    if (existingEntry.rowCount > 0) {
        // Update the existing entry
        await sql`UPDATE entries SET status = ${status} WHERE date::date = ${day.toISOString()} RETURNING *`;
    } else {
        // Create a new entry
        await sql`INSERT INTO entries (date, status) VALUES (${date.toISOString()}, ${status}) RETURNING *`;
    }

    revalidatePath('/');
}