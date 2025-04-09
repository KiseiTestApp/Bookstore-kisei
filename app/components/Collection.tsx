"use client"

import {useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase/config";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import {useRouter} from "next/navigation";

const genresImages = {
    'Viễn tưởng': "/genre_images/fantasy_book.png",
    "Kỳ bí": "/genre_images/thriller_book.png",
    "Truyện tranh": "/genre_images/comic-book_3655730.png",
    "Lãng mạn": "/genre_images/romance_5228286.png",
    "Lịch sử": "/genre_images/history-book_3743402.png",
    "Kỹ năng sống": "/genre_images/knowledge_book.png",
} as {[key: string]: string};

const Collection = () => {
    const [genres, setGenres] = useState<string[]>([]);
    const router = useRouter();
    const fetchGenres = async () => {
        const dataSnapshot = await getDocs(collection(db, "books"));
        const genres = new Set<string>();
        dataSnapshot.forEach((doc) => {
            const bookData = doc.data();
            if (bookData.genre) {
                genres.add(bookData.genre);
            }
        });
        return Array.from(genres.values());
    };
    useEffect(() => {
        fetchGenres().then((fetchedGenres) => setGenres(fetchedGenres));
    })
    return (
        <Box className="flex flex-col bg-white my-10 rounded-xl">
            <Box className="flex flex-row items-center p-4 gap-3">
                <GridViewOutlined fontSize="large" color="primary" />
                <Typography variant="h5" color="textPrimary" fontWeight="500">
                    Danh mục sản phẩm
                </Typography>
            </Box>
            <Divider />
            <Box className="flex flex-wrap gap-3 p-4 justify-evenly items-center md:grid-cols-3 xs:grid-cols-2">
                {genres.map((genre) => (
                    <Box
                        key={genre}
                        className="flex flex-col items-center justify-center gap-3 p-2 cursor-pointer hover:border-neutral-100 hover:shadow-sm"
                        onClick={() => {
                            const urlSafeGenre = genre.replace(/ /g, "-");
                            router.push(`/collection/${encodeURIComponent(urlSafeGenre)}`);
                         }}
                    >
                        <Image
                            src={genresImages[genre] || "https://picsum.photos/64"}
                            alt={genre}
                            width={64}
                            height={64}

                        />
                        <Typography variant="body1" color="textPrimary">{genre}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Collection;