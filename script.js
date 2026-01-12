// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate Links
    navLinks.querySelectorAll('li').forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.service-card, .menu-card, .section-header, .portfolio-item, .timeline-item');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Smart Chat Widget Logic
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatOptions = document.getElementById('chatOptions');
const notificationBadge = document.querySelector('.notification-badge');

function toggleChat() {
    chatWindow.classList.toggle('active');
    // Hide badge when opened
    if (chatWindow.classList.contains('active')) {
        notificationBadge.style.display = 'none';

        // Auto scroll to bottom
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 300);
    }
}

function handleOption(option) {
    // Hide options after selection
    chatOptions.style.display = 'none';

    // Add user message
    let userText = '';
    if (option === 'website') userText = 'Saya tertarik dengan Jasa Website';
    if (option === 'arduino') userText = 'Saya ingin beli Arduino';
    if (option === 'consult') userText = 'Saya ingin konsultasi';

    addMessage(userText, 'user');

    // Bot Reply Simulation
    setTimeout(() => {
        let botText = '';
        let waLink = '';

        if (option === 'website') {
            botText = 'Tentu! Kami bisa bantu buatkan website Company Profile, E-Commerce, atau Custom Web App. Apakah Anda ingin lanjut ke WhatsApp untuk diskusi lebih detail?';
            waLink = 'https://wa.me/6285191391237?text=Halo%20Wybora%20AI,%20saya%20tertarik%20dengan%20jasa%20pembuatan%20website.';
        } else if (option === 'arduino') {
            botText = 'Pilihan bagus! Kami menyediakan Arduino Uno, sensor, dan modul lainnya. Klik tombol di bawah untuk pesan langsung via WhatsApp ya.';
            waLink = 'https://wa.me/6285191391237?text=Halo%20Wybora%20AI,%20saya%20ingin%20pesan%20Arduino%20Uno%20dan%20komponen%20lainnya.';
        } else if (option === 'consult') {
            botText = 'Siap! Konsultasi gratis tersedia. Silakan hubungi tim kami langsung di WhatsApp untuk ngobrol santai.';
            waLink = 'https://wa.me/6285191391237?text=Halo%20Wybora%20AI,%20saya%20ingin%20konsultasi%20gratiss%20mengenai%20proyek%20saya.';
        }

        addMessage(botText, 'bot', waLink);
    }, 1000);
}

function addMessage(text, sender, link = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    let content = `<p>${text}</p>`;

    if (link) {
        content += `<a href="${link}" target="_blank" style="display:inline-block; margin-top:10px; padding:8px 15px; background:white; color:#3b82f6; border-radius:30px; text-decoration:none; font-weight:bold; font-size:0.9rem;">Lanjut ke WhatsApp <i class="fab fa-whatsapp"></i></a>`;
    }

    content += `<div class="timestamp">Just now</div>`;
    messageDiv.innerHTML = content;

    chatBody.insertBefore(messageDiv, chatOptions); // Insert before options container (even if hidden)
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Conversational Logic
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();

    if (text === '') return;

    addMessage(text, 'user');
    input.value = '';

    // Hide options if user types manually
    chatOptions.style.display = 'none';

    // Simulate typing delay
    setTimeout(() => {
        const response = getBotResponse(text.toLowerCase());
        addMessage(response.text, 'bot', response.link);
    }, 800);
}

function getBotResponse(input) {
    let response = { text: '', link: null };

    // Simple NLP / Keyword Matching
    if (input.includes('halo') || input.includes('hi') || input.includes('selamat')) {
        response.text = 'Halo! Senang bertemu Anda. Ada yang bisa saya bantu terkait website atau Arduino?';
    }
    else if (input.includes('harga') || input.includes('biaya')) {
        response.text = 'Untuk harga sangat bervariasi tergantung kebutuhan spesifik Anda. Apakah Anda menanyakan harga Website atau Arduino?';
    }
    else if (input.includes('web') || input.includes('situs')) {
        response.text = 'Kami ahli dalam pembuatan Company Profile, E-Commerce, dan Web App. Mau konsultasi gratis dulu mengenai kebutuhan website Anda?';
        response.link = 'https://wa.me/6285191391237?text=Halo%20Wybora%20AI,%20saya%20mau%20tanya%20detail%20tentang%20jasa%20website.';
    }
    else if (input.includes('arduino') || input.includes('iot') || input.includes('uno')) {
        response.text = 'Stok Arduino Uno dan komponen IoT kami lengkap siap kirim. Mau lihat katalog atau pesan langsung?';
        response.link = 'https://wa.me/6285191391237?text=Halo%20Wybora%20AI,%20info%20katalog%20dan%20harga%20Arduino%20dong.';
    }
    else if (input.includes('lokasi') || input.includes('alamat')) {
        response.text = 'Kami berbasis online tetapi siap melayani pengiriman ke seluruh Indonesia. Kantor kami ada di pusat kota. Mau mampir?';
        response.link = 'https://goo.gl/maps/placeholder'; // Ganti dengan link GMaps jika ada
    }
    else if (input.includes('terima kasih') || input.includes('makasih')) {
        response.text = 'Sama-sama! Senang bisa membantu. Jangan ragu hubungi kami lagi ya. 😊';
    }
    else {
        response.text = 'Maaf, saya masih belajar. Tapi tim manusia kami siap membantu Anda di WhatsApp. Klik link di bawah ya!';
        response.link = `https://wa.me/6285191391237?text=Halo,%20saya%20mau%20tanya%20tentang:%20${encodeURIComponent(input)}`;
    }

    return response;
}
