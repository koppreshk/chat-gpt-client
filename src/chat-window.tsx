import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react"
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { FlexBox } from "./common";
import { ChatHistory } from "./chat-history";

const Wrapper = styled.div`
    width: 700px;
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
`;

const Menu = styled(FlexBox)`
    width: 260px;
    height: 100%;
    background-color: #202123;
`;

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
        <FlexBox width="100%" height="100%">
            <Menu></Menu>
            <FlexBox justifyContent="center" width="calc(100% - 340px)" height="calc(100% - 80px)" padding="40px">
                <FlexBox flexDirection="column" width="100%" height="100%">
                    <ChatHistory chat={chatResponse} />
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
