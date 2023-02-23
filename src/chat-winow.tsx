import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react"
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ChatWindow = React.memo(() => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

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
            }).then((res) => setResponse(res))
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Wrapper>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined"
                        value={prompt}
                        type="text"
                        onChange={(e) => setPrompt(e.target.value)} />
                    <Button variant="text" type="submit" endIcon={<SendIcon />}>Submit</Button>
                </Wrapper>
            </form>
            <p>{response}</p>
        </>
    )
})
