# 🤖 Mini Cursor

> Transform your ideas into complete web applications with the power of AI

An intelligent tool that uses Google's Gemini AI to generate fully functional web applications from simple text prompts. Just describe what you want, and watch as complete HTML, CSS, and JavaScript files are created for you.

## ✨ Features

- 🎯 **AI-Powered Generation** - Uses Google Gemini 2.0 Flash for intelligent app creation
- 🌐 **Complete Applications** - Generates HTML, CSS, and JavaScript files
- 📱 **Responsive Design** - All apps are mobile-friendly and modern
- 💾 **Local Storage** - Apps include data persistence where appropriate
- 🛡️ **Security First** - Built-in safety checks for malicious commands
- 🎨 **Modern UI/UX** - Beautiful, professional-looking applications
- 📁 **Organized Output** - Clean project structure with documentation
- 🔄 **Multiple Modes** - Interactive CLI, command-line, or programmatic usage

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone or download the script**


2. **Install dependencies**
```bash
npm install @google/genai dotenv
```

3. **Set up environment**
```bash
# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

4. **Run the generator**
```bash
node app-generator.js
```

## 🎮 Usage

### Interactive Mode (Default)
The easiest way to use the generator:

```bash
node app-generator.js
```

This starts an interactive session where you can create multiple apps:

```
🤖 AI App Generator Started!
💡 Examples: "create a todo app", "create a weather app", "create a calculator"
❌ Type "exit" to quit

👤 What app would you like to create? create a todo app with dark mode
```

### Command Line Mode
Create apps directly from the command line:

```bash
# Single app generation
node app-generator.js create a weather dashboard

# Run predefined examples
node app-generator.js --examples

# Interactive mode (explicit)
node app-generator.js --interactive
```

### Programmatic Usage
Use in your own Node.js projects:

```javascript
import { createApp } from './app-generator.js';

const result = await createApp('create a calculator with history');

if (result.success) {
  console.log(`App created at: ${result.projectPath}`);
} else {
  console.error(`Error: ${result.error}`);
}
```

## 💡 Example Prompts

### Basic Apps
```
create a todo app
create a calculator
create a notes app
create a timer app
create a color picker
```

### Advanced Features
```
create a todo app with dark mode and categories
create a weather app with 5-day forecast
create a calculator with scientific functions
create a notes app with markdown support
create a habit tracker with streak counter
```

### Specific Styling
```
create a minimalist todo app
create a colorful quiz app for kids
create a professional expense tracker
create a modern portfolio website
create a retro-style game
```

### API Integration
```
create a weather app using OpenWeatherMap API
create a news reader with RSS feeds
create a currency converter with live rates
create a recipe finder with meal API
```

## 📁 Project Structure

Each generated app follows this structure:

```
projects/
├── your-app-name/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styling and responsive design
│   ├── script.js       # JavaScript functionality
│   └── README.md       # App documentation
├── another-app/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
└── ...
```

## 🛠️ Supported App Types

| App Type | Features | Example Prompt |
|----------|----------|----------------|
| **Todo/Task Apps** | Add, edit, delete, mark complete, categories, local storage | `create a todo app with priorities` |
| **Weather Apps** | Location input, forecasts, current conditions, maps | `create a weather dashboard` |
| **Calculators** | Basic to scientific operations, history, memory | `create a scientific calculator` |
| **Notes Apps** | Create, edit, save, categories, search, markdown | `create a notes app with tags` |
| **Timers** | Countdown, stopwatch, multiple timers, alerts | `create a pomodoro timer` |
| **Games** | Memory games, quizzes, puzzles, arcade-style | `create a memory matching game` |
| **Utilities** | Color pickers, converters, generators, tools | `create a password generator` |
| **Dashboards** | Data visualization, charts, metrics, analytics | `create a fitness tracking dashboard` |

## 🎨 Generated App Features

Every generated app includes:

- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern CSS** - Flexbox/Grid layouts, animations, hover effects
- ✅ **Semantic HTML** - Proper structure and accessibility
- ✅ **Error Handling** - Graceful error management in JavaScript
- ✅ **Local Storage** - Data persistence where applicable
- ✅ **Clean Code** - Well-commented and organized
- ✅ **Cross-Browser** - Compatible with modern browsers

## 🔒 Security Features

The generator includes built-in security measures:

- **Command Filtering** - Blocks dangerous system commands
- **Input Validation** - Sanitizes user prompts
- **Safe File Operations** - Prevents directory traversal
- **No External Dependencies** - Generated apps use vanilla JavaScript

### Blocked Keywords
The system automatically rejects prompts containing:
- System commands (`sudo`, `rm`, `chmod`, etc.)
- Dangerous operators (`>`, `|`, `&`, `;`)
- Potentially harmful flags (`--force`, `-f`)

## 🎯 Tips for Better Results

### 🎨 For Better Design
```
"create a modern todo app with dark mode"
"create a minimalist calculator"
"create a colorful kids' game"
```

### ⚡ For More Features
```
"create a todo app with categories and due dates"
"create a weather app with maps and alerts"
"create a notes app with search and export"
```

### 🛠️ For Specific Functionality
```
"create a calculator with history and memory"
"create a timer with custom sounds"
"create a color picker with palette saving"
```

### 📱 For Better UX
```
"create a mobile-friendly todo app"
"create a touch-optimized drawing app"
"create an accessible quiz app"
```

## 🐛 Troubleshooting

### API Key Issues
```bash
❌ GEMINI_API_KEY not found in environment variables
```
**Solution:** 
1. Create a `.env` file in your project root
2. Add your API key: `GEMINI_API_KEY=your_key_here`
3. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### JSON Parsing Errors
```bash
❌ Error creating app: Unexpected token
```
**Solution:** The script automatically handles this, but if it persists:
1. Check your internet connection
2. Verify your API key is valid
3. Try a simpler prompt first

### File Permission Errors
```bash
❌ Error: EACCES: permission denied
```
**Solution:**
1. Run from a directory you have write access to
2. On Unix systems: `chmod +w .`
3. On Windows: Run as administrator if needed

### App Not Working
**Problem:** Generated app doesn't function properly
**Solution:**
1. Open browser developer tools (F12)
2. Check console for JavaScript errors
3. Ensure you're opening `index.html` in a modern browser
4. Some features may require a local server (use Live Server in VS Code)

## 📊 Example Outputs

### Todo App Features
- ✅ Add/edit/delete tasks
- ✅ Mark tasks as complete
- ✅ Category/priority system
- ✅ Local storage persistence
- ✅ Search and filter
- ✅ Dark/light mode toggle

### Weather App Features
- 🌤️ Current weather display
- 📅 5-day forecast
- 📍 Location detection
- 🗺️ Weather maps
- 🌡️ Temperature units toggle
- 💾 Favorite locations

### Calculator Features
- 🔢 Basic arithmetic operations
- 📊 Scientific functions
- 📚 Calculation history
- 💾 Memory functions
- ⌨️ Keyboard support
- 📱 Mobile-friendly interface

## 🚀 Advanced Usage

### Batch Generation
Create multiple apps at once:

```javascript
import { createApp } from './app-generator.js';

const apps = [
  'create a todo app',
  'create a calculator', 
  'create a notes app'
];

for (const prompt of apps) {
  await createApp(prompt);
}
```

### Custom Configuration
Modify the system prompt for specialized apps:

```javascript
// Add your own instructions to SYSTEM_PROMPT
const customPrompt = SYSTEM_PROMPT + '\nAlways include accessibility features.';
```

### Integration with Build Tools
Use with your existing workflow:

```json
{
  "scripts": {
    "generate-app": "node app-generator.js",
    "build-all": "npm run generate-app && npm run build"
  }
}
```

## 📝 API Reference

### `createApp(prompt)`
Generates a complete web application from a text prompt.

**Parameters:**
- `prompt` (string) - Description of the app to create

**Returns:**
```javascript
{
  success: boolean,
  projectName: string,
  projectPath: string, 
  files: string[],
  error?: string
}
```

### `startInteractiveMode()`
Starts the interactive CLI interface.

### `runExamples()`
Generates a set of example applications.

## 🤝 Contributing

Contributions are welcome! Here are some ways to help:

- 🐛 Report bugs or issues
- 💡 Suggest new app types or features
- 🎨 Improve the generated app templates
- 📚 Enhance documentation
- 🧪 Add test cases

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 What's Next?

Planned features:
- 🎨 Custom themes and styling options
- 🔌 Plugin system for extending functionality
- 🌐 Framework support (React, Vue, etc.)
- 📦 Package.json generation with dependencies
- 🚀 One-click deployment options
- 🤖 AI-powered app improvements and refactoring

---

**Ready to turn your ideas into reality? Start generating apps now!**

```bash
node app-generator.js
```

*Made with ❤️ and AI*