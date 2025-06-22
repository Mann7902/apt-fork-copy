// Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  
  if (slides[index]) {
    slides[index].classList.add("active");
  }
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto-rotate carousel
setInterval(nextSlide, 4000);

// Dot navigation for carousel
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Service Data
const serviceData = {
  fire: {
    title: "Fire Insurance Assessment",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=600&fit=crop&auto=format",
    description: `
            <p>Our fire insurance assessment services provide comprehensive evaluation of fire-related damages to help streamline the claims process. Our certified surveyors have extensive experience in assessing fire damage across various property types.</p>
            
            <h3>Our Fire Assessment Services Include:</h3>
            <ul>
                <li>Immediate site inspection and damage assessment</li>
                <li>Cause and origin investigation</li>
                <li>Property damage evaluation</li>
                <li>Business interruption loss calculation</li>
                <li>Salvage value determination</li>
                <li>Repair cost estimation</li>
            </ul>
            
            <h3>Why Choose Our Fire Assessment Services:</h3>
            <p>With years of experience in fire damage assessment, our team understands the complexities involved in fire claims. We provide detailed, accurate reports that help insurance companies and policyholders reach fair settlements quickly.</p>
            
            <p>Our surveyors are trained to identify the extent of fire, smoke, and water damage, ensuring no aspect of the loss is overlooked. We work closely with fire departments, forensic experts, and restoration specialists to provide comprehensive assessments.</p>
        `,
  },
  motor: {
    title: "Motor Insurance Assessment",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&auto=format",
    description: `
            <p>Our motor insurance assessment services cover all aspects of vehicle damage evaluation, from minor fender benders to total loss claims. We provide accurate, unbiased assessments that help ensure fair settlements for all parties involved.</p>
            
            <h3>Our Motor Assessment Services Include:</h3>
            <ul>
                <li>Accident site investigation</li>
                <li>Vehicle damage assessment</li>
                <li>Repair cost estimation</li>
                <li>Total loss evaluation</li>
                <li>Pre-accident condition assessment</li>
                <li>Salvage value determination</li>
            </ul>
            
            <h3>Specialized Expertise:</h3>
            <p>Our certified motor assessors have expertise in evaluating all types of vehicles including cars, motorcycles, commercial vehicles, and specialty vehicles. We use the latest technology and industry-standard methodologies to ensure accurate assessments.</p>
            
            <p>We work with authorized dealers, certified repair shops, and parts suppliers to provide realistic repair cost estimates. Our detailed reports include photographic evidence and comprehensive documentation to support our findings.</p>
        `,
  },
  engineering: {
    title: "Engineering Insurance Assessment",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format",
    description: `
            <p>Our engineering insurance assessment services specialize in evaluating complex industrial and construction-related claims. We have the technical expertise to assess machinery breakdown, construction risks, and engineering project claims.</p>
            
            <h3>Our Engineering Assessment Services Include:</h3>
            <ul>
                <li>Machinery breakdown investigation</li>
                <li>Construction all risks assessment</li>
                <li>Erection all risks evaluation</li>
                <li>Boiler and pressure vessel claims</li>
                <li>Electronic equipment assessment</li>
                <li>Contractors' plant and machinery</li>
            </ul>
            
            <h3>Technical Expertise:</h3>
            <p>Our team includes qualified engineers with specialized knowledge in various fields including mechanical, electrical, civil, and electronics engineering. This technical background enables us to understand complex industrial processes and equipment.</p>
            
            <p>We collaborate with manufacturers, technical experts, and specialized repair facilities to ensure accurate assessment of engineering claims. Our reports provide detailed technical analysis and recommendations for risk mitigation.</p>
        `,
  },
  marine: {
    title: "Marine Insurance Assessment",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    description: `
            <p>Our marine insurance assessment services cover both cargo and hull claims, providing expert evaluation of maritime-related losses. We have extensive experience in handling complex marine claims across various shipping routes and vessel types.</p>
            
            <h3>Our Marine Assessment Services Include:</h3>
            <ul>
                <li>Cargo damage assessment</li>
                <li>Hull and machinery surveys</li>
                <li>General average adjustments</li>
                <li>Port risk evaluations</li>
                <li>Container damage assessment</li>
                <li>Marine liability claims</li>
            </ul>
            
            <h3>Maritime Expertise:</h3>
            <p>Our marine surveyors are certified professionals with deep understanding of international maritime law, shipping practices, and cargo handling procedures. We work with port authorities, shipping lines, and cargo handlers to investigate marine losses.</p>
            
            <p>We provide services at major ports and have a network of correspondents worldwide to handle marine claims efficiently. Our expertise covers various types of cargo including dry bulk, liquid bulk, containers, and project cargo.</p>
        `,
  },
  miscellaneous: {
    title: "Miscellaneous Insurance Assessment",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format",
    description: `
            <p>Our miscellaneous insurance assessment services cover a wide range of specialized claims that don't fall under traditional categories. We provide expert evaluation for various types of insurance claims with the same attention to detail and professionalism.</p>
            
            <h3>Our Miscellaneous Assessment Services Include:</h3>
            <ul>
                <li>Personal accident claims</li>
                <li>Health insurance assessments</li>
                <li>Travel insurance claims</li>
                <li>Liability assessments</li>
                <li>Professional indemnity claims</li>
                <li>Cyber insurance evaluations</li>
            </ul>
            
            <h3>Comprehensive Coverage:</h3>
            <p>Our team has experience in handling diverse types of claims, from personal injury assessments to complex liability evaluations. We work with medical professionals, legal experts, and technical specialists as needed.</p>
            
            <p>We understand that miscellaneous claims often require specialized knowledge and approach each case with the appropriate expertise. Our goal is to provide fair, accurate assessments regardless of the claim type or complexity.</p>
        `,
  },
};

// Blog and Service Router
class ContentRouter {
  constructor() {
    this.blogs = [];
    this.blogsLoaded = false;
    this.pendingRoute = null;
    this.setupEventListeners();
    this.initializeRouter();
  }

  async initializeRouter() {
    await this.loadBlogs();
    this.handleRoute();
  }

  setupEventListeners() {
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => this.handleRoute());

    // Handle blog card clicks
    document.addEventListener("click", (e) => {
      const blogCard = e.target.closest(".blog-card");
      if (blogCard) {
        e.preventDefault();
        const blogId = blogCard.dataset.blog;
        this.navigateTo(`/blog/${blogId}`);
        return;
      }

      // Handle service card clicks
      const serviceCard = e.target.closest(".service-card");
      if (serviceCard && !e.target.classList.contains("see-more-btn")) {
        e.preventDefault();
        const serviceType = serviceCard.dataset.service;
        this.navigateTo(`/service/${serviceType}`);
        return;
      }

      // Handle see-more button clicks
      if (e.target.classList.contains("see-more-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const serviceCard = e.target.closest(".service-card");
        const serviceType = serviceCard.dataset.service;
        this.navigateTo(`/service/${serviceType}`);
      }
    });

    // Handle back buttons in detail views
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("back-to-home")) {
        e.preventDefault();
        this.navigateTo("/");
      }
    });
  }

  navigateTo(path) {
    history.pushState({}, "", path);
    this.handleRoute();
  }

  handleRoute() {
    // If blogs aren't loaded yet, store the current route as pending
    if (!this.blogsLoaded) {
      this.pendingRoute = window.location.pathname;
      return;
    }

    window.scrollTo(0, 0);
    const path = window.location.pathname;

    if (path.startsWith("/blog/")) {
      const blogId = path.split("/")[2];
      this.showBlogDetail(blogId);
    } else if (path.startsWith("/service/")) {
      const serviceType = path.split("/")[2];
      this.showServiceDetail(serviceType);
    } else if (path === "/blogs") {
      this.showBlogsPage();
    } else {
      this.showHomePage();
    }
  }

  showBlogDetail(blogId) {
    // If blogs aren't loaded yet, wait for them
    if (!this.blogsLoaded) {
      this.pendingRoute = `/blog/${blogId}`;
      return;
    }

    let blog = this.blogs.find((b) => b.id == blogId);

    if (!blog) {
      const defaultBlogs = {
        1: {
          id: "1",
          title: "Understanding Fire Insurance Claims",
          image:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format",
          content: `
                        <p>Fire insurance claims can be complex and overwhelming. Understanding the process is crucial for both policyholders and insurance professionals.</p>
                        
                        <h3>Key Steps in Fire Insurance Claims:</h3>
                        <ul>
                            <li>Immediate notification to insurance company</li>
                            <li>Securing the property to prevent further damage</li>
                            <li>Detailed documentation of damages</li>
                            <li>Professional assessment by certified surveyors</li>
                            <li>Claim settlement based on policy terms</li>
                        </ul>
                        
                        <p>Our experienced team at APT ensures thorough investigation and fair assessment of fire-related damages, helping streamline the claims process for all parties involved.</p>
                    `,
        },
        2: {
          id: "2",
          title: "Motor Insurance: Best Practices",
          image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&auto=format",
          content: `
                        <p>Motor insurance claims require careful assessment and proper documentation to ensure fair settlements.</p>
                        
                        <h3>Essential Documentation:</h3>
                        <ul>
                            <li>Police report (if applicable)</li>
                            <li>Photographs of damage</li>
                            <li>Driver's license and registration</li>
                            <li>Insurance policy details</li>
                            <li>Repair estimates from authorized dealers</li>
                        </ul>
                        
                        <p>Proper assessment by qualified surveyors ensures accurate evaluation of damages and helps prevent fraudulent claims.</p>
                    `,
        },
        3: {
          id: "3",
          title: "Marine Cargo Insurance Trends",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
          content: `
                        <p>The marine cargo insurance industry is evolving with new technologies and changing global trade patterns.</p>
                        
                        <h3>Current Trends:</h3>
                        <ul>
                            <li>Digital documentation and tracking</li>
                            <li>IoT sensors for real-time monitoring</li>
                            <li>Blockchain for transparent claims processing</li>
                            <li>Climate change impact assessments</li>
                            <li>Enhanced security measures</li>
                        </ul>
                        
                        <p>Stay ahead of industry changes with our expert marine cargo assessment services and insights.</p>
                    `,
        },
      };
      blog = defaultBlogs[blogId];
    }

    if (!blog) {
      this.showHomePage();
      return;
    }

    this.hideAllSections();
    let blogDetailSection = this.getOrCreateSection("blog-detail-section", "blog-detail-page");

    blogDetailSection.innerHTML = `
            <div class="container">
                <button class="back-to-home">← Back to Home</button>
                <div class="blog-detail-content">
                    <img src="${blog.image}" alt="${blog.title}" class="blog-detail-image">
                    <div class="detail-content-wrapper">
                        <h1>${blog.title}</h1>
                        <p class="blog-publisher">Published by: Tech Team APT</p>
                        <div class="blog-content">${blog.content}</div>
                    </div>
                </div>
            </div>
        `;
    blogDetailSection.style.display = "block";
  }

  showServiceDetail(serviceType) {
    const serviceInfo = serviceData[serviceType];

    if (!serviceInfo) {
      this.showHomePage();
      return;
    }

    this.hideAllSections();
    let serviceDetailSection = this.getOrCreateSection("service-detail-section", "service-detail-page");

    serviceDetailSection.innerHTML = `
            <div class="container">
                <button class="back-to-home">← Back to Home</button>
                <div class="service-detail-content">
                    <img src="${serviceInfo.image}" alt="${serviceInfo.title}" class="service-detail-image">
                    <div class="detail-content-wrapper">
                        <h1>${serviceInfo.title}</h1>
                        <div class="service-content">${serviceInfo.description}</div>
                    </div>
                </div>
            </div>
        `;
    serviceDetailSection.style.display = "block";
  }

  showBlogsPage() {
    this.hideAllSections();
    let blogsPageSection = this.getOrCreateSection("blogs-page-section", "blogs-page");

    blogsPageSection.innerHTML = `
            <div class="container">
                <button class="back-to-home">← Back to Home</button>
                <div class="section-header">
                    <h2>All <span>Blogs</span></h2>
                    <p>Explore our complete collection of industry insights and expert opinions</p>
                </div>
                <div class="blogs-grid" id="all-blogs-container">
                    <!-- All blogs will be loaded here -->
                </div>
            </div>
        `;
    
    this.renderAllBlogs();
    blogsPageSection.style.display = "block";
  }

  showHomePage() {
    // Show all original sections
    document.querySelectorAll("section").forEach((section) => {
      if (!section.id.includes("detail-section") && !section.id.includes("page-section")) {
        section.style.display = "block";
      }
    });

    // Hide detail sections
    this.hideDetailSections();
  }

  hideAllSections() {
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });
  }

  hideDetailSections() {
    const detailSections = ["blog-detail-section", "service-detail-section", "blogs-page-section"];
    detailSections.forEach(id => {
      const section = document.getElementById(id);
      if (section) section.style.display = "none";
    });
  }

  getOrCreateSection(id, className) {
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement("section");
      section.id = id;
      section.className = className;
      document.querySelector("main")
        ? document.querySelector("main").appendChild(section)
        : document.body.insertBefore(section, document.querySelector(".footer"));
    }
    return section;
  }

  async loadBlogs() {
    try {
      const response = await fetch("/api/blogs");
      this.blogs = await response.json();
      this.blogsLoaded = true;
      this.renderBlogs();
    } catch (error) {
      console.error("Error loading blogs:", error);
      this.loadDefaultBlogs();
      this.blogsLoaded = true;
    }
    
    // Handle any pending route after blogs are loaded
    if (this.pendingRoute) {
      this.handleRoute();
      this.pendingRoute = null;
    }
  }

  loadDefaultBlogs() {
    this.blogs = [
      {
        id: 1,
        title: "Understanding Fire Insurance Claims",
        description: "A comprehensive guide to fire insurance claim processes and what to expect during assessment...",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format"
      },
      {
        id: 2,
        title: "Motor Insurance: Best Practices",
        description: "Essential tips for motor insurance claims and how proper documentation can speed up the process...",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&auto=format"
      },
      {
        id: 3,
        title: "Health Insurance Coverage Explained",
        description: "Navigate the complexities of health insurance policies and maximize your coverage benefits...",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&auto=format"
      },
      {
        id: 4,
        title: "Life Insurance: Protecting Your Family's Future",
        description: "Understanding life insurance policies and how to choose the right coverage for your family's needs...",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop&auto=format"
      }
    ];
    this.blogsLoaded = true;
    this.renderBlogs();
  }

  renderBlogs() {
    const blogsContainer = document.getElementById("blogs-preview");
    if (!blogsContainer) return;

    // Show only first 3 blogs in preview
    const previewBlogs = this.blogs.slice(0, 3);
    
    blogsContainer.innerHTML = previewBlogs
      .map(
        (blog) => `
            <div class="blog-card" data-blog="${blog.id}">
                <img src="${
                  blog.image ||
                  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format"
                }" alt="${blog.title}">
                <div class="blog-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <p class="blog-publisher">Published by: Tech Team APT</p>
                </div>
            </div>
        `
      )
      .join("");
  }

  renderAllBlogs() {
    const allBlogsContainer = document.getElementById("all-blogs-container");
    if (!allBlogsContainer) return;

    allBlogsContainer.innerHTML = this.blogs
      .map(
        (blog) => `
            <div class="blog-card" data-blog="${blog.id}">
                <img src="${
                  blog.image ||
                  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format"
                }" alt="${blog.title}">
                <div class="blog-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <p class="blog-publisher">Published by: Tech Team APT</p>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Load Testimonials from API
async function loadTestimonials() {
  try {
    const response = await fetch("/api/testimonials");
    const testimonials = await response.json();
    const testimonialsContainer = document.getElementById("testimonials-container");

    // Show only first 3 testimonials
    const displayTestimonials = testimonials.slice(0, 3);

    testimonialsContainer.innerHTML = displayTestimonials
      .map(
        (testimonial) => `
            <div class="testimonial-item">
                <h3>${testimonial.name}</h3>
                <p>"${testimonial.description}"</p>
                <div class="testimonial-author">${testimonial.name}</div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading testimonials:", error);
    loadDefaultTestimonials();
  }
}

function loadDefaultTestimonials() {
  const testimonialsContainer = document.getElementById("testimonials-container");
  testimonialsContainer.innerHTML = `
        <div class="testimonial-item">
            <h3>John Smith</h3>
            <p>"APT provided exceptional service during our fire claim assessment. Their thorough investigation and professional approach made the entire process smooth and transparent."</p>
            <div class="testimonial-author">John Smith</div>
        </div>
        <div class="testimonial-item">
            <h3>Sarah Johnson</h3>
            <p>"The team's expertise in marine claims is outstanding. They handled our cargo damage assessment with precision and delivered results quickly."</p>
            <div class="testimonial-author">Sarah Johnson</div>
        </div>
        <div class="testimonial-item">
            <h3>Michael Chen</h3>
            <p>"Outstanding motor insurance claim handling! APT's surveyors were professional, detailed, and helped us get a fair settlement for our vehicle damage."</p>
            <div class="testimonial-author">Michael Chen</div>
        </div>
    `;
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact Form Submission
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        alert("Please fill in all fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Submitting...</span>';
      submitBtn.disabled = true;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          alert("Thank you for your message! We will get back to you soon.");
          this.reset();
        } else {
          alert("There was an error sending your message. Please try again.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error sending your message. Please try again.");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".service-card, .blog-card, .testimonial-item"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Director Modal functionality
const directorData = {
  1: {
    name: "John Anderson",
    position: "Chief Executive Officer",
    sla: "SLA No: 12345",
    fellow: "Fellow, Institute of Insurance Surveyors",
    email: "john.anderson@apt.com",
    image: "/images/1.png",
    experience:
      "John brings over 20 years of experience in insurance surveying and risk assessment. He has led APT to become a trusted name in the industry, specializing in complex fire and marine claims. His expertise in forensic investigation and commitment to accuracy has helped resolve thousands of claims efficiently. John holds advanced certifications in loss adjustment and has been instrumental in developing industry best practices for claim assessment.",
  },
  2: {
    name: "Sarah Mitchell",
    position: "Head of Operations",
    sla: "SLA No: 12346",
    fellow: "Fellow, Chartered Institute of Loss Adjusters",
    email: "sarah.mitchell@apt.com",
    image: "/images/2.png",
    experience:
      "Sarah oversees all operational aspects of APT's surveying services. With 15 years of experience in motor and engineering claims, she ensures our team delivers comprehensive assessments on time. Her background in mechanical engineering provides valuable technical insights for complex industrial claims. Sarah has successfully managed over 5,000 claims and has been recognized for her innovative approach to streamlining assessment procedures.",
  },
  3: {
    name: "Michael Chen",
    position: "Senior Technical Advisor",
    sla: "SLA No: 12347",
    fellow: "Fellow, Institute of Marine Engineers",
    email: "michael.chen@apt.com",
    image: "/images/3.png",
    experience:
      "Michael is our lead technical expert with specialized knowledge in marine and engineering surveys. His 18 years of experience includes working with major shipping companies and industrial manufacturers. He holds certifications in marine surveying and structural engineering assessment. Michael has handled some of the most complex marine casualties and engineering failures, providing expert testimony in high-value litigation cases.",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("directorModal");
  const closeBtn = document.querySelector(".close-btn");
  const teamMembers = document.querySelectorAll(".team-member");

  // Open modal when team member is clicked
  teamMembers.forEach((member) => {
    member.addEventListener("click", function () {
      const directorId = this.getAttribute("data-director");
      const director = directorData[directorId];

      if (director) {
        document.getElementById("modalImage").src = director.image;
        document.getElementById("modalName").textContent = director.name;
        document.getElementById("modalPosition").textContent = director.position;
        document.getElementById("modalSLA").textContent = director.sla;
        document.getElementById("modalFellow").textContent = director.fellow;
        document.getElementById("modalEmail").innerHTML = `<a href="mailto:${director.email}">${director.email}</a>`;
        document.getElementById("modalExperience").textContent = director.experience;

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize router
  new ContentRouter();

  // Show first slide
  if (slides.length > 0) {
    showSlide(0);
  }

  // Load dynamic content
  loadTestimonials();

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Apply ripple effect to buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".cta-button, .see-more-btn, .back-to-home, .submit-btn, .show-more-btn"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", createRipple);
  });
});
