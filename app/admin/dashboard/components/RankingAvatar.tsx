"use client"

import Avatar, {AvatarProps} from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";

interface RankingAvatarProps extends AvatarProps {
    rank: number;
}

export const RankingAvatar = styled(Avatar)<RankingAvatarProps>(({ theme, rank }) => ({
    width: 32,
    height: 32,
    backgroundColor:
        rank === 1 ? '#D6AF36' :
            rank === 2 ? '#A7A7AD' :
                rank === 3 ? '#824A02' :
                    theme.palette.grey[200],
    color: rank <=3 ? theme.palette.common.white : theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '0.875rem',
}));