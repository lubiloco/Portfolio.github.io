// JavaScript for profile image animation
const profileImg = document.getElementById('profile-img');

profileImg.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.1) rotate(360deg)';
});

profileImg.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1) rotate(0deg)';
});
