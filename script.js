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

 // DOM Elements
  const fileUploadArea = document.getElementById('fileUploadArea');
  const fileInput = document.getElementById('resumeFileInput');
  const uploadedFileInfo = document.getElementById('uploadedFileInfo');
  const resumeTextArea = document.getElementById('resumeTextInput');
  const jobDescArea = document.getElementById('jobDescriptionInput');
  const generateBtn = document.getElementById('generateAtsOptimizedBtn');
  const resultDiv = document.getElementById('atsOptimizedResult');
  const matchScoreSpan = document.getElementById('atsMatchScore');
  const keywordAnalysisDiv = document.getElementById('keywordAnalysis');
  const optimizedContentDiv = document.getElementById('optimizedResumeContent');

  let currentResumeText = '';
  let currentFileName = '';

  // File upload handling
  fileUploadArea.addEventListener('click', () => fileInput.click());
  fileUploadArea.addEventListener('dragover', (e) => { e.preventDefault(); fileUploadArea.style.borderColor = '#2A5298'; });
  fileUploadArea.addEventListener('dragleave', () => fileUploadArea.style.borderColor = '#cbdde9');
  fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    fileUploadArea.style.borderColor = '#cbdde9';
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  function handleFile(file) {
    if (file.type === 'text/plain' || file.type === 'application/pdf' || file.name.endsWith('.txt')) {
      currentFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        currentResumeText = e.target.result;
        resumeTextArea.value = currentResumeText;
        uploadedFileInfo.innerHTML = `<i class="fas fa-check-circle"></i> Loaded: ${currentFileName}`;
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a TXT file or paste text manually. For PDF demo, paste content.');
      uploadedFileInfo.innerHTML = '<span style="color:#c2410c;">⚠️ For demo, paste text in the textarea below</span>';
    }
  }

  // Extract keywords from text
  function extractKeywords(text) {
    const words = text.toLowerCase().split(/[\s,.\n()\-:;]+/);
    const commonWords = new Set(['the', 'and', 'for', 'with', 'experience', 'skills', 'years', 'ability', 'strong', 'proven', 'team', 'work', 'communication', 'required', 'preferred', 'looking', 'seeking']);
    const keywords = words.filter(w => w.length > 3 && !commonWords.has(w) && !/^\d+$/.test(w));
    const unique = [...new Set(keywords)];
    return unique.slice(0, 40);
  }

  // Calculate match score & find missing keywords
  function analyzeATS(resumeText, jobDesc) {
    if (!resumeText || !jobDesc) return { score: 0, matched: [], missing: [], suggestions: [] };
    
    const resumeLower = resumeText.toLowerCase();
    const jobKeywords = extractKeywords(jobDesc);
    const matched = [];
    const missing = [];
    
    jobKeywords.forEach(keyword => {
      if (resumeLower.includes(keyword)) {
        matched.push(keyword);
      } else {
        missing.push(keyword);
      }
    });
    
    const score = jobKeywords.length > 0 ? Math.round((matched.length / jobKeywords.length) * 100) : 0;
    const suggestions = missing.slice(0, 8).map(k => `Add "${k}" to your skills or experience section`);
    
    return { score, matched, missing, suggestions, jobKeywords };
  }

  // Generate optimized resume based on JD
  function generateOptimizedResume(originalResume, jobDesc, matchedKeywords, missingKeywords) {
    if (!originalResume) return "No resume content provided.";
    
    const lines = originalResume.split('\n');
    let optimized = `=== ATS-OPTIMIZED RESUME ===\n`;
    optimized += `Generated based on job description analysis\n\n`;
    
    // Add keyword optimization note
    if (matchedKeywords.length > 0) {
      optimized += `✓ STRONG MATCHES: ${matchedKeywords.slice(0, 15).join(', ')}\n\n`;
    }
    if (missingKeywords.length > 0) {
      optimized += `⚠️ ADD THESE KEYWORDS TO IMPROVE SCORE:\n${missingKeywords.slice(0, 12).join(', ')}\n\n`;
    }
    
    optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    optimized += `OPTIMIZED RESUME CONTENT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Add structured content
    optimized += `📌 PROFESSIONAL SUMMARY\n`;
    optimized += `Results-driven professional with expertise in ${matchedKeywords.slice(0, 5).join(', ')}. Proven track record of delivering high-impact results.\n\n`;
    
    // Extract and display original sections
    let skillsSection = '';
    let experienceSection = '';
    let inSkills = false;
    
    for (let line of lines) {
      if (line.toLowerCase().includes('skill') || line.toLowerCase().includes('expertise')) {
        inSkills = true;
        skillsSection += line + '\n';
      } else if (inSkills && (line.trim() === '' || line.toLowerCase().includes('experience') || line.toLowerCase().includes('education'))) {
        inSkills = false;
      } else if (inSkills) {
        skillsSection += line + '\n';
      }
      
      if (line.toLowerCase().includes('experience') || line.toLowerCase().includes('work history')) {
        experienceSection += line + '\n';
      } else if (experienceSection && line.trim().length > 0 && !line.toLowerCase().includes('education')) {
        experienceSection += line + '\n';
      }
    }
    
    optimized += `💼 KEY EXPERIENCE\n${experienceSection || '• Senior role with demonstrated success in relevant domains.\n'}\n`;
    optimized += `🛠️ CORE SKILLS & COMPETENCIES\n`;
    
    // Add missing keywords as suggestions
    const missingToAdd = missingKeywords.slice(0, 8);
    if (missingToAdd.length > 0) {
      optimized += `[RECOMMENDED TO ADD]: ${missingToAdd.join(', ')}\n`;
    }
    optimized += `${skillsSection || '• Strategic Planning • Cross-functional Leadership • Data Analysis\n'}\n`;
    
    optimized += `🎓 EDUCATION & CERTIFICATIONS\n`;
    optimized += `• Relevant certifications aligned with industry standards\n\n`;
    optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    optimized += `✨ ATS OPTIMIZATION TIPS:\n`;
    optimized += `1. Include the missing keywords naturally in your experience bullets\n`;
    optimized += `2. Use standard section headers (Work Experience, Skills, Education)\n`;
    optimized += `3. Quantify achievements with numbers and percentages\n`;
    optimized += `4. Avoid tables, graphics, and unusual formatting\n`;
    
    return optimized;
  }

  // Main generation function
  generateBtn.addEventListener('click', () => {
    const resumeText = resumeTextArea.value.trim();
    const jobDesc = jobDescArea.value.trim();
    
    if (!resumeText) {
      alert('Please upload a resume or paste your CV text in the textarea.');
      return;
    }
    if (!jobDesc) {
      alert('Please paste a job description for ATS analysis.');
      return;
    }
    
    // Show loading state
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Analyzing...';
    generateBtn.disabled = true;
    
    setTimeout(() => {
      const analysis = analyzeATS(resumeText, jobDesc);
      const optimizedResume = generateOptimizedResume(resumeText, jobDesc, analysis.matched, analysis.missing);
      
      // Update UI
      matchScoreSpan.textContent = `${analysis.score}% Match`;
      if (analysis.score >= 80) matchScoreSpan.style.background = "#0a5c2e";
      else if (analysis.score >= 60) matchScoreSpan.style.background = "#e6b422";
      else matchScoreSpan.style.background = "#c2410c";
      
      // Keyword analysis display
      keywordAnalysisDiv.innerHTML = `
        <div style="margin: 1rem 0;">
          <strong><i class="fas fa-key"></i> Keyword Match Analysis:</strong>
          <div class="keyword-match">
            ${analysis.matched.slice(0, 12).map(k => `<span class="keyword-tag match">✓ ${k}</span>`).join('')}
            ${analysis.missing.slice(0, 12).map(k => `<span class="keyword-tag missing">✗ ${k}</span>`).join('')}
          </div>
          ${analysis.missing.length > 0 ? `<p style="margin-top: 0.8rem; color: #c2410c;"><i class="fas fa-exclamation-triangle"></i> Missing ${analysis.missing.length} key keywords. Add them to boost your ATS score.</p>` : '<p style="color: #0a5c2e;">✅ Excellent keyword coverage!</p>'}
        </div>
      `;
      
      // Display optimized resume
      optimizedContentDiv.innerHTML = `
        <div style="background: #f8faff; border-radius: 1rem; padding: 1.2rem; white-space: pre-wrap; font-family: monospace; font-size: 0.85rem; max-height: 500px; overflow-y: auto;">
          ${optimizedResume.replace(/\n/g, '<br>')}
        </div>
      `;
      
      resultDiv.style.display = 'block';
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate ATS-Optimized Resume';
      generateBtn.disabled = false;
      
      // Store for download
      window.currentOptimizedResume = optimizedResume;
    }, 500);
  });
  
  // Download optimized resume
  document.getElementById('downloadOptimizedResumeBtn')?.addEventListener('click', () => {
    if (window.currentOptimizedResume) {
      const blob = new Blob([window.currentOptimizedResume], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ATS_Optimized_Resume_${new Date().toISOString().slice(0,10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert('Generate an optimized resume first.');
    }
  });
  
  // CV Download
  document.getElementById('downloadCvBtn')?.addEventListener('click', () => {
    const content = `ELIAS VEGA — ATS EXPERT CV\n\n8+ years experience in ATS optimization. Proven 94% success rate.`;
    const blob = new Blob([content], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elias_Vega_CV.pdf';
    a.click();
    URL.revokeObjectURL(url);
  });
  
  // Resume versions
  let resumeVersions = [
    { id: 1, title: "Product Designer Resume", date: "2025-03-20", version: "v3.0", highlights: "Optimized with ATS keywords" }
  ];
  
  function renderResumeList() {
    const container = document.getElementById('resumeListContainer');
    if(!container) return;
    container.innerHTML = resumeVersions.map((res, idx) => `
      <div class="resume-item">
        <div><strong>${res.title}</strong> <span style="background:#eef2fa; padding:2px 8px; border-radius:40px;">${res.version}</span><div style="font-size:0.8rem;">📅 ${res.date}</div></div>
        <div>${idx === 0 ? '<span style="background:#2A5298; color:white; padding:4px 12px; border-radius:40px;">LAST RESUME</span>' : ''}</div>
      </div>
    `).join('');
  }
  
  document.getElementById('addNewResumeVersion')?.addEventListener('click', () => {
    resumeVersions.unshift({ id: Date.now(), title: `ATS Optimized ${new Date().toLocaleDateString()}`, date: new Date().toISOString().slice(0,10), version: `v${resumeVersions.length+1}.0`, highlights: "New ATS version" });
    renderResumeList();
  });
  renderResumeList();
  
  // Mobile menu & active link
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navList = document.getElementById('navLinks');
  mobileBtn?.addEventListener('click', () => navList.classList.toggle('show'));
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) current = section.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });
