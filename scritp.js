gsap.registerPlugin(ScrollTrigger, Flip);

// Scroll behavior

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Hero animation
document.addEventListener('DOMContentLoaded', function () {
  let heroTxt = $("[fs-hero='container']");
  let heroImg = $("[fs-hero='image']");
  let heroImgTwo = $("[fs-hero='image2']");
  let heroLeadTextElement = document.querySelector("[fs-hero='leadText']");

  // Only proceed if hero elements exist
  if (heroTxt.length > 0 && heroImg.length > 0 && heroLeadTextElement) {
    let heroLeadText = heroLeadTextElement.getBoundingClientRect();
    const heroLeadTextTop = heroLeadText.top;

    let txtHeight = heroTxt.height();
    let windowHeight = $(window).height();
    let txtC = txtHeight * 1.75;
    let txtY = ((windowHeight - txtC) / windowHeight) * 100;

    gsap.from(".nav_bar, .nav-menu_btn", {
      duration: 1,
      delay: 0.7,
      opacity: 0,
      ease: "power1.out"
    });

    // Hero animation – GSAP scroll animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_hero-landing",
        scrub: 1,
        start: "20% 10%",
        end: "bottom bottom"
      }
    });

    // Breakpoint checks
    const desktopQuery = window.matchMedia("(min-width: 992px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    if (desktopQuery.matches || tabletQuery.matches) {
      // Desktop and Tablet
      tl.to(heroTxt, { y: txtY + "vh" })
        .to(heroImg, { y: "-100vh" }, "<")
        .to(heroImgTwo, { y: "-75vh" }, "<");
    } else if (mobileQuery.matches) {
      // Mobile
      tl.to(heroTxt, { y: windowHeight - heroLeadTextTop - 48 + "px" })
        .to(heroImg, { y: "-100vh" }, "<");
    }

    // Hero text animation
    jQuery(".fs-word").each(function () {
      var words = jQuery(this).text().split(" ");
      jQuery(this).empty().html(function () {
        for (i = 0; i < words.length; i++) {
          jQuery(this).append((i == 0 ? "" : " ") + "<span class='words'>" + words[i] + "</span>");
        }
      });
    });

    gsap.set(".fs-sentence", { transformOrigin: "0% 100%" });
    gsap.from(".fs-sentence", { duration: 0.7, rotate: 5, ease: "power1.out" });
    gsap.from(".words", { duration: 0.8, ease: "power1.out", opacity: 0, y: "5rem", stagger: 0.1 });
  }
});


// Appear animarion

let item = document.querySelectorAll(".service_card, [fs-appear='item']");
const featuredProject = gsap.utils.toArray(item);

featuredProject.forEach((project, index) => {
  gsap.from(project, {
    duration: 0.6,
    delay: index * 0.15, // delay each element by 0.45 seconds
    opacity: 0,
    yPercent: 10,
    scrollTrigger: {
      trigger: project,
      //markers: true,
      start: "-50% 60%",
      ease: "power2.out"
    }
  });
});
let item2 = document.querySelectorAll(".work-card_container");
const featuredProject2 = gsap.utils.toArray(item2);

featuredProject2.forEach((project, index) => {
  gsap.from(project, {
    duration: 0.6,
    delay: index * 0.15, // delay each element by 0.45 seconds
    opacity: 0,
    yPercent: 10,
    scrollTrigger: {
      trigger: project,
      // markers: true,
      start: "-50% center",
      ease: "power2.out"
    }
  });
});

// Custom cursor
// Gsap cursor tracking
document.addEventListener('DOMContentLoaded', function () {
  // Ensure the cursor element is present
  const cursor = document.querySelector('[fs-cursor="follow"]');

  if (!cursor) {
      console.warn('Custom cursor element not found');
      return;
  }

  // Initial setup for the cursor
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Initial position
  const mouse = { x: pos.x, y: pos.y }; // Mouse position
  const speed = 0.2; // Cursor follow speed

  // Quick setters for setting cursor's x and y positions
  const xSet = gsap.quickSetter(cursor, "x", "px");
  const ySet = gsap.quickSetter(cursor, "y", "px");

  // Update mouse position on move
  window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
  });

  // Update the cursor position
  gsap.ticker.add(() => {
      // Lerp (linear interpolate) the position
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xSet(pos.x);
      ySet(pos.y);
  });
});


// Cursor hover adding toggle class on cursor and the cursor text inside
$(".btn_primary").on("mouseenter", function () {
  $(".cursor").css("display", "none");
});
$(".btn_primary").on("mouseleave", function () {
  $(".cursor").css("display", "block");
});

// Project request animation
let requestContainer = document.querySelector("[fs-prj-request='container']");
let requestWrapper = document.querySelector("[fs-prj-request='wrapper']");
let requestOpenBtn = document.querySelectorAll("[fs-prj-request='open']");
let requestCloseBtn = document.querySelector("[fs-prj-request='close']");

// Open project request
$(requestOpenBtn).on("click", function () {
  gsap.fromTo(
    requestWrapper,
    { yPercent: 105, opacity: 0, display: "none" },
    {
      display: "flex",
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }
  );
});

// Close project request

$(requestCloseBtn).on("click", function () {
  gsap.fromTo(
    requestWrapper,
    { yPercent: 0, opacity: 1 },
    { yPercent: 105, opacity: 0, duration: 0.4, ease: "power2.in" }
  );
  gsap.to(requestWrapper, {
    display: "none",
    delay: 0.5
  });
});

// FAQ list

$("[fs-fqa-item='question']").click(function () {
  var clicks = $(this).data("clicks");
  let fqaIcon = $(this).find(".fqa-expand-icon_container");
  let fqaStroke = $(this).find(".fqa-expand_stroke.is-1st");
  let fqaAnswer = $(this).siblings("[fs-fqa-item='answer']");
  let tlOne = gsap.timeline();
  let tlTwo = gsap.timeline();
  if (clicks) {
    tlOne.to(
      fqaIcon,
      {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in"
      },
      "<="
    );
    tlOne.to(
      fqaStroke,
      { height: "100%", duration: 0.3, ease: "power2.out" },
      "<="
    );
    tlOne.to(
      fqaAnswer,
      { height: "0", duration: 0.4, ease: "power2.in", paddingBottom: "0rem" },
      "<="
    );
  } else {
    tlOne.to(fqaIcon, {
      rotation: 180,
      duration: 0.5,
      ease: "power2.out"
    });
    tlOne.to(
      fqaStroke,
      { height: 0, duration: 0.15, ease: "power2.out" },
      "<="
    );
    tlOne.to(
      fqaAnswer,
      {
        height: "auto",
        duration: 0.4,
        ease: "power2.out",
        paddingBottom: "1.25rem"
      },
      "<="
    );
  }
  $(this).data("clicks", !clicks);
});

// Work sektion Animation

document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.home_work_row');
    const imageContainer = document.querySelector('.home_work_image-container');
    let lastIndex = 0; // To keep track of the last hovered row

    rows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {  
            const translateYPercentage = -25 * index; // Each row translates the container 25% more
            const duration = Math.abs(index - lastIndex) * 0.875; // Calculate duration based on row distance

            // GSAP animation to move the image container
            gsap.to(imageContainer, {
                duration: duration,
                y: `${translateYPercentage}%`,
                ease: "sine.inOut", // Smooth transition
                overwrite: 'auto' // Ensures snapping and cancels previous animations if a new one starts
            });

            lastIndex = index; // Update the last hovered row index
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.home_work_row');
    const images = document.querySelectorAll('.home_work_image-container .home_work_image');
    const fullScreenContainer = document.querySelector('.home_work_image-full-screen');

    rows.forEach((row, index) => {
        row.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link navigation

            const href = this.getAttribute('href'); // Get the href attribute
            const imageToAnimate = images[index]; // Select the corresponding image based on the row index

            if (imageToAnimate) {
                // Clone the image to animate
                const clonedImage = imageToAnimate.cloneNode(true);
                fullScreenContainer.innerHTML = ''; // Clear the full-screen container
                fullScreenContainer.appendChild(clonedImage); // Add the cloned image

                // Ensure fullScreenContainer is ready for animation
                fullScreenContainer.style.display = 'block';
                fullScreenContainer.style.position = 'fixed';
                fullScreenContainer.style.top = '0';
                fullScreenContainer.style.left = '0';
                fullScreenContainer.style.width = '100vw';
                fullScreenContainer.style.height = '100vh';
                fullScreenContainer.style.overflow = 'hidden';

                // Capture the first state
                const state = Flip.getState(clonedImage);

                // Set styles for the cloned image to fill the full-screen container
                // This is now the "final" state for the FLIP animation
                Object.assign(clonedImage.style, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' // Adjust as needed to maintain aspect ratio
                });

                // Wait for the next frame to ensure the final state is rendered
                requestAnimationFrame(() => {
                    // Use FLIP to animate from the first state to the final state
                    Flip.from(state, {
                        duration: .5,
                        ease: "power1.inOut",
                        scale: true, // This ensures the scaling is part of the animation
                        onComplete: () => {
                            window.location.href = href; // Navigate after the animation completes
                        }
                    });
                });
            } else {
                console.error('Corresponding image not found for the row:', row);
            }
        });
    });
});
