export interface Category {
    id: number;
    name: string;
    icon: React.ReactNode;
    gradient: string;
    articles: number;
    description: string;
    tags: string[];
    trending: boolean;
}

export type FilterType = "All" | "Trending" | "Most Popular" | "Recent";
