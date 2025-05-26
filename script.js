gsap.registerPlugin(ScrollTrigger);

const text = "Hello World";
const helloTextElem = document.getElementById("helloText");
const fonts = [
  "'Poppins', sans-serif",
  "'Courier New', Courier, monospace",
  "'Times New Roman', Times, serif",
  "'Fira Mono', monospace",
  "'Comic Sans MS', cursive, sans-serif",
  "'Brush Script MT', cursive"
];
const fontStyles = [
  { style: "normal", weight: "900" },
  { style: "italic", weight: "700" },
  { style: "italic", weight: "700" },
  { style: "normal", weight: "700" },
  { style: "normal", weight: "700" },
  { style: "italic", weight: "700" }
];
let fontIndex = 0;

function typeAndDeleteLoop() {
  helloTextElem.style.fontFamily = fonts[fontIndex % fonts.length];
  helloTextElem.style.fontStyle = fontStyles[fontIndex % fonts.length].style;
  helloTextElem.style.fontWeight = fontStyles[fontIndex % fonts.length].weight;
  let i = 0;
  function type() {
    if (i <= text.length) {
      helloTextElem.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 700);
    }
  }
  function erase() {
    if (i >= 0) {
      helloTextElem.textContent = text.slice(0, i);
      i--;
      setTimeout(erase, 40);
    } else {
      fontIndex++;
      setTimeout(typeAndDeleteLoop, 400);
    }
  }
  type();
}

gsap.to({}, {
  scrollTrigger: {
    trigger: "#helloWorld",
    start: "top 80%",
    once: true
  },
  onStart: typeAndDeleteLoop
});

gsap.to("#helloText", {
  scrollTrigger: {
    trigger: "#helloWorld",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  scale: 5,
  color: "black",
  ease: "none"
});

gsap.to("#helloWorld", {
  scrollTrigger: {
    trigger: "#helloWorld",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  backgroundColor: "#ffffff",
  ease: "none"
});

ScrollTrigger.create({
  trigger: "#selvaSection",
  start: "top center",
  end: "bottom center",
  onEnter: () => document.getElementById("topbar").classList.add("text-black"),
  onLeaveBack: () => document.getElementById("topbar").classList.remove("text-black")
});

// Three.js setup for Section 2 (unchanged)
const canvas = document.getElementById("threeCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xff00ff, 1); // bright magenta

const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load("https://bruno-simon.com/prismic/matcaps/3.png");
const material = new THREE.MeshMatcapMaterial({ matcap });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  const selvaTop = document.getElementById("selvaSection").getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (selvaTop < windowHeight && selvaTop > -windowHeight) {
    renderer.render(scene, camera);
  }
};

animate();

gsap.fromTo("#selvaLeft", { x: 0 }, {
  x: "-200px", y: "-120px",
  scrollTrigger: {
    trigger: "#selvaSection",
    start: "top top",
    end: "bottom 80%",
    scrub: true
  }
});

gsap.fromTo("#selvaRight", { x: 0 }, {
  x: "400px",
  scrollTrigger: {
    trigger: "#selvaSection",
    start: "top 80%",
    end: "bottom 80%",
    scrub: true
  }
}); 