// Preload images
const moonImage = new Image();
moonImage.src = "./icons/moon.png";
const dayModeImage = new Image();
dayModeImage.src = "./icons/day-mode.png";

const musicon = new Image();
const musicoff = new Image();
musicon.src = "./icons/musicon.svg";
musicoff.src = "./icons/musicoff.svg";

const song = new Audio();
song.src =
  "./music/S1MBA - ROVER (DUCKHEAD EDIT) (Slowed) [fTjZA9e-PFI_00_00_19_00_02_40_part].mp3";

song.volume = 0.2;
song.loop = true;
song.play();

let music = false;

let toggleTheme = "dark";

let ballsColor = "#E5E1DA";
let threadColor = "rgba(255, 255, 255,";
// let ballsColor = "black";
// let threadColor = "rgba(0, 0, 0,";

const body = document.querySelector("body");
const navimg = document.querySelectorAll(".navimg");
const themeimg = document.querySelector(".themeimg");

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx1 = canvas.getContext("2d");
  ctx1.canvas.width = window.innerWidth;
  ctx1.canvas.height = window.innerHeight;
  ctx1.fillStyle = ballsColor;
  ctx1.strokeStyle = "yellow";

  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  ctx2.canvas.width = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  ctx2.fillStyle = "blue";
  ctx2.strokeStyle = "red";

  let particleArray = [];
  let canvasCenterX = window.innerWidth / 2;
  let canvasCenterY = window.innerHeight / 2;
  let radius = window.innerWidth / 5;
  let angle = 0;

  // GET MOUSE POSITION ///////////////////////////////
  const mouse = {
    x: null,
    y: null,
  };
  window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
  });
  // SET MOUSE POSITION AS UNDEFINED EVERY 5 SEC(to prevent effect getting stuck in corners when mouse leaves window)//////
  setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }, 10);

  // CREATE PARTICLE OBJECT ///////////////////
  class Particle {
    constructor(x, y, size, color, weight) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.minSize = size;
      this.color = color;
      this.weight = weight;
    }
    draw() {
      ctx1.beginPath();
      ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx1.fill();
      ctx1.closePath();
    }
    update() {
      // autopilot when mouse leaves canvas
      if (mouse.x == undefined && mouse.y == undefined) {
        let newX = radius * 2 * Math.cos(angle * (Math.PI / 180));
        let newY = radius * 0.9 * Math.sin(angle * (Math.PI / 90));
        mouse.x = newX + canvasCenterX;
        mouse.y = newY + canvasCenterY;
      }

      angle += Math.random() * 0.02 + 0.001; //0.001 - 0.021
      this.size -= 0.15;
      if (this.size < 0) {
        this.x = mouse.x + (Math.random() * 20 - 10);
        this.y = mouse.y + (Math.random() * 20 - 10);
        this.size = Math.random() * 15;
        this.weight = Math.random() * 2 + 0.1;
      }
      this.y += this.weight;
      this.weight += 0.05;

      // if it reaches bottom bounce
      if (this.y > canvas.height - this.size) {
        this.weight *= -0.5;
      }
    }
  }

  function init() {
    particleArray = [];
    for (let i = 0; i < 150; i++) {
      let size = Math.random() * 10 + 5;
      let x = Math.random() * (innerWidth - size * 2) + size;
      let y = Math.random() * (innerHeight - size * 2) + size;
      let color = "white";
      let weight = 1;
      particleArray.push(new Particle(x, y, size, color, weight));
    }
  }

  function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      particleArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }
  init();
  animate();

  // check if particles are close enough to draw line between them
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
      for (let b = a; b < particleArray.length; b++) {
        let distance = Math.sqrt(
          (particleArray[a].x - particleArray[b].x) *
            (particleArray[a].x - particleArray[b].x) +
            (particleArray[a].y - particleArray[b].y) *
              (particleArray[a].y - particleArray[b].y)
        );
        if (distance < 110) {
          opacityValue = 1 - distance / 100;
          ctx2.strokeStyle = threadColor + opacityValue + ")";
          ctx2.beginPath();
          ctx2.lineWidth = 2;
          ctx2.moveTo(particleArray[a].x, particleArray[a].y);
          ctx2.lineTo(particleArray[b].x, particleArray[b].y);
          ctx2.stroke();
        }
      }
    }
  }
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCenterX = window.innerWidth / 2;
    canvasCenterY = window.innerHeight / 2;
    radius = window.innerWidth / 5;
    ctx1.canvas.width = window.innerWidth;
    ctx1.canvas.height = window.innerHeight;
    ctx2.canvas.width = window.innerWidth;
    ctx2.canvas.height = window.innerHeight;
    init();
  });

  const darkmodeButtonn = document.querySelector(".darkmodebtn");
  const themeimg = document.querySelector(".darkmodeButton");
  const projectKiDandi = document.querySelectorAll('.dandi');

  darkmodeButtonn.addEventListener("click", () => {
    console.log("theme changed from here");

    if (toggleTheme == "dark") {
      themeimg.src = moonImage.src;
      ballsColor = "black";
      threadColor = "rgba(0, 0, 0,";
      toggleTheme = "light";

      body.classList.add("lightbody");
      body.classList.remove("darkbody");
      console.log(projectKiDandi);
      
      projectKiDandi.forEach((e) => {
        e.classList.add("projectKiDandiLight");
        e.classList.remove("projectKiDandiDark");
      });

      navimg.forEach((e) => {
        e.classList.remove("navimg");
      });
    } else {
      themeimg.src = dayModeImage.src;
      ballsColor = "#E5E1DA";
      threadColor = "rgba(255, 255, 255,";
      toggleTheme = "dark";
      body.classList.add("darkbody");
      body.classList.remove("lightbody");

      projectKiDandi.forEach((e) => {
        e.classList.add("projectKiDandiDark");
        e.classList.remove("projectKiDandiLight");
      });

      navimg.forEach((e) => {
        e.classList.add("navimg");
      });
    }

    ctx1.fillStyle = ballsColor;
  });
});

const musicbtn = document.querySelector(".musicbtn");
musicbtn.addEventListener("click", () => {
  if (music) {
    musicbtn.src = musicoff.src;
    song.pause();
  } else {
    musicbtn.src = musicon.src;
    song.play();
  }

  music = !music;
});
