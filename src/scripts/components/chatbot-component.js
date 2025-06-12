import CONFIG from "../config";

class ChatbotComponent {
  constructor() {
    this.chatBox = null;
    this.userInput = null;
    this.typingIndicator = null;
    this.sendButton = null;
    this.chatToggleButton = null;
    this.chatbotContainer = null;
    this.isChatOpen = false;
  }

  async render() {
    return `
      <button id="chat-toggle-button" class="chat-toggle-button">
        💬
      </button>
      <div id="chatbot-container-popup" class="chat-container-popup d-none">
        <div class="chat-header">
          <h2>🏝️ Chatbot Wisata Indonesia</h2>
          <p>Asisten virtual untuk menjelajahi keindahan Indonesia</p>
        </div>

        <div class="chat-box" id="chatBox">
          <div class="welcome-message">
            <h3>Selamat datang! 👋</h3>
            <p>Saya siap membantu Anda menemukan informasi tentang wisata Indonesia. Tanyakan apa saja tentang destinasi, kuliner, budaya, atau tips traveling!</p>
          </div>
        </div>

        <div class="typing-indicator" id="typingIndicator">
          <div class="avatar bot-avatar">🤖</div>
          <div class="typing-content">
            <div class="typing-dots">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
            <span>Sedang mengetik...</span>
          </div>
        </div>

        <div class="input-container">
          <div class="input-wrapper">
            <input
              type="text"
              id="userInput"
              placeholder="Ketik pertanyaan Anda tentang wisata Indonesia..."
            />
            <button class="send-button" id="sendButton">
              ➤
            </button>
          </div>
          <button class="reset-button" id="resetButton">
            🔄 Reset
          </button>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.chatBox = document.getElementById("chatBox");
    this.userInput = document.getElementById("userInput");
    this.typingIndicator = document.getElementById("typingIndicator");
    this.sendButton = document.getElementById("sendButton");
    this.chatToggleButton = document.getElementById("chat-toggle-button");
    this.chatbotContainer = document.getElementById("chatbot-container-popup");
    const resetButton = document.getElementById("resetButton");

    this.sendButton.addEventListener("click", this.sendMessage.bind(this));
    this.userInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !this.sendButton.disabled) {
        this.sendMessage();
      }
    });
    this.chatToggleButton.addEventListener("click", this.toggleChat.bind(this));
    resetButton.addEventListener("click", this.resetChat.bind(this));

    // Auto focus input saat halaman dimuat
    // Initial focus on load might conflict with page rendering,
    // so focus only if chatbot is open after rendering.
    if (this.isChatOpen) {
      this.userInput.focus();
    }
  }

  addMessage(message, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

    const avatar = document.createElement("div");
    avatar.className = `avatar ${isUser ? "user-avatar" : "bot-avatar"}`;
    avatar.textContent = isUser ? "👤" : "🤖";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = message;

    if (isUser) {
      messageDiv.appendChild(messageContent);
      messageDiv.appendChild(avatar);
    } else {
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(messageContent);
    }

    this.chatBox.appendChild(messageDiv);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  showTypingIndicator() {
    this.typingIndicator.classList.add("show");
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  hideTypingIndicator() {
    this.typingIndicator.classList.remove("show");
  }

  setButtonState(disabled) {
    this.sendButton.disabled = disabled;
    this.userInput.disabled = disabled;
  }

  async typeMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot-message";

    const avatar = document.createElement("div");
    avatar.className = "avatar bot-avatar";
    avatar.textContent = "🤖";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    this.chatBox.appendChild(messageDiv);

    let index = 0;
    const typingSpeed = 25; // ms per karakter

    return new Promise((resolve) => {
      const typeTimer = setInterval(() => {
        messageContent.textContent = message.substring(0, index + 1);
        index++;
        this.chatBox.scrollTop = this.chatBox.scrollHeight;

        if (index >= message.length) {
          clearInterval(typeTimer);
          resolve();
        }
      }, typingSpeed);
    });
  }

  async sendMessage() {
    const message = this.userInput.value.trim();
    if (!message) return;

    this.addMessage(message, true);
    this.userInput.value = "";

    this.setButtonState(true);

    setTimeout(() => {
      this.showTypingIndicator();
    }, 300);

    try {
      const response = await fetch(`${CONFIG.ML_URL_API}/api/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 800));

      this.hideTypingIndicator();

      if (data.error) {
        this.addMessage("Maaf, terjadi kesalahan. Silakan coba lagi. 😅");
        console.error("Error:", data.error);
      } else {
        await this.typeMessage(data.response);
      }
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage("Maaf, terjadi kesalahan koneksi. Silakan coba lagi. 🔄");
      console.error("Error:", error);
    } finally {
      this.setButtonState(false);
      this.userInput.focus();
    }
  }

  async resetChat() {
    try {
      await fetch(`${CONFIG.ML_URL_API}/api/chatbot/reset`, {
        method: "POST",
      });

      this.chatBox.innerHTML = `
        <div class="welcome-message">
          <h3>Selamat datang! 👋</h3>
          <p>Saya siap membantu Anda menemukan informasi tentang wisata Indonesia. Tanyakan apa saja tentang destinasi, kuliner, budaya, atau tips traveling!</p>
        </div>
      `;

      this.userInput.focus();
    } catch (error) {
      console.error("Error resetting chat:", error);
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.chatbotContainer.classList.remove("d-none");
      this.chatToggleButton.innerHTML = "❌"; // Ganti ikon menjadi close
      this.userInput.focus();
    } else {
      this.chatbotContainer.classList.add("d-none");
      this.chatToggleButton.innerHTML = "💬"; // Ganti ikon menjadi chat
    }
  }
}

export default ChatbotComponent;
