
let panels = gsap.utils.toArray(".project");
let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "bottom bottom"}));

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: () => panel.offsetHeight < window.innerHeight ? "top center" : "top top", // se for mais curto que a janela de visualização, preferimos fixá-lo no topo
    pin: true, 
    pinSpacing: false 
  });
});

ScrollTrigger.create({
  snap: {
    snapTo: (progress, self) => {
      let panelStarts = tops.map(st => st.start), 
          snapScroll = gsap.utils.snap(panelStarts, self.scroll()); 
      return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); 
    },
    duration: 0.5
  }
});


const banner = document.querySelector('.banner');
gsap.to('.banner', {
    scrollTrigger: {
        trigger: ".road",
        start: 'top top',
        end: 'bottom center',
        markers: true,
        scrub: 1,
    },
    opacity: 0,
    x: 200,
    duration: 2,
}, );


//cursor

const cursor = document.querySelector('.cursor-follower');
const count = document.querySelector('.count');
window.addEventListener('mousemove', (e) => {
    const { x, y, target } = e;
    const isTargetLinkOrBtn = target?.closest('a') || target?.closest('button') || target === count;
    gsap.to(cursor, {
      x: x + 1,
      y: y + 1,
      duration: 0.7,
      opacity: isTargetLinkOrBtn ? 0.6 : 1,
      transform: `scale(${isTargetLinkOrBtn ? 0.6 : 1})`,
    });
});
document.addEventListener('mouseleave', (e) => {
    gsap.to(cursor, {
      duration: 0.7,
      opacity: 0,
    });
});


//gsap.to(window, { duration: 2, scrollTo: 400 });


//text animation
function splitText(element) {
    const text = element.textContent;
    const lines = text.split('\n');
    element.innerHTML = lines.map(line => `<span class="line">${line}</span>`).join('');
    const targets = Array.from(element.querySelectorAll('span'));
    return {
        lines: targets,
    };
}
const par = document.querySelector('.subtitle');
const split = splitText(par);
split.lines.forEach((target, i) => {
  gsap.to(target, {
    ease: "power1.inOut",
    opacity: 1,
    duration: 1 + i * 2,
    scrollTrigger: {
      trigger: target,
      scrub: 1,
      start: "top center",
      end: "bottom center"
    }
  });
});

document.body.style.cursor = 'none';