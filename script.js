// script.js - Modern Portfolio Interactive Features

// ========== STICKY NAVIGATION ACTIVE LINK & MOBILE MENU ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileBtn = document.getElementById('mobileMenuBtn');
const navList = document.getElementById('navLinks');

function setActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if(scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href')?.substring(1);
    if(href === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Mobile toggle
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
  });
});

// ========== SMART ATS BUILDER LOGIC ==========
const generateBtn = document.getElementById('generateAtsPreviewBtn');
const previewDiv = document.getElementById('atsPreviewResult');
const previewContent = document.getElementById('previewContent');
const atsScoreSpan = document.getElementById('atsScoreBadge');

function calculateATSScore(skillsStr, experience, summary) {
  let score = 60;
  const skillsArray = skillsStr.split(',').map(s => s.trim().toLowerCase());
  const keywords = ['ux', 'design', 'javascript', 'react', 'python', 'ats', 'product', 'management', 'data', 'strategy', 'leadership', 'agile', 'figma', 'research', 'analytics', 'marketing', 'sales', 'project', 'development'];
  let matched = skillsArray.filter(skill => keywords.some(kw => skill.includes(kw))).length;
  score += Math.min(20, matched * 4);
  if(experience >= 5) score += 10;
  if(experience >= 2 && experience < 5) score += 5;
  if(summary.length > 60) score += 5;
  if(summary.match(/[0-9]+%/)) score += 5;
  if(summary.match(/[0-9]+x/)) score += 3;
  return Math.min(98, score);
}

function escapeHtml(str) {
  if(!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
    return c;
  });
}

if (generateBtn) {
  generateBtn.addEventListener('click', () => {
    const name = document.getElementById('atsName').value.trim() || "Candidate";
    const title = document.getElementById('atsTitle').value.trim() || "Professional";
    let skillsRaw = document.getElementById('atsSkills').value;
    const experience = parseInt(document.getElementById('atsExperience').value) || 0;
    const summary = document.getElementById('atsSummary').value.trim();

    const atsScore = calculateATSScore(skillsRaw, experience, summary);
    const skillList = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).join(' · ') : 'Not specified';
    
    const previewHtml = `
      <div style="background:#F8FAFE; border-radius:1rem; padding:1rem;">
        <p><strong>${escapeHtml(name)}</strong> — ${escapeHtml(title)}</p>
        <p><i class="fas fa-microchip"></i> <strong>ATS Keywords:</strong> ${escapeHtml(skillList)}</p>
        <p><i class="fas fa-chart-line"></i> <strong>Experience:</strong> ${experience} years</p>
        <p><i class="fas fa-star"></i> <strong>Highlight:</strong> ${escapeHtml(summary.substring(0, 150))}${summary.length>150?'...':''}</p>
        <hr style="margin:0.8rem 0">
        <p><i class="fas fa-check-circle" style="color:#2A5298;"></i> Recommended action: tailor skills to job description, add quantifiable metrics.</p>
      </div>
    `;
    previewContent.innerHTML = previewHtml;
    
    let scoreMessage = `✅ ATS Compatibility Score: ${atsScore}/100 — `;
    if(atsScore >= 80) scoreMessage += "Excellent, ready for top ATS filters.";
    else if(atsScore >= 65) scoreMessage += "Good, improve skill relevance and add more metrics.";
    else scoreMessage += "Needs stronger keyword alignment & quantifiable achievements.";
    
    atsScoreSpan.innerHTML = scoreMessage;
    previewDiv.style.display = 'block';
    
    // Smooth scroll to preview
    previewDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// ========== CV DOWNLOAD (simulated PDF generation) ==========
const downloadBtn = document.getElementById('downloadCvBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const content = `ELIAS VEGA — PROFESSIONAL CV
═══════════════════════════════════════

CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: elias@vega.me
Portfolio: eliasvega.dev
LinkedIn: linkedin.com/in/eliasvega

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Creative technologist and career strategist with 8+ years of experience in product design and ATS optimization. Proven track record of helping professionals increase interview rates by 92% through strategic resume engineering and personal branding.

WORK EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lead Product Designer | InnovateX
2021 – Present
• Redesigned core platform resulting in 42% increase in user engagement
• Implemented ATS-friendly design system used by 50+ enterprise clients
• Mentored 12 junior designers in UX best practices

ATS Consultant | CareerAI
2019 – 2021
• Optimized 200+ resumes achieving 85% interview placement rate
• Developed keyword optimization framework adopted by 3 recruitment agencies
• Conducted 30+ workshops on ATS navigation strategies

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
M.Sc. Human-Computer Interaction
Stanford University | 2017 – 2019

B.A. Digital Media Design
University of California, Berkeley | 2013 – 2017

CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Advanced ATS Optimization Specialist (2024)
• Certified Career Coach (ICF)
• Figma Mastery Certification

SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATS Optimization · UX Research · Product Strategy · Resume Engineering · Career Coaching · Figma · JavaScript · Data Analysis · Content Strategy

LANGUAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
English (Native) · Spanish (Fluent)

REFERENCES AVAILABLE UPON REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated via Smart Portfolio System | March 2025`;

    const blob = new Blob([content], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elias_Vega_CV_2025.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    const btn = downloadBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  });
}

// ========== LAST RESUME dynamic system ==========
let resumeVersions = [
  { id: 1, title: "Senior Product Designer Resume", date: "2025-02-15", version: "v2.3", highlights: "Optimized for ATS + leadership metrics, includes portfolio case studies" },
  { id: 2, title: "Full-Stack + ATS Expert Resume", date: "2025-03-20", version: "v3.0", highlights: "Included Smart ATS builder case study and AI integration experience" }
];

function renderResumeList() {
  const container = document.getElementById('resumeListContainer');
  if(!container) return;
  
  // Sort by date descending (latest first) -> "last resume" is the most recent
  const sorted = [...resumeVersions].sort((a,b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = '';
  
  if(sorted.length === 0) {
    container.innerHTML = '<div class="resume-item">No resume versions yet. Click "Add new version".</div>';
    return;
  }
  
  sorted.forEach((res, idx) => {
    const isLatest = idx === 0;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'resume-item';
    itemDiv.innerHTML = `
      <div style="flex:1">
        <strong>${escapeHtml(res.title)}</strong> 
        <span style="font-size:0.75rem; background:#eef2fa; padding:2px 10px; border-radius:40px; margin-left:8px;">${escapeHtml(res.version)}</span>
        <div style="font-size:0.8rem; color:#4e6b85; margin-top:4px;">
          <i class="far fa-calendar-alt"></i> ${res.date} — ${escapeHtml(res.highlights.substring(0, 80))}${res.highlights.length > 80 ? '...' : ''}
        </div>
      </div>
      <div>
        ${isLatest ? '<span style="background:#2A5298; color:white; padding:4px 12px; border-radius:40px; font-size:0.7rem; font-weight:600;"><i class="fas fa-history"></i> LAST RESUME</span>' : '<span style="background:#eef2fa; padding:4px 10px; border-radius:40px; font-size:0.7rem;">archived version</span>'}
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

// Add new resume version
let versionCounter = 3;
const addBtn = document.getElementById('addNewResumeVersion');
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    
    const newVersion = {
      id: Date.now(),
      title: `Resume Draft ${versionCounter}`,
      date: formattedDate,
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
      highlights: `Added ATS keywords, updated achievements, and integrated Smart ATS Builder feedback — optimized for ${new Date().toLocaleDateString()}`
    };
    resumeVersions.push(newVersion);
    versionCounter++;
    renderResumeList();
    
    // Show success message
    const btn = addBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 1500);
    
    // Scroll to show the new version
    document.getElementById('resume-last').scrollIntoView({ behavior: 'smooth' });
  });
}

// Initial render of resume list
renderResumeList();

// ========== SMOOTH SCROLL FOR HASH LINKS ==========
// Handle initial hash on page load
if(window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if(target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if(href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Update URL without jumping
      history.pushState(null, null, href);
    }
  });
});

// ========== ADD INTERACTIVE FEEDBACK FOR FORM FIELDS ==========
const atsInputs = ['atsName', 'atsTitle', 'atsSkills', 'atsExperience', 'atsSummary'];
atsInputs.forEach(id => {
  const element = document.getElementById(id);
  if(element) {
    element.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    element.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  }
});

// Add loading animation for ATS button
if (generateBtn) {
  generateBtn.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Analyzing...';
    setTimeout(() => {
      this.innerHTML = originalText;
    }, 500);
  });
}

// Optional: Add scroll reveal effect for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add initial styles for animation
document.querySelectorAll('.card, .resume-item, .ats-builder-area').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Trigger initial animations for visible elements
setTimeout(() => {
  document.querySelectorAll('.card, .resume-item, .ats-builder-area').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 100);
