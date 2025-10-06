export type Message = {
    id: number;
    text: string;
    personalized: boolean;
};

export type HeartlandProfile = {
    schema: 1;
    name: string;
};

export type HeartlandMessageRecord = {
    schema: 1;
    date: string;
    text: string;
};