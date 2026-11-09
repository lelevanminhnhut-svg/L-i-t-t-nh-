(() => {
  "use strict";

  const MESSAGES = [
    "tớ với bạn",
    "cũng chơi thân với nhau",
    "cũng lâu rồi",
    "hôm nay tớ sẽ mạnh dạn nói với cậu",
    "tớ thích cậu",
    "cậu làm ny tôi nha🥰"
  ];

  const MESSAGE_DURATION_MS = 4000;
  const ELLIPSIS_DURATION_MS = 4500;
  const MIN_FONT_SIZE_PX = 8;
  const EDGE_GUTTER_PX = 22;
  const MUSIC_PATH = "./assets/ban-tinh-oi.mp3";

  const messageElement = document.getElementById("message");
  const replayButton = document.getElementById("replay-button");
  const musicButton = document.getElementById("music-button");
  const audioElement = document.getElementById("background-music");

  let currentIndex = 0;
  let sequenceTimer = null;
  let musicSourceAssigned = false;
  let audioErrorHandler = null;

  if (!messageElement || !replayButton || !musicButton || !audioElement) {
    return;
  }

  audioElement.loop = true;
  audioElement.preload = "none";

  function fitSingleLine() {
    // Thu nhỏ phông chữ đến khi toàn bộ câu vừa trong chiều rộng màn hình.
    messageElement.style.fontSize = "";
    const availableWidth = Math.max(80, window.innerWidth - EDGE_GUTTER_PX * 2);
    let size = Number.parseFloat(window.getComputedStyle(messageElement).fontSize) || 16;
    let measuredWidth = messageElement.getBoundingClientRect().width;

    if (measuredWidth > availableWidth && measuredWidth > 0) {
      size = Math.max(MIN_FONT_SIZE_PX, size * (availableWidth / measuredWidth));
      messageElement.style.fontSize = `${size}px`;
      measuredWidth = messageElement.getBoundingClientRect().width;

      while (measuredWidth > availableWidth && size > MIN_FONT_SIZE_PX) {
        size = Math.max(MIN_FONT_SIZE_PX, size - 0.5);
        messageElement.style.fontSize = `${size}px`;
        measuredWidth = messageElement.getBoundingClientRect().width;
      }
    }
  }

  function clearSequenceTimer() {
    if (sequenceTimer !== null) {
      window.clearTimeout(sequenceTimer);
      sequenceTimer = null;
    }
  }

  function showMessage(index) {
    if (index < 0 || index >= MESSAGES.length) {
      messageElement.classList.remove("is-animating", "is-ellipsis");
      messageElement.style.visibility = "hidden";
      return;
    }

    currentIndex = index;
    const phrase = MESSAGES[index];
    const endsWithEllipsis = phrase.endsWith("...");
    const duration = endsWithEllipsis ? ELLIPSIS_DURATION_MS : MESSAGE_DURATION_MS;

    messageElement.classList.remove("is-animating", "is-ellipsis");
    messageElement.style.animation = "none";
    messageElement.textContent = phrase;
    messageElement.style.visibility = "visible";
    fitSingleLine();

    // Buộc trình duyệt áp dụng trạng thái ban đầu trước khi bắt đầu hoạt ảnh mới.
    void messageElement.offsetWidth;
    messageElement.style.animation = "";
    messageElement.style.animationDuration = `${duration}ms`;
    if (endsWithEllipsis) {
      messageElement.classList.add("is-ellipsis");
    }
    messageElement.classList.add("is-animating");

    sequenceTimer = window.setTimeout(() => {
      sequenceTimer = null;
      if (index + 1 < MESSAGES.length) {
        showMessage(index + 1);
      } else {
        messageElement.classList.remove("is-animating", "is-ellipsis");
        messageElement.style.visibility = "hidden";
      }
    }, duration);
  }

  function replaySequence() {
    clearSequenceTimer();
    currentIndex = 0;
    showMessage(currentIndex);
  }

  function updateMusicButton(isPlaying) {
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute("aria-label", isPlaying ? "Tắt nhạc" : "Bật nhạc");
    musicButton.setAttribute("title", isPlaying ? "Tắt nhạc" : "Bật nhạc");
  }

  function removeAudioErrorHandler() {
    if (audioErrorHandler) {
      audioElement.removeEventListener("error", audioErrorHandler);
      audioErrorHandler = null;
    }
  }

  async function toggleMusic() {
    if (!audioElement.paused) {
      audioElement.pause();
      updateMusicButton(false);
      return;
    }

    if (!musicSourceAssigned) {
      audioElement.src = MUSIC_PATH;
      musicSourceAssigned = true;
    }

    removeAudioErrorHandler();
    audioErrorHandler = () => {
      updateMusicButton(false);
      removeAudioErrorHandler();
      window.alert(
        "Chưa tìm thấy tệp nhạc. Hãy thêm bản MP3 bạn có quyền sử dụng vào assets/ban-tinh-oi.mp3 rồi tải lại trang."
      );
    };
    audioElement.addEventListener("error", audioErrorHandler, { once: true });

    try {
      await audioElement.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
      // Không phát âm thanh giả; thông báo đúng khi tệp chưa có hoặc không phát được.
      if (audioElement.error || error?.name === "NotSupportedError") {
        removeAudioErrorHandler();
        window.alert(
          "Chưa phát được nhạc. Hãy đặt tệp MP3 hợp pháp tại assets/ban-tinh-oi.mp3 rồi thử lại."
        );
      } else if (error?.name === "NotAllowedError") {
        removeAudioErrorHandler();
        window.alert("Trình duyệt chưa cho phép phát nhạc. Hãy chạm nút nhạc để thử lại.");
      }
    }
  }

  replayButton.addEventListener("click", replaySequence);
  musicButton.addEventListener("click", toggleMusic);

  audioElement.addEventListener("play", () => updateMusicButton(true));
  audioElement.addEventListener("pause", () => updateMusicButton(false));
  audioElement.addEventListener("ended", () => updateMusicButton(false));

  window.addEventListener("resize", () => {
    if (messageElement.classList.contains("is-animating")) {
      fitSingleLine();
    }
  });

  document.addEventListener("visibilitychange", () => {
    // Nếu người xem chuyển về tab khác, âm nhạc vẫn chạy khi đã được họ bật.
    if (document.visibilityState === "visible" && messageElement.classList.contains("is-animating")) {
      fitSingleLine();
    }
  });

  replaySequence();
})();
