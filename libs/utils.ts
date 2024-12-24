export async function translate(text: string, options: { to: string }) {
  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen2.5-32b-instruct-mlx",
      messages: [
        {
          role: "system",
          content:
            "Translate the user input into the target language and return only the translated text. Target language: " +
            options.to,
        },
        { role: "user", content: text },
      ],
      stream: false,
      temperature: 0,
    }),
  });

  const result = await response.json();
  console.log("result", result);

  return result.choices[0].message.content;
}
