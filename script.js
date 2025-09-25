
document.addEventListener('DOMContentLoaded', () => {
 
  const cursorOuter = document.getElementById('cursorOuter');
  const cursorInner = document.getElementById('cursorInner');
  const interactiveSelectors = 'a, button, .btn, .project-card, .nav-link';
  const hero = document.querySelector('.hero');
  const blobs = document.querySelectorAll('.blob');

 
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let outerX = mouseX, outerY = mouseY;
  const lerp = (a,b,t) => a + (b-a)*t;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top = mouseY + 'px';
   
    outerX = lerp(outerX, mouseX, 0.18);
    outerY = lerp(outerY, mouseY, 0.18);
    cursorOuter.style.left = outerX + 'px';
    cursorOuter.style.top = outerY + 'px';
  });

  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.style.transform = 'translate(-50%,-50%) scale(1.6)';
      cursorInner.style.transform = 'translate(-50%,-50%) scale(0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOuter.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorInner.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  window.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursorOuter.style.opacity = '0';
      cursorInner.style.opacity = '0';
    }
  });
  window.addEventListener('mouseover', () => {
    cursorOuter.style.opacity = '1';
    cursorInner.style.opacity = '1';
  });

  
  setTimeout(()=> document.querySelector('.reveal-1')?.classList.add('is-visible'), 220);
  setTimeout(()=> document.querySelector('.reveal-2')?.classList.add('is-visible'), 420);
  setTimeout(()=> document.querySelector('.reveal-3')?.classList.add('is-visible'), 620);
  setTimeout(()=> document.querySelector('.reveal-4')?.classList.add('is-visible'), 820);

  
  const revealTargets = document.querySelectorAll('.reveal, .reveal-card, .reveal-form');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.18});
  revealTargets.forEach(t => io.observe(t));


  const sections = Array.from(document.querySelectorAll('header[id], section[id]'));
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = sections[0]?.id || '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.35) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

 
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', (e)=>{
     
    });
  });

  
  document.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth) - 0.5;
    const cy = (e.clientY / window.innerHeight) - 0.5;
    blobs.forEach((b, i) => {
      const speed = (i+1) * 6;
      b.style.transform = `translate3d(${cx * speed}px, ${cy * speed}px, 0)`;
    });
  });

  
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotX = (py - 0.5) * 8;
      const rotY = (px - 0.5) * -8;
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });

});
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i=0; i<80; i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    dx: (Math.random()-0.5)*0.8,
    dy: (Math.random()-0.5)*0.8,
    size: Math.random()*2+1
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#ffffff33";
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();
const form = document.querySelector('.contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    status.innerText = "“Got it! I’ll get back to you soon.”";
    status.classList.add('show');

    form.reset(); 
    setTimeout(() => {
      status.classList.remove('show');
    }, 3000);

  } else {
    status.innerText = "“Server’s taking a break. Try again in a moment.”";
    status.classList.add('show');
    setTimeout(() => {
      status.classList.remove('show');
    }, 3000);
  }
});
setTimeout(()=> document.querySelector('.nav')?.classList.add('is-visible'), 100);
