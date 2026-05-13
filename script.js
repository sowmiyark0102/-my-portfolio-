
/* =========================
        SCROLL REVEAL SYSTEM
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
        SMOOTH SCROLL NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


/* =========================
        3D BACKGROUND (APPLE STYLE FLOATING ORBS)
========================= */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-bg").appendChild(renderer.domElement);

const particles = [];

/* CREATE FLOATING PARTICLES */
for (let i = 0; i < 80; i++) {

  const geometry = new THREE.SphereGeometry(0.05, 12, 12);

  const material = new THREE.MeshBasicMaterial({
    color: 0x00c8ff,
    transparent: true,
    opacity: 0.7
  });

  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.x = (Math.random() - 0.5) * 12;
  sphere.position.y = (Math.random() - 0.5) * 12;
  sphere.position.z = (Math.random() - 0.5) * 12;

  scene.add(sphere);
  particles.push(sphere);
}

camera.position.z = 5;


/* =========================
        MOUSE INTERACTION (APPLE FEEL)
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});


/* =========================
        ANIMATION LOOP (SMOOTH + PREMIUM)
========================= */

function animate() {
  requestAnimationFrame(animate);

  /* particle rotation */
  particles.forEach(p => {
    p.rotation.x += 0.002;
    p.rotation.y += 0.002;
  });

  /* smooth camera follow mouse */
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;

  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();


/* =========================
        RESPONSIVE RESIZE FIX
========================= */

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});


/* =========================
        MICRO INTERACTIONS (APPLE POLISH)
========================= */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    card.style.transform = `perspective(600px) rotateX(${(y - rect.height/2)/10}deg) rotateY(${(x - rect.width/2)/10}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
  });

});
