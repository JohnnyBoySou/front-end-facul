
gsap.registryPlugin(ScrollTrigger);
gsap.to(".ball", {
scrollTrigger: {
    trigger: ".ball",
},
x: 500,
rotation: 360,
});