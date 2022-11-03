type ReviewType = {
    id: number; 
    user: {
        id: number;
        name: string;
    }
    rating: number;
    comment: string;
    date: string;
}

type ReviewPostType = {
    rating: string;
    comment: string;
}

export type { ReviewType, ReviewPostType };