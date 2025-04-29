// SETTINGS
const clientId = '1283074346918744175'; // <-- replace with your real Discord app client ID
const redirectUri = window.location.origin + '/'; // auto-match your domain
const backendUrl = 'https://vpn-backend-plum.vercel.app';
const playlists = {
  hardcore: 'PLMJGV7p_FGBWtBoWNYv2H1508z3gyEYLS',
  shoegaze: 'PLzXFVyVdaUThF4H6qdtJBQw7iVYmULpi0',
  lofi: 'PLfsYQtR1st_XD3VBVZc77BabITQddjMpe',
  rap: 'PLIwZQxuoolfoQX3G6v55ThCQDKaLnQusI',
  jazz: 'PLneA0BedPWJEvDseXizycnviRmoHMci91'
};
let currentPlaylist = 'shoegaze';
let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
if (storedTheme) darkMode = storedTheme === 'dark';
let customColors = JSON.parse(localStorage.getItem('customGradient')) || null;

// Loading screen
window.addEventListener('load', () => {
  document.body.classList.remove('loading');
});

// Theme
function applyTheme() {
  document.body.classList.toggle('dark-mode', darkMode);
  if (customColors) {
    updateGradient();
  }
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}
function toggleTheme() {
  darkMode = !darkMode;
  applyTheme();
}
applyTheme();

// Discord Login
document.getElementById('discordLoginButton').onclick = () => {
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
  window.location.href = oauthUrl;
};

// Discord OAuth Callback
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  fetch(`${backendUrl}/api/oauth/callback?code=${code}`)
    .then(res => res.json())
    .then(data => {
      window.history.replaceState({}, document.title, redirectUri);
      if (data.error) {
        Swal.fire('Error', 'Discord login failed.', 'error');
        return;
      }
      fetch(`${backendUrl}/api/userinfo?access_token=${data.access_token}`)
        .then(res => res.json())
        .then(userData => {
          document.getElementById('userInfo').style.display = 'flex';
          document.getElementById('userAvatar').src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
          document.getElementById('userName').innerText = userData.username;
          fetch(`${backendUrl}/api/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ discord_id: userData.id })
          })
          .then(() => Swal.fire('Success', 'You have been verified! ✅', 'success'))
          .catch(() => Swal.fire('Error', 'Error sending verification.', 'error'));
        });
    })
    .catch(() => Swal.fire('Error', 'OAuth2 flow error.', 'error'));
}

// Gradient Color Customizer
function toggleGradientControls() {
  const controls = document.getElementById('gradientPickers');
  controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
}
function updateGradient() {
  const color1 = document.getElementById('color1').value;
  const color2 = document.getElementById('color2').value;
  const color3 = document.getElementById('color3').value;
  document.body.style.background = `linear-gradient(270deg, ${color1}, ${color2}, ${color3})`;
  document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradientMove 20s ease infinite';
  customColors = { color1, color2, color3 };
  localStorage.setItem('customGradient', JSON.stringify(customColors));
}

// Set saved custom colors if any
if (customColors) {
  document.getElementById('color1').value = customColors.color1;
  document.getElementById('color2').value = customColors.color2;
  document.getElementById('color3').value = customColors.color3;
  updateGradient();
}

// YouTube Player
let player;
let isMuted = false;
function onYouTubeIframeAPIReady() {
  loadPlaylist(playlists[currentPlaylist]);
}
function loadPlaylist(listId) {
  if (player) player.destroy();
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    playerVars: { listType: 'playlist', list: listId },
    events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
  });
}
function onPlayerReady(event) {
  event.target.setVolume(50);
  playMusic();
}
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    document.getElementById('albumArt').classList.add('spin');
  } else {
    document.getElementById('albumArt').classList.remove('spin');
  }
  updateTitleAndImage();
}
function playMusic() { if (player) player.playVideo(); }
function pauseMusic() { if (player) player.pauseVideo(); }
function nextMusic() { if (player) player.nextVideo(); }
function toggleMute() {
  if (!player) return;
  if (isMuted) { player.unMute(); isMuted = false; }
  else { player.mute(); isMuted = true; }
}
function changeVolume() {
  const volume = document.getElementById('volumeSlider').value;
  if (player) player.setVolume(volume);
}
function updateTitleAndImage() {
  if (!player || !player.getVideoData) return;
  const data = player.getVideoData();
  document.getElementById('musicTitle').innerText = data.title || 'Loading...';
  if (data.video_id) {
    document.getElementById('albumImage').src = `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`;
  }
}
setInterval(() => {
  if (player && player.getDuration) {
    const progress = (player.getCurrentTime() / player.getDuration()) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
  }
}, 500);

// Playlist Switching
function changePlaylist() {
  const selector = document.getElementById('playlistSelector');
  currentPlaylist = selector.value;
  document.getElementById('nowPlaying').innerText = `Now Playing: ${selector.options[selector.selectedIndex].text}`;
  loadPlaylist(playlists[currentPlaylist]);
}

// Background Hue rotation (optional)
function changeHue() {
  const hue = document.getElementById('hueSlider').value;
  document.body.style.filter = `hue-rotate(${hue}deg)`;
}

// Music Player Dragging
const musicPlayer = document.getElementById('musicPlayer');
let isDragging = false, offsetX = 0, offsetY = 0;
musicPlayer.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - musicPlayer.offsetLeft;
  offsetY = e.clientY - musicPlayer.offsetTop;
});
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    // Stay inside viewport
    newX = Math.max(0, Math.min(window.innerWidth - musicPlayer.offsetWidth, newX));
    newY = Math.max(0, Math.min(window.innerHeight - musicPlayer.offsetHeight, newY));
    musicPlayer.style.left = `${newX}px`;
    musicPlayer.style.top = `${newY}px`;
  }
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});
