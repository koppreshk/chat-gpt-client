import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react"
import { Button, LinearProgress, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { FlexBox } from "./common";
import { ChatHistory } from "./chat-history";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export type Chat = {
    userQuestion: string;
    modelResponse?: string;
}

const StyledTextArea = styled(TextField)`
    width: calc(100% - 30px);  
    max-width: 600px;
`;

const Menu = styled(FlexBox)`
    width: 17%;
    height: 100%;
    background-color: #202123;
`;

export const ChatWindow = React.memo(() => {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setResponse] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
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
            }).then((res) => {
                setIsLoading(false);
                setResponse([...chatResponse, { userQuestion: prompt, modelResponse: res }])
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
            });
    };

    return (
        <FlexBox width="100%" height="100%">
            <Menu></Menu>
            <FlexBox justifyContent="center" width="83%" height="calc(100% - 80px)">
                <FlexBox flexDirection="column" width="100%" height="100%">
                    <ChatHistory chat={chatResponse} />
                    {isLoading && <LinearProgress />}
                    <form onSubmit={handleSubmit}>
                        <Wrapper>
                            <StyledTextArea
                                id="outlined-basic"
                                label="Input your query"
                                variant="outlined"
                                value={prompt}
                                type="text"
                                onChange={(e) => setPrompt(e.target.value)} />
                            <Button variant="text" type="submit" endIcon={<SendIcon />}></Button>
                        </Wrapper>
                    </form>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
})
