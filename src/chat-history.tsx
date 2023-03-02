import React from "react"
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Avatar, Typography } from "@mui/material";
import { Chat } from "./chat-window";
import { FlexBox } from "./common";

interface IChatHistoryProps {
    chat: Chat[];
}

export const ChatHistory = React.memo((props: IChatHistoryProps) => {
    const { chat } = props;
    return (
        <FlexBox height="calc(100% - 100px)" flexDirection="column" overflowY="auto">
            {chat.map((item, idx) => (
                <FlexBox key={idx} flexDirection="column" alignItems="flex-start" gap="10px" justifyContent="flex-start">
                    <FlexBox gap="1.5rem" padding="5px" alignItems="flex-start">
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>U</Avatar>
                        <Typography variant="h6">{item.userQuestion}</Typography>
                    </FlexBox>
                    <FlexBox gap="1.5rem" padding="5px" alignItems="flex-start" style={{backgroundColor: '#f7f7f8'}}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>C</Avatar>
                        <Typography variant="h6">{item.modelResponse}</Typography>
                    </FlexBox>
                </FlexBox>
            ))}
        </FlexBox>
    )
})