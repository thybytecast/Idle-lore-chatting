let messages = [];
let index = 0;

const log = document.getElementById("chat-log");
const nextBtn = document.getElementById("next-btn");

fetch("conversation.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("chat-title").textContent = data.title;
    messages = data.messages;
  });

function addNextMessage() {
  if (index >= messages.length) {
    nextBtn.disabled = true;
    nextBtn.textContent = "End of chat";
    return;
  }

  const msg = messages[index];

  if (msg.type === "system") {
    const sys = document.createElement("div");
    sys.className = "system";
    sys.textContent = msg.text;
    log.appendChild(sys);
  }

  if (msg.type === "message") {
    const line = document.createElement("div");
    line.className = "message";

    const user = document.createElement("span");
    user.className = "username";
    user.style.color = msg.color || "#000";
    user.textContent = msg.user + ": ";

    const text = document.createElement("span");
    text.textContent = msg.text;

    line.appendChild(user);
    line.appendChild(text);
    log.appendChild(line);
  }

  log.scrollTop = log.scrollHeight;
  index++;
}

// Button click
nextBtn.addEventListener("click", addNextMessage);

// Scroll reveal
log.addEventListener("scroll", () => {
  const nearBottom =
    log.scrollTop + log.clientHeight >= log.scrollHeight - 10;

  if (nearBottom) {
    addNextMessage();
  }
});
