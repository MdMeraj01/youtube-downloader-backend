  // Global variables
        let currentTab = 'video';
        
        // Navigation functionality
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
        
        function scrollToDownloader() {
            document.getElementById('video-downloader').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Tab switching functionality
        function switchTab(tab) {
            // Update tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active', 'bg-blue-500', 'text-white');
                btn.classList.add('text-gray-600');
            });
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // Activate selected tab
            const tabButton = document.getElementById(`${tab}-tab`);
            const tabContent = document.getElementById(`${tab}-downloader`);
            
            tabButton.classList.add('active', 'bg-blue-500', 'text-white');
            tabButton.classList.remove('text-gray-600');
            
            tabContent.classList.remove('hidden');
            tabContent.classList.add('active');
            
            currentTab = tab;
        }
        
        // Progress animation function
        function animateProgress(progressBarId, progressTextId, callback) {
            const progressBar = document.getElementById(progressBarId);
            const progressText = document.getElementById(progressTextId);
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(callback, 500);
                }
            }, 100);
        }
        
        // Video downloader functionality
        function fetchVideoInfo() {
            const url = document.getElementById('video-url').value;
            if (!url) {
                alert('Please enter a YouTube URL');
                return;
            }
            
            // Show progress
            document.getElementById('video-progress').classList.remove('hidden');
            document.getElementById('video-results').classList.add('hidden');
            
            // Simulate API call to /info endpoint
            animateProgress('video-progress-bar', 'video-progress-text', () => {
                // Hide progress and show results
                document.getElementById('video-progress').classList.add('hidden');
                displayVideoResults(url);
            });
        }
        
        function displayVideoResults(url) {
            // Extract video ID for demo purposes
            const videoId = extractVideoId(url);
            
            // Mock video data
            const videoData = {
                title: "Sample YouTube Video Title",
                duration: "5:42",
                uploader: "Sample Channel",
                thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            };
            
            // Display video info
            const videoInfo = document.getElementById('video-info');
            videoInfo.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6 fade-in-up">
                    <div class="md:w-1/3">
                        <img src="${videoData.thumbnail}" alt="Video thumbnail" 
                             class="w-full rounded-lg shadow-lg hover-scale cursor-pointer"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBMMTcwIDExMFY3MEwxMzAgOTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlRodW1ibmFpbCBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K'; this.alt='Thumbnail not available';">
                    </div>
                    <div class="md:w-2/3">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${videoData.title}</h3>
                        <div class="flex flex-wrap gap-4 text-gray-600 mb-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ${videoData.duration}
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                ${videoData.uploader}
                            </span>
                        </div>
                    </div>
                </div>
            `;
            
            // Display quality table
            const qualityTable = document.getElementById('video-quality-table');
            const qualities = [
                { quality: '2160p (4K)', size: '2.1 GB', available: true },
                { quality: '1440p (2K)', size: '1.2 GB', available: true },
                { quality: '1080p (HD)', size: '650 MB', available: true },
                { quality: '720p', size: '320 MB', available: true },
                { quality: '480p', size: '180 MB', available: true },
                { quality: '360p', size: '95 MB', available: true },
                { quality: '240p', size: '45 MB', available: true },
                { quality: '144p', size: '25 MB', available: true }
            ];
            
            let tableHTML = `
                <h4 class="text-lg font-semibold text-gray-800 mb-4">Available Quality Options:</h4>
                <div class="hidden md:block">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-3 px-4 font-semibold text-gray-700">Quality</th>
                                <th class="text-left py-3 px-4 font-semibold text-gray-700">File Size</th>
                                <th class="text-left py-3 px-4 font-semibold text-gray-700">Download</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            qualities.forEach((item, index) => {
                tableHTML += `
                    <tr class="border-b border-gray-100 slide-in-left" style="animation-delay: ${index * 0.1}s">
                        <td class="py-3 px-4 font-medium text-gray-800">${item.quality}</td>
                        <td class="py-3 px-4 text-gray-600">${item.size}</td>
                        <td class="py-3 px-4">
                            <button onclick="downloadVideo('${url}', '${item.quality}')" 
                                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Download
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            tableHTML += `
                        </tbody>
                    </table>
                </div>
                <div class="md:hidden space-y-4">
            `;
            
            // Mobile cards
            qualities.forEach((item, index) => {
                tableHTML += `
                    <div class="bg-gray-50 rounded-lg p-4 slide-in-left" style="animation-delay: ${index * 0.1}s">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-gray-800">${item.quality}</span>
                            <span class="text-gray-600">${item.size}</span>
                        </div>
                        <button onclick="downloadVideo('${url}', '${item.quality}')" 
                                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Download
                        </button>
                    </div>
                `;
            });
            
            tableHTML += '</div>';
            qualityTable.innerHTML = tableHTML;
            
            // Show results with animation
            document.getElementById('video-results').classList.remove('hidden');
        }
        
        // Audio downloader functionality
        function fetchAudioInfo() {
            const url = document.getElementById('audio-url').value;
            if (!url) {
                alert('Please enter a YouTube URL');
                return;
            }
            
            // Show progress
            document.getElementById('audio-progress').classList.remove('hidden');
            document.getElementById('audio-results').classList.add('hidden');
            
            // Simulate API call
            animateProgress('audio-progress-bar', 'audio-progress-text', () => {
                document.getElementById('audio-progress').classList.add('hidden');
                displayAudioResults(url);
            });
        }
        
        function displayAudioResults(url) {
            const videoId = extractVideoId(url);
            
            const audioData = {
                title: "Sample YouTube Video Title",
                duration: "5:42",
                uploader: "Sample Channel"
            };
            
            const audioInfo = document.getElementById('audio-info');
            audioInfo.innerHTML = `
                <div class="text-center fade-in-up">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${audioData.title}</h3>
                    <p class="text-gray-600">Duration: ${audioData.duration} | Channel: ${audioData.uploader}</p>
                </div>
            `;
            
            const audioFormats = document.getElementById('audio-formats');
            const formats = [
                { format: 'MP3 (320kbps)', size: '12.8 MB', quality: 'High Quality' },
                { format: 'MP3 (192kbps)', size: '7.7 MB', quality: 'Standard Quality' },
                { format: 'WAV', size: '58.2 MB', quality: 'Lossless' }
            ];
            
            let formatsHTML = '<h4 class="text-lg font-semibold text-gray-800 mb-6">Available Audio Formats:</h4><div class="grid md:grid-cols-3 gap-4">';
            
            formats.forEach((item, index) => {
                formatsHTML += `
                    <div class="bg-green-50 rounded-lg p-6 text-center hover-scale slide-in-left" style="animation-delay: ${index * 0.2}s">
                        <h5 class="font-semibold text-gray-800 mb-2">${item.format}</h5>
                        <p class="text-gray-600 mb-1">${item.quality}</p>
                        <p class="text-gray-600 mb-4">~${item.size}</p>
                        <button onclick="downloadAudio('${url}', '${item.format}')" 
                                class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Download
                        </button>
                    </div>
                `;
            });
            
            formatsHTML += '</div>';
            audioFormats.innerHTML = formatsHTML;
            
            document.getElementById('audio-results').classList.remove('hidden');
        }
        
        // Thumbnail downloader functionality
        function fetchThumbnailInfo() {
            const url = document.getElementById('thumbnail-url').value;
            if (!url) {
                alert('Please enter a YouTube URL');
                return;
            }
            
            // Show progress
            document.getElementById('thumbnail-progress').classList.remove('hidden');
            document.getElementById('thumbnail-results').classList.add('hidden');
            
            // Simulate API call
            animateProgress('thumbnail-progress-bar', 'thumbnail-progress-text', () => {
                document.getElementById('thumbnail-progress').classList.add('hidden');
                displayThumbnailResults(url);
            });
        }
        
        function displayThumbnailResults(url) {
            const videoId = extractVideoId(url);
            
            const thumbnailInfo = document.getElementById('thumbnail-info');
            thumbnailInfo.innerHTML = `
                <div class="text-center fade-in-up">
                    <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Available Thumbnails</h3>
                    <p class="text-gray-600">Choose from different resolutions below</p>
                </div>
            `;
            
            const thumbnailGrid = document.getElementById('thumbnail-grid');
            const thumbnails = [
                { quality: 'Default', resolution: '120x90', url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
                { quality: 'Medium', resolution: '320x180', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
                { quality: 'High', resolution: '480x360', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
                { quality: 'Standard', resolution: '640x480', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
                { quality: 'Max Resolution', resolution: '1280x720', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }
            ];
            
            let gridHTML = '<div class="grid md:grid-cols-3 lg:grid-cols-5 gap-4">';
            
            thumbnails.forEach((item, index) => {
                gridHTML += `
                    <div class="thumbnail-card bg-white rounded-lg shadow-lg overflow-hidden slide-in-left" style="animation-delay: ${index * 0.1}s">
                        <div class="relative">
                            <img src="${item.url}" alt="${item.quality} thumbnail" 
                                 class="w-full h-32 object-cover"
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBMMTcwIDExMFY3MEwxMzAgOTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlRodW1ibmFpbCBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K'; this.alt='Thumbnail not available';">
                            <div class="thumbnail-overlay">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="p-4">
                            <h5 class="font-semibold text-gray-800 mb-1">${item.quality}</h5>
                            <p class="text-gray-600 text-sm mb-3">${item.resolution}</p>
                            <button onclick="downloadThumbnail('${url}', '${item.quality}')" 
                                    class="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                                Download
                            </button>
                        </div>
                    </div>
                `;
            });
            
            gridHTML += '</div>';
            thumbnailGrid.innerHTML = gridHTML;
            
            document.getElementById('thumbnail-results').classList.remove('hidden');
        }
        // Download functions (real life + with delay)
function downloadVideo(url, quality) {
    showDownloadFeedback(); // Toast: Download started!

    // Delay ke baad actual download
    setTimeout(() => {
        window.open(`/download/video?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`, '_blank');
    }, 2000); // 2 second ka delay
}

function downloadAudio(url, format) {
    showDownloadFeedback();

    setTimeout(() => {
        window.open(`/download/audio?url=${encodeURIComponent(url)}&format=${encodeURIComponent(format)}`, '_blank');
    }, 2000);
}

function downloadThumbnail(url, quality) {
    showDownloadFeedback();

    setTimeout(() => {
        window.open(`/download/thumbnail?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`, '_blank');
    }, 2000);
}

        
        // Utility functions
        function extractVideoId(url) {
            const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
            const match = url.match(regex);
            return match ? match[1] : 'dQw4w9WgXcQ'; // Default to Rick Roll for demo
        }
        
       // Common loader show/hide
function showLoader() {
    const loader = document.createElement("div");
    loader.id = "download-loader";
    loader.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    loader.innerHTML = `
        <div class="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
            <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-gray-700 font-medium">Preparing your download...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById("download-loader");
    if (loader) loader.remove();
}

// Video download
function downloadVideo(url, quality) {
    showLoader(); // Show loading animation

    setTimeout(() => {
        hideLoader(); // Hide loader before download starts
        window.open(`/download/video?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`, "_blank");
    }, 3000); // 3 sec delay
}

// Audio download
function downloadAudio(url, format) {
    showLoader();

    setTimeout(() => {
        hideLoader();
        window.open(`/download/audio?url=${encodeURIComponent(url)}&format=${encodeURIComponent(format)}`, "_blank");
    }, 3000);
}

// Thumbnail download
function downloadThumbnail(url, quality) {
    showLoader();

    setTimeout(() => {
        hideLoader();
        window.open(`/download/thumbnail?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`, "_blank");
    }, 3000);
}

        
        function showThankYouModal() {
            document.getElementById('thank-you-modal').classList.remove('hidden');
        }
        
        function closeThankYouModal() {
            document.getElementById('thank-you-modal').classList.add('hidden');
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Navigation highlighting on scroll
        window.addEventListener('scroll', () => {
            const sections = ['hero', 'video-downloader', 'audio-downloader', 'thumbnail-downloader'];
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section;
                    }
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial tab
            switchTab('video');
            
            // Add smooth scrolling to nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                });
            });
        });
        function showLoaderWithProgress() {
    const loader = document.createElement("div");
    loader.id = "download-loader";
    loader.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    loader.innerHTML = `
        <div class="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center w-80">
            <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-gray-700 font-medium mb-4">Preparing your download...</p>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div id="loader-progress-bar" class="bg-blue-600 h-3 rounded-full" style="width: 0%"></div>
            </div>
            <p id="loader-progress-text" class="text-gray-600 text-sm">0%</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function updateLoaderProgress(percent) {
    const bar = document.getElementById("loader-progress-bar");
    const text = document.getElementById("loader-progress-text");
    if (bar && text) {
        bar.style.width = percent + "%";
        text.textContent = percent + "%";
    }
}

function hideLoader() {
    const loader = document.getElementById("download-loader");
    if (loader) loader.remove();
}
// Download function with progress bar + thank you modal
function downloadFile(endpoint, params, filename) {
    showLoaderWithProgress(); // Show preparing + progress

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${endpoint}?${new URLSearchParams(params)}`, true);
    xhr.responseType = "blob";

    // Progress event
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            updateLoaderProgress(percentComplete);
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Create a blob and trigger download
            const blob = xhr.response;
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename || "download";
            link.click();

            hideLoader();
            showThankYouModal(); // Thank you message
        } else {
            hideLoader();
            alert("Download failed. Please try again.");
        }
    };

    xhr.onerror = function () {
        hideLoader();
        alert("Network error during download.");
    };

    xhr.send();
}

// Video
function downloadVideo(url, quality) {
    downloadFile("/download/video", { url: url, quality: quality }, "video.mp4");
}

// Audio
function downloadAudio(url, format) {
    downloadFile("/download/audio", { url: url, format: format }, "audio.mp3");
}

// Thumbnail
function downloadThumbnail(url, quality) {
    downloadFile("/download/thumbnail", { url: url, quality: quality }, "thumbnail.jpg");
}


(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'982f0e29c762ff7a',t:'MTc1ODUxNTMwNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();


