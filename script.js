/**
 * HACKSCALE PLATFORM - INTERACTIVE JAVASCRIPT ENGINE
 * Full functionality: State management, live search, category filtering,
 * interactive sandbox tabs, rubric scoring simulator, sponsor playground,
 * pitch deck carousel, bookmark persistence, modal reader, and form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. PRELOADER DISMISSAL
  // ==========================================================================
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      setTimeout(() => {
        loader.remove();
      }, 600);
    }, 800);
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobLinks = document.querySelectorAll('.mob-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('modal-open', isOpen);
    });

    mobLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');
      });
    });
  }

  // ==========================================================================
  // 3. ARTICLES CATALOG DATA (RICH ORIGINAL FIELD NOTES)
  // ==========================================================================
  const ARTICLES = [
    {
      id: "eth-global-win",
      title: "How We Won $50,000 at ETHGlobal: The 3-Minute Demo Rule",
      category: "Playbooks",
      readTime: "6 min read",
      date: "Oct 28, 2026",
      author: { name: "Marcus Vance", initials: "MV", role: "Grand Prize Winner" },
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Why the most technically complex repos frequently lose to teams that master the 180-second pitch window. The exact slide structure and live demo choreography that won over judges.",
      content: `
        <h2>The Brutal Truth About Hackathon Judging</h2>
        <p>In a standard hackathon with 400 projects, judges are tasked with reviewing between 20 and 40 projects in roughly two hours. That means your project does not get 15 minutes of thoughtful architectural review. You get exactly <strong>180 seconds</strong> to establish relevance, prove technical credibility, and spark an emotional reaction.</p>
        
        <h3>The 180-Second Breakdown Formula</h3>
        <p>Here is the exact timing formula we followed at ETHGlobal Brussels to secure the grand prize across 380 competing teams:</p>
        <ul>
          <li><strong>0:00 - 0:30 (The Problem):</strong> Never start with "Hi, our project is called X". Start with the visceral problem: "Every single day, 80,000 Web3 developers lose 3 hours verifying cross-chain telemetry manually."</li>
          <li><strong>0:30 - 2:00 (The Live Magic Moment):</strong> Jump directly into your production URL. Do not click through login screens or fill out signup forms. Have mock data loaded. Show the user initiating a complex action and the instantaneous result.</li>
          <li><strong>2:00 - 2:30 (The Technical Architecture):</strong> Show a clean diagram explaining why this wasn't trivial to build. Mention specific sponsor SDKs: "We wired Google Gemini for multi-modal reasoning and anchored consensus onto Polygon zkEVM."</li>
          <li><strong>2:30 - 3:00 (Vision & Future Roadmap):</strong> Conclude with a strong commercial vision: "We're launching on testnet next Tuesday with 4 enterprise design partners already signed up."</li>
        </ul>

        <blockquote>"Judges don't remember lines of code. They remember the team that solved a painful headache and demonstrated working software with flawless confidence."</blockquote>

        <h3>Key Takeaway Checklist</h3>
        <p>Before recording your Devpost video or getting on stage, verify that you have zero cold starts, pre-filled forms, a backup video file on your local desktop, and a high-contrast dark mode interface that shows up crisp on projector screens.</p>
      `
    },
    {
      id: "ai-agent-stack",
      title: "The 2026 AI Agent Hackathon Stack: Gemini 2.5 + Supabase Vector",
      category: "AI Workflows",
      readTime: "8 min read",
      date: "Nov 02, 2026",
      author: { name: "Dr. Elena Rostova", initials: "ER", role: "AI Systems Lead" },
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      excerpt: "How to scaffold a multi-modal reasoning agent with sub-second latency and persistent vector memory in under 90 minutes using modern TypeScript primitives.",
      content: `
        <h2>Why Traditional LLM Wrappers No Longer Win Hackathons</h2>
        <p>Two years ago, building a UI around a basic chat completion endpoint was enough to win a sponsor prize. In 2026, judges immediately disqualify thin ChatGPT wrappers. Winning projects now demonstrate <strong>autonomous tool execution</strong>, <strong>persistent stateful memory</strong>, and <strong>multi-modal context</strong>.</p>

        <h3>The 90-Minute Production Architecture</h3>
        <p>To win competitive AI tracks, use a decoupled architectural pattern:</p>
        <pre><code>// Fast Multimodal Agent Pipeline
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function runAgentWorkflow(taskPrompt, userFiles) {
  // 1. Query vector index for relevant past context
  const { data: memories } = await supabase.rpc('match_memories', { query_embedding: ... });
  
  // 2. Execute reasoning with Gemini 2.5 Flash
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ text: taskPrompt }, ...userFiles]
  });

  return response.text;
}</code></pre>

        <h3>Three Rules for AI Hackathon Demos</h3>
        <ol>
          <li><strong>Never show an infinite loader:</strong> Implement streaming UI or simulated optimistic responses so the judge is never waiting in silence.</li>
          <li><strong>Expose agent reasoning logs:</strong> Judges love seeing the "thought trace" or internal step execution in an animated side drawer.</li>
          <li><strong>Have a hardcoded fallback mock:</strong> If the model rate-limits during your presentation, your client should seamlessly fallback to cached response JSON.</li>
        </ol>
      `
    },
    {
      id: "sponsor-bounties-guide",
      title: "Sponsor Bounties 101: How to Stack 4 Prizes in a Single 48-Hour Project",
      category: "Sponsor Bounties",
      readTime: "7 min read",
      date: "Oct 24, 2026",
      author: { name: "Kenji Sato", initials: "KS", role: "DevRel & 12x Winner" },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Stop competing only for the overcrowded Grand Prize. Here is how our team unlocked $18,500 by strategically targeting multiple sponsor tracks simultaneously.",
      content: `
        <h2>The Math of Hackathon Bounties</h2>
        <p>The Grand Prize typically has 300+ teams competing for a single $10,000 purse. Meanwhile, specific sponsor bounties (such as "Best Implementation of Polygon zkEVM" or "Best Voice Integration via ElevenLabs") often have only 8 to 15 qualified submissions, offering $3,000 to $5,000 each.</p>

        <h3>The Multi-Sponsor Stacking Matrix</h3>
        <p>Winning teams architect their project to naturally satisfy 3 to 4 sponsor requirements simultaneously without making the app feel like a Franken-stack:</p>
        <ul>
          <li><strong>Compute & Intelligence:</strong> Google Gemini 2.5 (Qualifies for AI Foundation track)</li>
          <li><strong>Identity & Verification:</strong> Polygon / Chainlink (Qualifies for Web3 / Oracle track)</li>
          <li><strong>Accessibility & UI:</strong> ElevenLabs Voice (Qualifies for Best Voice/Assistive Tech track)</li>
          <li><strong>Database & Edge:</strong> Supabase or Cloudflare (Qualifies for Best Developer Tooling track)</li>
        </ul>

        <blockquote>"Always visit the sponsor booths within the first 3 hours of the hackathon. Ask their Developer Advocates: 'What kind of project do you rarely see that would genuinely impress your team?' They will literally tell you the winning formula."</blockquote>
      `
    },
    {
      id: "edge-deployment-guide",
      title: "Zero to Production URL in 15 Minutes: Serverless Edge Boilerplate Guide",
      category: "AI Workflows",
      readTime: "5 min read",
      date: "Oct 19, 2026",
      author: { name: "Priya Sharma", initials: "PS", role: "Infrastructure Architect" },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Never suffer localhost crashes during judging again. How to set up continuous edge deployments, automated healthcheck probes, and instant demo mocks.",
      content: `
        <h2>The Localhost Graveyard</h2>
        <p>Every hackathon organizer has seen it: a developer frantically plugging their HDMI cable into a laptop screen, muttering "It worked on localhost 5 minutes ago!" while a 500 internal server error stares back at the judges.</p>

        <h3>Deploy on Hour 2, Not Hour 46</h3>
        <p>The secret to bulletproof hackathon demos is deploying your project to a public live URL within the first 120 minutes of the event. Even if your repository only contains a simple Next.js welcome page, deploy it immediately with automatic CI/CD on every Git push.</p>

        <h3>The Fail-Safe Mock Strategy</h3>
        <p>When internet connectivity in crowded convention halls degrades, configure your frontend client with a simple query parameter toggle: <code>?demo=true</code>. When active, all external API network calls resolve to instant, realistic mock JSON stored in memory, guaranteeing a 100% smooth presentation regardless of Wi-Fi drops.</p>
      `
    },
    {
      id: "yc-pitch-template",
      title: "The YC-Style Hackathon Pitch Deck Template That Converts Judges",
      category: "Pitch Decks",
      readTime: "6 min read",
      date: "Oct 15, 2026",
      author: { name: "David Chen", initials: "DC", role: "Angel Investor & Judge" },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      excerpt: "A battle-tested 4-slide structure that cleanly communicates problem urgency, technical differentiation, and venture-scale market opportunity.",
      content: `
        <h2>Slide 1: The Urgent Hair-On-Fire Problem</h2>
        <p>Frame the problem in terms of lost capital, wasted engineer hours, or human frustration. Do not use generic market reports; highlight a sharp, unmistakable friction point.</p>

        <h2>Slide 2: Your Unfair Technological Advantage</h2>
        <p>Show what made this impossible to build 6 months ago that is now possible because of your architecture or new foundation models.</p>

        <h2>Slide 3: The 90-Second Working MVP</h2>
        <p>Demonstrate the interface solving the problem live with zero friction.</p>

        <h2>Slide 4: Traction, Team & Future Scale</h2>
        <p>Prove that your squad has the engineering chops and grit to turn this prototype into a sustainable company.</p>
      `
    },
    {
      id: "post-hackathon-scale",
      title: "Post-Hackathon Playbook: Turning a 48-Hour Prototype into a VC-Backed Startup",
      category: "Playbooks",
      readTime: "9 min read",
      date: "Oct 09, 2026",
      author: { name: "Sarah Al-Mansoor", initials: "SA", role: "Founder, NeuroMesh" },
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      excerpt: "What to do in the 7 days immediately after winning. Outreach email scripts to angel investors, customer interview workflows, and Y Combinator tips.",
      content: `
        <h2>The 72-Hour Momentum Window</h2>
        <p>When you place on the podium at a major hackathon, you have an unfair advantage: social proof, a working product, and media attention. However, this momentum evaporates within 7 days if you do not capitalize on it immediately.</p>

        <h3>Step 1: The Sunday Night Email Blast</h3>
        <p>Before leaving the venue, draft an update email to every judge, mentor, and investor you met. Include the live URL, the 180-second demo video, and a 2-sentence summary of your roadmap for next week.</p>

        <h3>Step 2: Securing 5 Design Partner Pilot Users</h3>
        <p>Do not rebuild the codebase yet. Spend Monday and Tuesday interviewing real potential users who experience the problem your hackathon project addressed. Offer free access in exchange for a 20-minute weekly feedback call.</p>

        <blockquote>"Over 60% of top YC startups built their initial v0 over a single weekend. A hackathon is not an end; it is the cheapest, most exhilarating customer discovery sprint in the world."</blockquote>
      `
    }
  ];

  // ==========================================================================
  // 4. BLOG DISCOVERY, SEARCH & REAL-TIME FILTERING
  // ==========================================================================
  const articlesGrid = document.getElementById('articles-grid');
  const searchInput = document.getElementById('blog-search');
  const searchFeedback = document.getElementById('search-feedback');
  const emptyState = document.getElementById('blog-empty-state');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const savedCountPill = document.getElementById('saved-count-pill');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  let activeCategory = 'All';
  let searchQuery = '';

  // LocalStorage for bookmarks
  function getSavedBookmarks() {
    try {
      return JSON.parse(localStorage.getItem('hackscale_saved_articles') || '[]');
    } catch {
      return [];
    }
  }

  function setSavedBookmarks(arr) {
    localStorage.setItem('hackscale_saved_articles', JSON.stringify(arr));
    updateSavedCount();
  }

  function updateSavedCount() {
    if (savedCountPill) {
      savedCountPill.textContent = getSavedBookmarks().length;
    }
  }

  function toggleBookmark(articleId) {
    let saved = getSavedBookmarks();
    if (saved.includes(articleId)) {
      saved = saved.filter(id => id !== articleId);
    } else {
      saved.push(articleId);
    }
    setSavedBookmarks(saved);
    renderArticles();
  }

  function renderArticles() {
    if (!articlesGrid) return;

    const saved = getSavedBookmarks();

    const filtered = ARTICLES.filter(art => {
      // Category match
      let matchesCat = true;
      if (activeCategory === 'Saved') {
        matchesCat = saved.includes(art.id);
      } else if (activeCategory !== 'All') {
        matchesCat = art.category.toLowerCase() === activeCategory.toLowerCase();
      }

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.author.name.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });

    // Feedback message
    if (searchQuery.trim()) {
      searchFeedback.textContent = `Showing ${filtered.length} notes matching "${searchQuery}"`;
    } else {
      searchFeedback.textContent = '';
    }

    if (filtered.length === 0) {
      articlesGrid.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    articlesGrid.innerHTML = filtered.map(art => {
      const isSaved = saved.includes(art.id);
      return `
        <article class="article-card" data-id="${art.id}">
          <div class="card-media">
            <img src="${art.image}" alt="${art.title}" loading="lazy" />
            <span class="card-category-badge">${art.category}</span>
            <button class="card-bookmark-btn ${isSaved ? 'saved' : ''}" 
                    aria-label="${isSaved ? 'Remove bookmark' : 'Bookmark note'}"
                    onclick="window.hackScaleApp.toggleBookmark('${art.id}', event)">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>
          <div class="card-body">
            <div class="card-meta-top">
              <span>📅 ${art.date}</span>
              <span>•</span>
              <span>⏱ ${art.readTime}</span>
            </div>
            <h3>${art.title}</h3>
            <p>${art.excerpt}</p>
            <div class="card-footer">
              <div class="card-author">
                <span class="author-img">${art.author.initials}</span>
                <span class="author-name">${art.author.name}</span>
              </div>
              <button class="read-btn" onclick="window.hackScaleApp.openModal('${art.id}')">
                Read Guide <span>→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderArticles();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderArticles();
    });
  }

  // Clear search button in empty state
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      activeCategory = 'All';
      filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'All'));
      renderArticles();
    });
  }

  // ==========================================================================
  // 5. ARTICLE FULL READING MODAL
  // ==========================================================================
  const articleModal = document.getElementById('article-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-article-content');

  function openArticleModal(articleId) {
    const article = ARTICLES.find(a => a.id === articleId);
    if (!article || !articleModal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-meta">
        <span><strong>Track:</strong> ${article.category}</span>
        <span>•</span>
        <span><strong>Author:</strong> ${article.author.name} (${article.author.role})</span>
        <span>•</span>
        <span><strong>Published:</strong> ${article.date}</span>
      </div>
      <h2>${article.title}</h2>
      ${article.content}
    `;

    articleModal.classList.add('open');
    articleModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('open');
    articleModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeArticleModal);
  }

  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) {
        closeArticleModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articleModal && articleModal.classList.contains('open')) {
      closeArticleModal();
    }
  });

  // ==========================================================================
  // 6. INTERACTIVE SANDBOX TABS (#demo)
  // ==========================================================================
  const sandboxTabs = document.querySelectorAll('.s-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  sandboxTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      sandboxTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Tab 1: Sprint Kanban interactive task addition
  const addTaskBtn = document.getElementById('kanban-add-task');
  const todoCol = document.getElementById('col-todo');

  if (addTaskBtn && todoCol) {
    addTaskBtn.addEventListener('click', () => {
      const taskNames = [
        "Hook up ElevenLabs voice feedback loop",
        "Add judge score badge to README.md",
        "Configure SSL cert & custom subdomain",
        "Implement rate limit throttling for demo keys",
        "Record 30-second live demo backup GIF"
      ];
      const randomTask = taskNames[Math.floor(Math.random() * taskNames.length)];
      const taskEl = document.createElement('div');
      taskEl.className = 'k-task';
      taskEl.innerHTML = `
        <div class="k-tag tag-core">Sprint Auto</div>
        <h5>${randomTask}</h5>
        <div class="k-meta"><span>Assignee: You</span><span>#dev-new</span></div>
      `;
      todoCol.prepend(taskEl);

      addTaskBtn.textContent = '✓ Added!';
      setTimeout(() => {
        addTaskBtn.textContent = '+ Add Task';
      }, 1200);
    });
  }

  // Tab 2: Judge Rubric Scoring Simulator
  const rubricInnov = document.getElementById('rubric-innov');
  const rubricTech = document.getElementById('rubric-tech');
  const rubricDesign = document.getElementById('rubric-design');
  const rubricPitch = document.getElementById('rubric-pitch');

  const innovVal = document.getElementById('innov-val');
  const techVal = document.getElementById('tech-val');
  const designVal = document.getElementById('design-val');
  const pitchVal = document.getElementById('pitch-val');

  const totalScoreEl = document.getElementById('total-score');
  const scoreMeter = document.getElementById('score-meter');
  const scoreTierBadge = document.getElementById('score-tier-badge');
  const scoreFeedback = document.getElementById('score-feedback');

  function calculateScore() {
    if (!rubricInnov || !rubricTech || !rubricDesign || !rubricPitch) return;

    const vInnov = parseInt(rubricInnov.value, 10);
    const vTech = parseInt(rubricTech.value, 10);
    const vDesign = parseInt(rubricDesign.value, 10);
    const vPitch = parseInt(rubricPitch.value, 10);

    if (innovVal) innovVal.textContent = `${vInnov} / 30`;
    if (techVal) techVal.textContent = `${vTech} / 30`;
    if (designVal) designVal.textContent = `${vDesign} / 20`;
    if (pitchVal) pitchVal.textContent = `${vPitch} / 20`;

    const total = vInnov + vTech + vDesign + vPitch;
    if (totalScoreEl) totalScoreEl.textContent = total;

    // 314 is circumference of r=50 circle
    if (scoreMeter) {
      const offset = 314 - (314 * (total / 100));
      scoreMeter.style.strokeDashoffset = offset;
    }

    if (scoreTierBadge && scoreFeedback) {
      if (total >= 90) {
        scoreTierBadge.textContent = "🏆 PODIUM FAVORITE (TOP 1%)";
        scoreTierBadge.style.color = "#67e8f9";
        scoreTierBadge.style.background = "rgba(6, 182, 212, 0.2)";
        scoreFeedback.textContent = "Outstanding submission. Your technical depth and high polish place your team squarely in contention for Grand Prize and Sponsor Track Bounties.";
      } else if (total >= 75) {
        scoreTierBadge.textContent = "🥈 FINALIST CONTENDER (TOP 10%)";
        scoreTierBadge.style.color = "#a78bfa";
        scoreTierBadge.style.background = "rgba(124, 58, 237, 0.2)";
        scoreFeedback.textContent = "Solid project. Strengthen the live demo and clarify your 30-second problem statement to push your score into 1st place contention.";
      } else {
        scoreTierBadge.textContent = "⚡ NEEDS ITERATION";
        scoreTierBadge.style.color = "#fbbf24";
        scoreTierBadge.style.background = "rgba(245, 158, 11, 0.2)";
        scoreFeedback.textContent = "High potential, but missing key polish or live working endpoints. Ensure your public deployment doesn't return 404s during judge review.";
      }
    }
  }

  [rubricInnov, rubricTech, rubricDesign, rubricPitch].forEach(input => {
    if (input) input.addEventListener('input', calculateScore);
  });
  calculateScore();

  // Tab 3: Sponsor API Playground
  const apiBtns = document.querySelectorAll('.api-btn');
  const codeSnippetTitle = document.getElementById('code-snippet-title');
  const apiCodeDisplay = document.getElementById('api-code-display');
  const apiResponseOutput = document.getElementById('api-response-output');
  const copyApiCodeBtn = document.getElementById('copy-api-code');
  const runApiBtn = document.getElementById('run-api-btn');

  const API_TEMPLATES = {
    gemini: {
      filename: "gemini-service.ts",
      code: `// Initializing Gemini 2.5 Multimodal Client
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeHackathonIdea(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { temperature: 0.7, maxOutputTokens: 800 }
  });
  return response.text;
}`,
      response: `{
  "status": 200,
  "service": "Google Gemini 2.5 Flash",
  "latencyMs": 38,
  "analysis": {
    "viability": "9.6/10",
    "uniqueDifferentiator": "Real-time edge telemetry with automated prompt caching",
    "recommendedBounties": ["Google Cloud AI Track", "Best Multimodal Hack"]
  }
}`
    },
    polygon: {
      filename: "polygon-verify.ts",
      code: `// Instant Polygon zkEVM Attestation
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export async function stampMilestone(sprintHash: string) {
  const tx = await wallet.sendTransaction({
    to: "0xHackathonRegistryContract...",
    data: ethers.hexlify(ethers.toUtf8Bytes(sprintHash))
  });
  await tx.wait(1);
  return tx.hash;
}`,
      response: `{
  "status": 200,
  "network": "Polygon zkEVM Testnet",
  "blockNumber": 1492084,
  "txHash": "0x8a4b3d8f1e92c01a9b2d8e4f1a2b3c4d5e6f7a8b",
  "gasUsed": "21,400 Gwei",
  "bountyEligibility": "Verified 100%"
}`
    },
    supabase: {
      filename: "supabase-vector.ts",
      code: `// Hybrid Vector & Relational Query
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function matchFieldNotes(queryEmbedding: number[]) {
  return await supabase.rpc('match_articles', {
    query_embedding: queryEmbedding,
    match_threshold: 0.82,
    match_count: 3
  });
}`,
      response: `{
  "status": 200,
  "vectorIndex": "HNSW (1536 dims)",
  "retrievalLatency": "18ms",
  "matchesFound": 3,
  "topSimilarity": 0.941
}`
    },
    eleven: {
      filename: "elevenlabs-voice.ts",
      code: `// Real-Time Demo Audio Synthesizer
import { ElevenLabsClient } from 'elevenlabs';

const client = new ElevenLabsClient({ apiKey: process.env.ELEVEN_API_KEY });

export async function streamDemoAudio(script: string) {
  return await client.generate({
    voice: "Rachel",
    model_id: "eleven_turbo_v2_5",
    text: script
  });
}`,
      response: `{
  "status": 200,
  "streamRate": "44.1kHz PCM",
  "model": "eleven_turbo_v2_5",
  "timeToFirstByte": "92ms",
  "accessibilityTrackReady": true
}`
    }
  };

  let currentApi = 'gemini';

  apiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      apiBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentApi = btn.getAttribute('data-api');

      const template = API_TEMPLATES[currentApi];
      if (template) {
        if (codeSnippetTitle) codeSnippetTitle.textContent = template.filename;
        if (apiCodeDisplay) apiCodeDisplay.textContent = template.code;
        if (apiResponseOutput) apiResponseOutput.textContent = template.response;
      }
    });
  });

  if (copyApiCodeBtn && apiCodeDisplay) {
    copyApiCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(apiCodeDisplay.textContent).then(() => {
        copyApiCodeBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyApiCodeBtn.textContent = 'Copy Code'; }, 1500);
      });
    });
  }

  if (runApiBtn && apiResponseOutput) {
    runApiBtn.addEventListener('click', () => {
      apiResponseOutput.textContent = '// Sending request to ' + currentApi.toUpperCase() + ' edge node...\n// Awaiting streaming JSON payload...';
      setTimeout(() => {
        const template = API_TEMPLATES[currentApi];
        if (template) apiResponseOutput.textContent = template.response;
      }, 400);
    });
  }

  // Tab 4: 3-Min Pitch Preview Carousel
  const pitchSlides = document.querySelectorAll('.pitch-slide');
  const slideDots = document.querySelectorAll('.s-dot');
  const prevSlideBtn = document.getElementById('prev-slide');
  const nextSlideBtn = document.getElementById('next-slide');

  let currentSlide = 1;
  const totalSlides = pitchSlides.length;

  function setSlide(n) {
    if (n < 1) n = totalSlides;
    if (n > totalSlides) n = 1;
    currentSlide = n;

    pitchSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', (idx + 1) === currentSlide);
    });

    slideDots.forEach((dot, idx) => {
      dot.classList.toggle('active', (idx + 1) === currentSlide);
    });
  }

  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => setSlide(currentSlide - 1));
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => setSlide(currentSlide + 1));
  slideDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.getAttribute('data-dot'), 10);
      setSlide(target);
    });
  });

  // ==========================================================================
  // 7. HERO SPRINT CONSOLE INTERACTION
  // ==========================================================================
  const pingBtn = document.getElementById('console-ping-btn');
  const terminalStream = document.getElementById('terminal-stream');
  const sprintCountdown = document.getElementById('sprint-countdown');

  // Simulated countdown timer
  if (sprintCountdown) {
    let totalSecs = 36 * 3600 + 42 * 60 + 19;
    setInterval(() => {
      totalSecs = Math.max(0, totalSecs - 1);
      const h = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
      const s = String(totalSecs % 60).padStart(2, '0');
      sprintCountdown.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  // Ping button simulates team event
  if (pingBtn && terminalStream) {
    pingBtn.addEventListener('click', () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const commits = [
        "[DEPLOY] Edge preview container rebuilt in 410ms.",
        "[AGENT] Tool call verified: vector memory fetched 4 results.",
        "[DEVPOST] README generated with live sponsor architecture diagrams.",
        "[TESTS] 24/24 unit & integration assertions passing."
      ];
      const commit = commits[Math.floor(Math.random() * commits.length)];

      const newLine = document.createElement('div');
      newLine.className = 't-line active-line';
      newLine.innerHTML = `<span class="t-time">${timeStr}</span> <span class="t-tag">[LIVE]</span> ${commit}`;
      terminalStream.appendChild(newLine);
      terminalStream.scrollTop = terminalStream.scrollHeight;

      pingBtn.textContent = '⚡ Commit Pushed!';
      setTimeout(() => {
        pingBtn.textContent = '⚡ Simulate Commit';
      }, 1200);
    });
  }

  // ==========================================================================
  // 8. CONTACT FORM DISPATCH
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      formStatus.textContent = 'Transmitting dispatch to HackScale War Room mentors...';

      setTimeout(() => {
        contactForm.reset();
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '✓ Message received! A veteran hackathon mentor has been dispatched to your email.';
        if (submitBtn) submitBtn.disabled = false;

        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 1000);
    });
  }

  // ==========================================================================
  // 9. INITIAL RENDER & GLOBAL APP EXPORTS
  // ==========================================================================
  updateSavedCount();
  renderArticles();

  window.hackScaleApp = {
    openModal: openArticleModal,
    closeModal: closeArticleModal,
    toggleBookmark: (id, e) => {
      if (e) e.stopPropagation();
      toggleBookmark(id);
    }
  };

});
