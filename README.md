# LinkedIn-Banner-Generator

A simple tool to automatically generate a LinkedIn banner with dynamic phrases.

## Features

- Instantly preview a banner by running `index.html`
- Easily customize the banner phrases through `phrases.json`
- Simple, intuitive interface with live updates
- **Note:** Export functionality is currently a bit unreliable — known to be "funky." Improvements are planned for future versions.

---

## Usage

### 1. Clone the repository
```bash
git clone https://github.com/Aarav-g123/LinkedIn-Banner-Generator.git
cd LinkedIn-Banner-Generator
```

### 2. Run the tool
Open the `index.html` file in your browser. You can:
- Double-click `index.html`, or
- Run `open index.html` (macOS), or
- Drag and drop the file into your browser window.

### 3. Customize phrases
Edit `phrases.json` to change the banner text. Each entry follows this format:

```json
{
  "text": "Your catchy phrase here",
  "style": {
    "fontSize": "36px",
    "color": "#000000"
  }
}
```

- `"text"`: The phrase displayed on the banner.
- `"style"`: CSS-like properties to control appearance.

### 4. Export the banner
Click the **Export** button to save your banner as an image.  
⚠️ **Known issue:** Exporting can be inconsistent right now. A more stable solution is planned.

---

## Development & Roadmap

- Improve export functionality for reliable results.
- Add more customization options (backgrounds, fonts, layout controls).
- Potential future features: multi-language support, templates, batch phrase loading.

---

## Contributing

1. Fork the repo.
2. Create a feature branch:
   ```bash
   git checkout -b feature/improve-export
   ```
3. Make your changes and commit:
   ```bash
   git commit -am "Improve export process"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/improve-export
   ```
5. Open a Pull Request.
