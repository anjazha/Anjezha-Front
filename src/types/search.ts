export interface paginaton {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    resultCount: number | null;
    totalPages: number | null;
}

export interface attachments {
    type:string,
    size:string,
    url: string,
}

export interface tasks {
    address: string;
    budget: string;
    category: string;
    date: string;
    description: string;
    end_time: string;
    id: string;
    latitude: string;
    longitude: string;
    rank: number;
    schedule_type: string;
    skills: string[];
    start_time: string;
    status: string;
    title: string;
    total_count: string;
    user_id:string
    attachments?:attachments[] | null,
}

export interface dataTypeSearch {
    data: {
        tasks: tasks[];
    }
    success: boolean;
    message:string;
    pagination : paginaton
}