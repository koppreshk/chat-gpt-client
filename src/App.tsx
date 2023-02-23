import { FormEvent, useState } from "react";
import { TextField } from "@mui/material";

export default function App() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined"
          value={prompt}
          type="text"
          color="secondary"
          onChange={(e) => setPrompt(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}