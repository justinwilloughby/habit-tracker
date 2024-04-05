export type Entry = {
    id: string;
    date: string;
    status: 'Success' | 'Failed' | 'Nothing';
}

export type Streak = {
    start_date: string;
    end_date: string;
    streak_length: number;
}