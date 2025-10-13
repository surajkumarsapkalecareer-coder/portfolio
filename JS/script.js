$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });
    // 1. Smooth scroll with header offset
    $(document).ready(function() {
    // 1️⃣ Smooth scroll with header offset
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        const headerHeight = $('header').outerHeight(); // get header height dynamically
        const target = $($(this).attr('href'));

        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 500, 'linear');
        }

        // 2️⃣ Close mobile menu if open
        if($('#menu').hasClass('fa-times')) {
            $('#menu').removeClass('fa-times');
            $('.navbar').removeClass('active');
        }
    });

    // 3️⃣ Mobile menu toggle
    $('#menu').on('click', function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    // 4️⃣ Highlight active link on scroll
    $(window).on('scroll', function() {
        const scrollPos = $(document).scrollTop() + $('header').outerHeight() + 5;

        $('section').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();

            const id = $(this).attr('id');
            const link = $('nav ul li a[href="#' + id + '"]');

            if(scrollPos >= top && scrollPos < bottom) {
                $('nav ul li a').removeClass('active');
                link.addClass('active');
            }
        });
    });
});

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Surajkumar Sapkale";
            $("#favicon").attr("href", "./PNG/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "./PNG/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Backend development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    // console.log("Hiiii")
    let response
switch (type) {
    case "skills":
      response = await fetch("./JSON/skills.json");
      break;

    case "projects":
      response = await fetch("./JSON/projects.json");
      break;

    case "learning":
      response = await fetch("./JSON/courses.json");
      break;

    default:
      console.warn(`Unknown type "${type}", using skills.json as fallback.`);
      response = await fetch("./JSON/skills.json");
  }

  const data = await response.json();
    return data;
}



function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showLearnings(learnings) {
    let learningsContainer = document.getElementById("learningContainer");
    // console.log(learningsContainer);
    let skillHTML = "";
    learnings.forEach(skill => {
        skillHTML += `
        <div class="learning-bar" data-percent=${skill.icon}>
                <div class="info">
                    <span>${skill.name}</span>
                    <span class="percent-text">0%</span>
                </div>
                <div class="progress-line"><span></span></div>
            </div>
        `
    });
    learningsContainer.innerHTML = skillHTML;
    
// Initialize the animation for learning bars
initLearningAnimation();
}


function showProjects(projects) {
    console.log(projects);
    if (!projects || projects.length === 0) {
        console.warn("No projects data available to display.");
        return;
    }
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("learning").then(data => {
    showLearnings(data);
});

// fetchData("projects").then(data => {
//     showProjects(data);
// });

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();
// End of Tawk.to Live Chat
function initLearningAnimation() {
const learningBars = document.querySelectorAll(".learning-bar");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const bar = entry.target;
                    const span = bar.querySelector(".progress-line span");
                    const percentText = bar.querySelector(".percent-text");
                    const targetPercent = bar.getAttribute("data-percent");

                    if (entry.isIntersecting) {
                        // Fade + slide-in
                        bar.classList.add("visible");

                        // Reset before animating again
                        span.style.transition = "none";
                        span.style.width = "0";
                        percentText.textContent = "0%";

                        // Small delay to let reset finish
                        setTimeout(() => {
                            span.style.transition = "width 2s ease-in-out";
                            span.style.width = targetPercent + "%";

                            let count = 0;
                            const interval = setInterval(() => {
                                if (count < targetPercent) {
                                    count++;
                                    percentText.textContent = count + "%";
                                } else {
                                    clearInterval(interval);
                                }
                            }, 20);
                        }, 100);
                    } else {
                        // Reset when leaving viewport (optional)
                        bar.classList.remove("visible");
                        span.style.width = "0";
                        percentText.textContent = "0%";
                    }
                });
            },
            { threshold: 0.4 }
        );

        learningBars.forEach((bar) => observer.observe(bar));
}


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL SKILLS */
srtop.reveal('.learning-container', { interval: 200 });
srtop.reveal('.learning-container .learning-bar', { delay: 500 });
// srtop.reveal('.skills .container .bar', { delay: 400 });



/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
// srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 200 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

const linkedinBtn = document.getElementById("linkedin-btn");

function initEmailJS() {
  // 1️⃣ Initialize EmailJS with your Public Key
  emailjs.init("Umo7y0LwLF574EOt6"); // replace with your real public key

  // 2️⃣ Handle form submission
  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default form submit

    // 3️⃣ Send the form using EmailJS
    emailjs.sendForm("service_surajkumarcareer", "template_nctogi9", this)
      .then(() => {
        showPopup(`
        <h2>Messege sent Successfully! </br><span>Thank you 😊.</span></h2>
      `);
        // alert("Message sent successfully! Thank you 😊");
        this.reset(); // clear the form after sending
      })
      .catch((error) => {
        console.error("EmailJS send failed:", error);
        showPopup(`
        <h2>Oops! error occurred </br><span>Let's Connect On LinkedIn .</span></h2>
      `, true);
        // showPopup();
      });
  });
}
initEmailJS();

// Example: call this in your EmailJS catch block
// showPopup();
// Popup function
function showPopup(contentHTML, showLinkedIn = false) {
  let popup = document.getElementById("popup-message");

  if (!popup) {
    popup = document.createElement("div");
    popup.id = "popup-message";
    popup.innerHTML = `
      <div class="popup-content">
        <div id="popup-text"></div>
        <div class="popup-buttons">
          <button id="popup-close">Close</button>
          ${showLinkedIn ? `<a id="linkedin-btn" href="https://www.linkedin.com/in/surajkumar-sapkale/" target="_blank">LinkedIn</a>` : ""}
        </div>
      </div>
    `;
    document.body.appendChild(popup);
  }

  document.getElementById("popup-text").innerHTML = contentHTML;
  popup.classList.add("show");

  // Close popup
  document.getElementById("popup-close").onclick = () => {
    popup.classList.remove("show");
  };

    const linkedinBtn = document.getElementById("linkedin-btn");
  if (linkedinBtn) {
    linkedinBtn.onclick = (e) => {
      popup.classList.remove("show");
      setTimeout(() => {
        window.open(linkedinBtn.href, "_blank");
      }, 200);
      e.preventDefault();
    };
}
}

let slogans = [];
let sloganIndex = 0;
let charIndex = 0;
let typingSpeed = 100;  // speed for typing
let erasingSpeed = 50;  // speed for erasing
let delayBetween = 2000; // delay before erasing

const typingElement = document.getElementById("typing-text2");

// Fetch slogans from JSON
fetch("./JSON/slogans.json")
  .then(response => response.json())
  .then(data => {
    slogans = data.slogans;
    typeText();
  })
  .catch(error => console.error("Error loading slogans:", error));

function typeText() {
  if (charIndex < slogans[sloganIndex].length) {
    typingElement.textContent += slogans[sloganIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(eraseText, delayBetween);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typingElement.textContent = slogans[sloganIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, erasingSpeed);
  } else {
    sloganIndex = (sloganIndex + 1) % slogans.length;
    setTimeout(typeText, 1000);
  }
}

