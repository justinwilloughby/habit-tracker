// 'use server';

// import { sql } from '@vercel/postgres';
// import { Entry } from './definitions';

// export async function fetchEntries() {
//     try {
//         console.log('Fetching entries...');

//         const data = await sql<Entry>`SELECT * FROM entries`;

//         console.log('Entries fetched:', data);

//         return data.rows;
//     } catch (error) {
//         console.error('Failed to fetch entries:', error);
//         throw new Error('Failed to fetch entries');
//     }
// }