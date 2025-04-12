"use client"

import {TextField, Paper, ListItem, ListItemButton, IconButton, Typography, List} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {Book} from '@/app/types/book';
import {searchBooks} from "@/lib/typesense/typesenseClient";
import Box from "@mui/material/Box";
import Image from "next/image";

interface InlineSearchProps {
    className?: string;
    isMobile?: boolean;
}

export default function InlineSearch({className}: InlineSearchProps) {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!searchText.trim()) {
            setSearchResults([]);
            return;
        }
        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const { hits } = await searchBooks(searchText, { per_page: 5 });
                setSearchResults(hits.map(hit => hit.document as Book));
                setShowSearchResults(true);
            } finally {
                setIsSearching(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchText])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    }

    const handleSearchFocus = () => {
        if (searchText && searchText.length > 0) {
            setShowSearchResults(true);
        }
    }
    const handleSearchBlur = () => {
        setTimeout(() => setShowSearchResults(false), 500);
    }
    const handleSearchClick = (bookId: string) => {
        router.push(`/book-details/${bookId}`);
        setSearchText("");
        setShowSearchResults(false);
    };
    const handleClearSearch = () => {
        setSearchText("");
        setSearchResults([]);
        setShowSearchResults(false);
    }
    return (
        <Box className={`relative ${className}`}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Tìm kiếm sách, tác giả..."
                value={searchText}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                slotProps={{
                    input: {
                        startAdornment: <SearchOutlined sx={{ marginRight: 2}} />,
                        endAdornment: searchText && (
                            <IconButton size="small" onClick={handleClearSearch} sx={{ padding: 0.5}}>
                                <CloseOutlined />
                            </IconButton>
                        ),
                    }
                }}
            />
            {showSearchResults && searchResults.length > 0 && (
                <Paper className="absolute z-50 w-full mt-1 max-h-80 overflow-auto shadow-lg">
                    <List>
                        {searchResults.map((book) => (
                            <ListItem
                                key={book.id}
                                disablePadding
                                onClick={() => handleSearchClick(book.id)}
                            >
                                <ListItemButton className="hover:bg-gray-50">
                                    <div className="flex items-center w-full p-2">
                                        {book.imageUrl && (
                                            <Image
                                                src={book.imageUrl}
                                                alt={book.title || 'No image found'}
                                                className="w-10 h-14 object-cover mr-3"
                                                width={600}
                                                height={600}
                                            />
                                        )}
                                        <Box>
                                            <Typography variant="body1" className="line-clamp-2">{book.title}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary">Tác giả: {book.author}</Typography>
                                        </Box>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    )
}
