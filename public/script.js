const chat = document.getElementById("chat");
const message = document.getElementById("message");
const send = document.getElementById("send");

send.onclick = async () => {

    const text = message.value.trim();

    if (!text) return;

    chat.innerHTML += `
        <div class="message user">
            ${text}
        </div>
    `;

    message.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text
        })
    });

    const data = await response.json();

    chat.innerHTML += `
        <div class="message ai">
            ${data.reply}
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;
};