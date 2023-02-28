import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react"
import { Avatar, Button, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { deepOrange, deepPurple } from "@mui/material/colors";
import { FlexBox } from "./common";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type Chat = {
    userQuestion: string;
    modelResponse?: string;
}

export const ChatWindow = React.memo(() => {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setResponse] = useState<Chat[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send a request to the server with the prompt
        fetch("https://chat-gpt-server-one.vercel.app/chat", {
            body: JSON.stringify({ prompt: prompt }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return (res.text());
            }).then((res) => setResponse([...chatResponse, { userQuestion: prompt, modelResponse: res }]))
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <FlexBox justifyContent="center" width="calc(100% - 80px)" height="calc(100% - 80px)" padding="40px">
            <FlexBox flexDirection="column" maxWidth="600px" height="100%">
                <ChatHistory chat={chatResponse} />
                <form onSubmit={handleSubmit}>
                    <Wrapper>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined"
                            value={prompt}
                            type="text"
                            onChange={(e) => setPrompt(e.target.value)} />
                        <Button variant="text" type="submit" endIcon={<SendIcon />}>Submit</Button>
                    </Wrapper>
                </form>
            </FlexBox>
        </FlexBox>
    )
})

interface IChatHistoryProps {
    chat: Chat[]
}
const ChatHistory = React.memo((props: IChatHistoryProps) => {
    const { chat } = props;
    return (
        <FlexBox height="calc(100% - 100px)" flexDirection="column" overflowY="auto">
            {chat.map((item, idx) => (
                <FlexBox key={idx} flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                    <FlexBox gap="10px" padding="5px" alignItems="center">
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>U</Avatar>
                        <Typography variant="h6">{item.userQuestion}</Typography>
                    </FlexBox>
                    <FlexBox gap="10px" padding="5px" alignItems="center">
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>C</Avatar>
                        <Typography variant="h6">{item.modelResponse}</Typography>
                    </FlexBox>
                </FlexBox>
            ))}
        </FlexBox>
    )
})