"use client"

import HeroImages from "@/app/components/HeroImages";
import Collection from "@/app/components/Collection";
import useFetchBooks from "@/app/utils/products/useFetchBooks";
import {useAuth} from "@/app/context/AuthProviderContext";
import {Box} from "@mui/system";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const ProductContainer = dynamic(() => import("@/app/components/ProductContainer"),
    {
        loading: () => <div className="h-96 bg-gray-300 animate-pulse" />,
    }
);

export default function Home() {
    const {books} = useFetchBooks();
    const {loading} = useAuth();
    return (
        <main className="py-4 mx-12">
            {loading ? (
                <Box className='flex w-full h-full justify-center items-center'>
                    <CircularProgress color='primary' />
                </Box>
            ) : (
                <Box>
                    <HeroImages />
                    <Collection />
                    <ProductContainer books={books} />
                </Box>
            )}
        </main>
    );
}
