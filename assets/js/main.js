/* HERO INTERACTION */
document.addEventListener("mousemove", e => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  hero.style.transform = `translate(${x}px, ${y}px)`;
});

/* SIMULATION */
const canvas = document.getElementById("simCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let t = 0;

  function draw() {
    ctx.clearRect(0,0,600,300);
    ctx.beginPath();
    for (let x=0; x<600; x++) {
      const y = 150 + 50 * Math.sin(0.02*x + t);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#4b7bec";
    ctx.stroke();
    t += 0.05;
    requestAnimationFrame(draw);
  }
  draw();
}

/* BRAIN MAP */
function showRegion(name) {
  alert("Tau concentration high in: " + name);
}
