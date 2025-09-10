class CodeBanner {
    constructor() {
        this.name = "Jane Developer";
        this.title = "Senior Software Engineer";
        this.tagline = "Coding the future, one line at a time";
        this.bgColor = "#0a0f17";
        this.textColor = "#00c9ff";
        this.theme = "default";
        this.phraseCount = 8;
        this.exportFormat = "png";
        this.bannerElement = document.getElementById('banner');
        this.codeElements = [];
        this.usedPositions = [];
        this.programmingPhrases = [];
    }
    
    async initialize() {
        await this.loadPhrases();
        this.setupEventListeners();
        this.updateFromUI();
        this.generate();
    }
    
    async loadPhrases() {
        try {
            const response = await fetch('phrases.json');
            const data = await response.json();
            this.programmingPhrases = data.phrases;
        } catch (error) {
            // Fallback phrases if phrases.json is not available
            this.programmingPhrases = [
                "const solution = (problem) => solve(problem);",
                "def code_elegantly(): return beautiful_code",
                "public class Success { private HardWork hardWork; }",
                "function createFuture() { while(true) { innovate(); } }",
                "while(!succeed) { tryAgain(); }",
                "let innovation = creativity + execution;",
                "async function achieveGoals() { await workHard(); }",
                "const createValue = (skills, passion) => success;",
                "class Developer extends ProblemSolver {}",
                "const efficientAlgorithm = (data) => data.process();",
                "const debug = () => { console.log('Fixed it!'); };",
                "const deploySolution = () => { return 'Production ready!'; };",
                "const optimize = (code) => code.refactor();",
                "const learnNewTech = () => { while(true) { study(); } };",
                "const collaborate = (team) => team.achieveGoals();"
            ];
        }
    }
    
    setupEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.updateFromUI();
            this.generate();
        });
        
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.download();
        });
        
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
                this.theme = option.getAttribute('data-theme');
                this.applyTheme();
                this.generate();
            });
        });
        
        document.querySelectorAll('.format-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.format-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
                this.exportFormat = option.getAttribute('data-format');
            });
        });
        
        document.getElementById('name').addEventListener('input', (e) => {
            document.getElementById('preview-name').textContent = e.target.value;
        });
        
        document.getElementById('title').addEventListener('input', (e) => {
            document.getElementById('preview-title').textContent = e.target.value;
        });
        
        document.getElementById('tagline').addEventListener('input', (e) => {
            document.getElementById('preview-tagline').textContent = e.target.value;
        });
        
        const phraseCountSlider = document.getElementById('phraseCount');
        const phraseCountValue = document.getElementById('phraseCountValue');
        
        phraseCountSlider.addEventListener('input', (e) => {
            this.phraseCount = parseInt(e.target.value);
            phraseCountValue.textContent = this.phraseCount;
        });
    }
    
    updateFromUI() {
        this.name = document.getElementById('name').value;
        this.title = document.getElementById('title').value;
        this.tagline = document.getElementById('tagline').value;
        this.bgColor = document.getElementById('bgColor').value;
        this.textColor = document.getElementById('textColor').value;
        this.phraseCount = parseInt(document.getElementById('phraseCount').value);
    }
    
    applyTheme() {
        switch(this.theme) {
            case 'matrix':
                this.bgColor = '#001100';
                this.textColor = '#00ff66';
                break;
            case 'ocean':
                this.bgColor = '#001f3f';
                this.textColor = '#7FDBFF';
                break;
            case 'sunset':
                this.bgColor = '#331100';
                this.textColor = '#ff9900';
                break;
            default:
                this.bgColor = '#0a0f17';
                this.textColor = '#00c9ff';
        }
        
        document.getElementById('bgColor').value = this.bgColor;
        document.getElementById('textColor').value = this.textColor;
    }
    
    generate() {
        this.codeElements.forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        this.codeElements = [];
        this.usedPositions = [];
        
        this.bannerElement.style.backgroundColor = this.bgColor;
        
        document.querySelectorAll('.profile-info > *').forEach(el => {
            el.style.color = this.textColor;
        });
        
        this.addCodeElements();
    }
    
    addCodeElements() {
        this.reserveProfileArea();
        
        const bannerWidth = this.bannerElement.offsetWidth;
        const bannerHeight = this.bannerElement.offsetHeight;
        
        for (let i = 0; i < this.phraseCount; i++) {
            const phrase = this.programmingPhrases[
                Math.floor(Math.random() * this.programmingPhrases.length)
            ];
            
            const element = document.createElement('div');
            element.className = 'code-element';
            element.textContent = phrase;
            
            const position = this.findNonOverlappingPosition(phrase, bannerWidth, bannerHeight);
            
            if (!position) {
                continue;
            }
            
            element.style.left = position.x + 'px';
            element.style.top = position.y + 'px';
            element.style.opacity = 0.15 + Math.random() * 0.2;
            element.style.fontSize = (10 + Math.random() * 6) + 'px';
            element.style.color = this.textColor;
            
            this.bannerElement.appendChild(element);
            this.codeElements.push(element);
            
            this.usedPositions.push({
                x: position.x,
                y: position.y,
                width: element.offsetWidth,
                height: element.offsetHeight
            });
        }
    }
    
    reserveProfileArea() {
        const profileInfo = document.querySelector('.profile-info');
        const rect = profileInfo.getBoundingClientRect();
        const bannerRect = this.bannerElement.getBoundingClientRect();
        
        const profileArea = {
            x: rect.left - bannerRect.left,
            y: rect.top - bannerRect.top,
            width: rect.width * 1.5,
            height: rect.height * 2
        };
        
        this.usedPositions.push(profileArea);
    }
    
    findNonOverlappingPosition(phrase, bannerWidth, bannerHeight) {
        const maxAttempts = 100;
        let attempts = 0;
        
        const tempElement = document.createElement('div');
        tempElement.className = 'code-element';
        tempElement.textContent = phrase;
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.style.whiteSpace = 'nowrap';
        document.body.appendChild(tempElement);
        
        const textWidth = tempElement.offsetWidth;
        const textHeight = tempElement.offsetHeight;
        
        document.body.removeChild(tempElement);
        
        while (attempts < maxAttempts) {
            const x = Math.random() * (bannerWidth - textWidth);
            const y = Math.random() * (bannerHeight - textHeight);
            
            let overlaps = false;
            for (const used of this.usedPositions) {
                if (this.checkOverlap(x, y, textWidth, textHeight, used.x, used.y, used.width, used.height)) {
                    overlaps = true;
                    break;
                }
            }
            
            if (!overlaps) {
                return { x, y };
            }
            
            attempts++;
        }
        
        return null;
    }
    
    checkOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    }
    
    download() {
        document.getElementById('loading').style.display = 'flex';
        
        setTimeout(() => {
            // Capture the exact preview element
            html2canvas(this.bannerElement, {
                backgroundColor: this.bgColor,
                width: this.bannerElement.offsetWidth,
                height: this.bannerElement.offsetHeight,
                scale: 1
            }).then(canvas => {
                // Create a new canvas with LinkedIn dimensions
                const linkedinCanvas = document.createElement('canvas');
                linkedinCanvas.width = 1584;
                linkedinCanvas.height = 396;
                const ctx = linkedinCanvas.getContext('2d');
                
                // Fill with background color
                ctx.fillStyle = this.bgColor;
                ctx.fillRect(0, 0, 1584, 396);
                
                // Calculate scaling factors
                const scaleX = 1584 / canvas.width;
                const scaleY = 396 / canvas.height;
                const scale = Math.min(scaleX, scaleY);
                
                // Calculate position to center the scaled preview
                const scaledWidth = canvas.width * scale;
                const scaledHeight = canvas.height * scale;
                const offsetX = (1584 - scaledWidth) / 2;
                const offsetY = (396 - scaledHeight) / 2;
                
                // Draw the scaled preview onto the LinkedIn canvas
                ctx.drawImage(canvas, offsetX, offsetY, scaledWidth, scaledHeight);
                
                // Create download link
                const link = document.createElement('a');
                link.download = `linkedin-banner.${this.exportFormat}`;
                
                if (this.exportFormat === 'jpeg') {
                    link.href = linkedinCanvas.toDataURL('image/jpeg', 0.9);
                } else {
                    link.href = linkedinCanvas.toDataURL('image/png');
                }
                
                link.click();
                document.getElementById('loading').style.display = 'none';
            }).catch(error => {
                console.error('Error generating banner:', error);
                document.getElementById('loading').style.display = 'none';
            });
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const banner = new CodeBanner();
    banner.initialize();
});