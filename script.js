:root {
  --primary: #4a00e0;
  --secondary: #8e2de2;
  --accent: #fc00ff;
  --text: #ffffff;
  --bg: #121212;
  --card-bg: #1e1e1e;
  --success: #4CAF50;
  --error: #f44336;
}

[data-theme="light"] {
  --text: #333333;
  --bg: #f5f5f5;
  --card-bg: #ffffff;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  color: var(--text);
  min-height: 100vh;
  transition: background 0.3s ease;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Loading Screen */
#loadingScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 5px solid var(--accent);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

body:not(.loading) #loadingScreen {
  display: none;
}

/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.2);
}

nav a {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

nav a:hover {
  opacity: 0.8;
}

.theme-toggle {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.theme-toggle:hover {
  transform: scale(1.05);
}

/* Main Content */
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

.verification-box {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.verification-box h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.verification-steps {
  text-align: left;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.verification-steps ol {
  padding-left: 1.5rem;
}

.verification-steps li {
  margin-bottom: 0.5rem;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1.5rem 0;
}

/* Discord Button */
.discord-btn {
  display: inline-block;
  background: #5865F2;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  margin: 1rem 0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.discord-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4);
}

/* User Info */
#userInfo {
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--accent);
  margin-bottom: 1rem;
}

.user-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.user-status {
  color: var(--success);
  margin-bottom: 1rem;
}

.join-server-btn {
  background: var(--success);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.join-server-btn:hover {
  opacity: 0.9;
}

/* Playlist Section */
.playlist-section {
  margin: 1.5rem 0;
}

#playlistSelector {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  margin-bottom: 0.5rem;
}

#nowPlaying {
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Gradient Controls */
.gradient-controls {
  margin-top: 1.5rem;
}

.gradient-controls button {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.gradient-controls button:hover {
  background: rgba(255, 255, 255, 0.2);
}

#gradientPickers {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

#gradientPickers input {
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
}

/* Music Player */
.music-player {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.album-art {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.music-info {
  flex: 1;
}

.music-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.track-info span {
  font-size: 0.8rem;
  opacity: 0.8;
}

#progressSlider {
  flex: 1;
  height: 5px;
  cursor: pointer;
}

.music-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.music-controls button {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.music-controls button:hover {
  transform: scale(1.1);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.volume-control span {
  font-size: 0.8rem;
}

#volumeSlider {
  flex: 1;
  height: 5px;
  cursor: pointer;
}

/* Slider Controller */
.slider-container {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.slider-container .label {
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  text-align: center;
}

#hueSlider {
  width: 100%;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .verification-box {
    padding: 1.5rem;
  }
  
  .music-player {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .album-art {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
