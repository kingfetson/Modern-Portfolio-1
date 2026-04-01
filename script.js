// script.js - Modern Portfolio Interactive Features with Enhanced ATS Builder

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

// ========== ENHANCED SMART ATS BUILDER ==========
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

// Escape HTML helper
function escapeHtml(str) {
  if(!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  });
}

// File upload handling
if (fileUploadArea) {
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
}

function handleFile(file) {
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    currentFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentResumeText = e.target.result;
      resumeTextArea.value = currentResumeText;
      uploadedFileInfo.innerHTML = `<i class="fas fa-check-circle"></i> Loaded: ${currentFileName}`;
    };
    reader.readAsText(file);
  } else {
    alert('Please upload a TXT file or paste text manually.');
    uploadedFileInfo.innerHTML = '<span style="color:#c2410c;">⚠️ For best results, paste text in the textarea below</span>';
  }
}

// Extract keywords from text
function extractKeywords(text) {
  const words = text.toLowerCase().split(/[\s,.\n()\-:;]+/);
  const commonWords = new Set(['the', 'and', 'for', 'with', 'experience', 'skills', 'years', 'ability', 'strong', 'proven', 'team', 'work', 'communication', 'required', 'preferred', 'looking', 'seeking', 'about', 'are', 'will', 'have', 'your', 'you', 'our']);
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
  
  let optimized = `╔══════════════════════════════════════════════════════════╗\n`;
  optimized += `║              ATS-OPTIMIZED RESUME                         ║\n`;
  optimized += `╚══════════════════════════════════════════════════════════╝\n\n`;
  optimized += `Generated: ${new Date().toLocaleDateString()}\n`;
  optimized += `Based on job description analysis\n\n`;
  optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Add keyword optimization note
  if (matchedKeywords.length > 0) {
    optimized += `✓ STRONG MATCHES (${matchedKeywords.length} keywords):\n`;
    optimized += `  ${matchedKeywords.slice(0, 15).join(', ')}\n\n`;
  }
  if (missingKeywords.length > 0) {
    optimized += `⚠️ ADD THESE KEYWORDS TO IMPROVE SCORE (${missingKeywords.length} missing):\n`;
    optimized += `  ${missingKeywords.slice(0, 12).join(', ')}\n\n`;
  }
  
  optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  optimized += `OPTIMIZED RESUME CONTENT\n`;
  optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Add structured content
  optimized += `📌 PROFESSIONAL SUMMARY\n`;
  optimized += `Results-driven professional with expertise in ${matchedKeywords.slice(0, 5).join(', ') || 'key competencies'}. `;
  optimized += `Proven track record of delivering high-impact results and driving organizational success.\n\n`;
  
  // Extract and display original sections
  const lines = originalResume.split('\n');
  let skillsSection = '';
  let experienceSection = '';
  let inSkills = false;
  
  for (let line of lines) {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('skill') || lowerLine.includes('expertise') || lowerLine.includes('competencies')) {
      inSkills = true;
      skillsSection += line + '\n';
    } else if (inSkills && (line.trim() === '' || lowerLine.includes('experience') || lowerLine.includes('education') || lowerLine.includes('work'))) {
      inSkills = false;
    } else if (inSkills) {
      skillsSection += line + '\n';
    }
    
    if (lowerLine.includes('experience') || lowerLine.includes('work history') || lowerLine.includes('employment')) {
      experienceSection += line + '\n';
    } else if (experienceSection && line.trim().length > 0 && !lowerLine.includes('education') && !lowerLine.includes('skill')) {
      experienceSection += line + '\n';
    }
  }
  
  optimized += `💼 PROFESSIONAL EXPERIENCE\n`;
  optimized += experienceSection || '• Senior role with demonstrated success in relevant domains.\n';
  optimized += `\n🛠️ CORE SKILLS & COMPETENCIES\n`;
  
  // Add missing keywords as recommendations
  const missingToAdd = missingKeywords.slice(0, 8);
  if (missingToAdd.length > 0) {
    optimized += `[RECOMMENDED TO ADD]: ${missingToAdd.join(', ')}\n`;
  }
  optimized += skillsSection || '• Strategic Planning • Cross-functional Leadership • Data Analysis • Project Management\n';
  
  optimized += `\n🎓 EDUCATION & CERTIFICATIONS\n`;
  optimized += `• Relevant certifications aligned with industry standards\n`;
  optimized += `• Continuous learning and professional development\n\n`;
  
  optimized += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  optimized += `✨ ATS OPTIMIZATION TIPS:\n`;
  optimized += `1. Include the missing keywords naturally in your experience bullets\n`;
  optimized += `2. Use standard section headers (Work Experience, Skills, Education)\n`;
  optimized += `3. Quantify achievements with numbers and percentages\n`;
  optimized += `4. Avoid tables, graphics, and unusual formatting\n`;
  optimized += `5. Use a clean, single-column layout\n`;
  
  return optimized;
}

// Main generation function
if (generateBtn) {
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
            ${analysis.matched.slice(0, 12).map(k => `<span class="keyword-tag match">✓ ${escapeHtml(k)}</span>`).join('')}
            ${analysis.missing.slice(0, 12).map(k => `<span class="keyword-tag missing">✗ ${escapeHtml(k)}</span>`).join('')}
          </div>
          ${analysis.missing.length > 0 ? 
            `<p style="margin-top: 0.8rem; color: #c2410c;"><i class="fas fa-exclamation-triangle"></i> Missing ${analysis.missing.length} key keywords. Add them to boost your ATS score.</p>` : 
            '<p style="color: #0a5c2e;">✅ Excellent keyword coverage! Your resume is well-aligned with the job description.</p>'}
        </div>
      `;
      
      // Display optimized resume
      optimizedContentDiv.innerHTML = `
        <div style="background: #f8faff; border-radius: 1rem; padding: 1.2rem; white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 0.85rem; max-height: 500px; overflow-y: auto;">
          ${optimizedResume.replace(/\n/g, '<br>')}
        </div>
      `;
      
      resultDiv.style.display = 'block';
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate ATS-Optimized Resume';
      generateBtn.disabled = false;
      
      // Store for download
      window.currentOptimizedResume = optimizedResume;
      
      // Smooth scroll to results
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 500);
  });
}

// Download optimized resume
const downloadOptimizedBtn = document.getElementById('downloadOptimizedResumeBtn');
if (downloadOptimizedBtn) {
  downloadOptimizedBtn.addEventListener('click', () => {
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
}

// CV Download
const downloadCvBtn = document.getElementById('downloadCvBtn');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', () => {
    const content = `ELIAS VEGA — ATS EXPERT CV

CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: elias@vega.me
Portfolio: eliasvega.dev
LinkedIn: linkedin.com/in/eliasvega

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATS Optimization Specialist with 8+ years of experience helping professionals increase interview rates by 94%. Expert in keyword matching, resume engineering, and career strategy.

EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lead ATS Strategist | 2021–Present
  Optimized 500+ resumes with 85% interview placement rate
• Career Consultant | 2018–2021
  Developed keyword optimization framework used by 50+ agencies

SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATS Optimization · Keyword Analysis · Resume Engineering · Career Coaching · Data Analysis

CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Advanced ATS Optimization Specialist
• Certified Career Coach (ICF)`;

    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elias_Vega_CV.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    const btn = downloadCvBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  });
}

// ========== LAST RESUME dynamic system ==========
let resumeVersions = [
  { id: 1, title: "Senior Product Designer Resume", date: "2025-02-15", version: "v2.3", highlights: "Optimized for ATS + leadership metrics" },
  { id: 2, title: "Full-Stack + ATS Expert Resume", date: "2025-03-20", version: "v3.0", highlights: "Included Smart ATS builder case study" }
];

function renderResumeList() {
  const container = document.getElementById('resumeListContainer');
  if(!container) return;
  
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
        ${isLatest ? '<span style="background:#2A5298; color:white; padding:4px 12px; border-radius:40px; font-size:0.7rem; font-weight:600;"><i class="fas fa-history"></i> LAST RESUME</span>' : '<span style="background:#eef2fa; padding:4px 10px; border-radius:40px; font-size:0.7rem;">archived</span>'}
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

let versionCounter = 3;
const addResumeBtn = document.getElementById('addNewResumeVersion');
if (addResumeBtn) {
  addResumeBtn.addEventListener('click', () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newVersion = {
      id: Date.now(),
      title: `Resume Draft ${versionCounter}`,
      date: formattedDate,
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
      highlights: `Added ATS keywords and Smart ATS Builder feedback`
    };
    resumeVersions.unshift(newVersion);
    versionCounter++;
    renderResumeList();
    
    const btn = addResumeBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 1500);
  });
}
renderResumeList();

// ========== SMOOTH SCROLL FOR HASH LINKS ==========
if(window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if(href === '#' || href === '') return;
    const target = document.querySelector(href);
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, href);
    }
  });
});

// ========== SCROLL REVEAL EFFECT ==========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .resume-item, .ats-builder-area, .about-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

setTimeout(() => {
  document.querySelectorAll('.card, .resume-item, .ats-builder-area, .about-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 100);
