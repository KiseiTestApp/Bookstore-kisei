import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";
import {Book} from "@/app/types/book";

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
    server: {
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_KEY || '',
        nodes: [
            {
                host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
                port: 443,
                protocol: 'https',
            }
        ],
    },
    additionalSearchParameters: {
        query_by: 'title',
        highlight_fields: 'title,author'
    }
});

export const typesenseClient = new Typesense.Client({
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_KEY || '',
    nodes: [
        {
            host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
            port: 443,
            protocol: 'https',
        }
    ],
    connectionTimeoutSeconds: 2,
})

export const searchClient = typesenseAdapter.searchClient;

export const searchBooks = async (
    query: string,
    options: {
        per_page?: number;
        page?: number;
        filters?: string;
        sortBy?: string;
    } = {}
): Promise<{
    hits: { document: Book }[];
    total: number;
}> => {
    try {
        const searchParameters = {
            q: query,
            query_by: 'title,author',
            per_page: options.per_page || 5,
            page: options.page || 1,
            filter_by: options.filters || '',
            sort_by: options.sortBy || 'price:asc',
        };
        const results = await typesenseClient.collections('books').documents().search(searchParameters);

        return {
            hits: results.hits?.map(hit => ({ document: hit.document as Book })) || [],
            total: results.found || 0,
        };
    } catch (error) {
        console.error("Error occurred while searching books.", error);
        return { hits: [], total: 0 };
    }
};

export const instantSearchConfig = {
    searchClient,
    indexName: 'books',
    defaultSearchParameters: {
        queryBy: 'title',
        perPage: 5,
        highlightFields: 'title,author',
        highlightStartTag: '<mark>',
        highlightEndTag: '</mark>',
    },
};

export const getBooksByBookId = async (bookId: string): Promise<Book | null> => {
    try {
        const document = await typesenseClient.collections("books").documents(bookId).retrieve();
        return document as unknown as Book;
    } catch (error) {
        console.error("Error occurred while getBooksByBookId", error);
        return null;
    }
}

