import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an expert full-stack developer who creates complete web applications based on user requests.

When a user asks you to create an app, you should:
1. Analyze what type of app they want
2. Generate all necessary files for a complete working application
3. Include HTML, CSS, and JavaScript files
4. Make the app functional and well-styled
5. Use modern web development practices

IMPORTANT: Return ONLY a valid JSON object, no markdown formatting or code blocks.

Output format (return exactly this structure):
{
  "appName": "name-of-the-app",
  "description": "Brief description of what the app does",
  "files": [
    {
      "filename": "index.html",
      "content": "HTML content here"
    },
    {
      "filename": "style.css", 
      "content": "CSS content here"
    },
    {
      "filename": "script.js",
      "content": "JavaScript content here"
    }
  ]
}

Make sure the app is:
- Fully functional
- Responsive and mobile-friendly
- Well-styled with modern CSS
- Uses semantic HTML
- Has proper error handling in JavaScript
- Includes comments in the code

For different types of apps, include appropriate features:
- Todo App: Add, edit, delete, mark complete, local storage
- Weather App: Location input, API integration, weather display
- Calculator: Basic arithmetic operations, clear function
- Timer/Stopwatch: Start, stop, reset, time display
- Notes App: Create, edit, delete, save notes locally
- Quiz App: Questions, scoring, results display
- Counter App: Increment, decrement, reset
- Color Picker: Color selection, hex/rgb display, copy functionality

Return only the JSON object without any markdown formatting.
`;

// Forbidden keywords/flags for user prompts
const FORBIDDEN_KEYWORDS = [
  'sudo', '--force', '-f', 'rm ', 'del ', 'shutdown', 'reboot', 'mkfs', ':(){', 'fork', 'dd ', 'chmod 777', 'chown', '>', '2>', '|', '&', ';'
];

function isPromptSafe(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  return !FORBIDDEN_KEYWORDS.some(keyword => lowerPrompt.includes(keyword));
}

async function createApp(userPrompt) {
  if (!isPromptSafe(userPrompt)) {
    console.error('❌ Unsafe or forbidden command detected in your request.');
    console.log('⚠️  Please avoid using dangerous commands or flags like "sudo", "-f", "rm", etc.');
    return {
      success: false,
      error: 'Unsafe command detected'
    };
  }
  try {
    console.log(`\n🚀 Creating app based on: "${userPrompt}"`);
    console.log('⏳ Generating files...\n');

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      responseFormat: { type: 'json_object' },
      contents: [
        { 
          role: 'user', 
          parts: [{ text: SYSTEM_PROMPT + '\n\nUser Request: ' + userPrompt }] 
        }
      ]
    });

    // Clean the response text to extract JSON from markdown code blocks
    let responseText = response.text;
    
    // Remove markdown code blocks if present
    if (responseText.includes('```json')) {
      responseText = responseText.replace(/```json\s*/, '').replace(/```\s*$/, '');
    } else if (responseText.includes('```')) {
      responseText = responseText.replace(/```\s*/, '').replace(/```\s*$/, '');
    }
    
    // Trim whitespace
    responseText = responseText.trim();
    
    const result = JSON.parse(responseText);
    
    // Create project folder
    const projectName = result.appName || 'my-app';
    const projectPath = path.join('./projects', projectName);
    
    // Create directories if they don't exist
    if (!fs.existsSync('./projects')) {
      fs.mkdirSync('./projects');
    }
    
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    // Create files
    console.log(`📁 Creating project: ${projectName}`);
    console.log(`📂 Project path: ${projectPath}\n`);

    for (const file of result.files) {
      const filePath = path.join(projectPath, file.filename);
      fs.writeFileSync(filePath, file.content);
      console.log(`✅ Created: ${file.filename}`);
    }

    // Create a README file
    const readme = `# ${result.appName}

${result.description}

## How to Run
1. Open \`index.html\` in your web browser
2. Or use a local server like Live Server in VS Code

## Files
${result.files.map(f => `- \`${f.filename}\``).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
`;

    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
    console.log(`✅ Created: README.md`);

    console.log(`\n🎉 App "${projectName}" created successfully!`);
    console.log(`📍 Location: ${projectPath}`);
    console.log(`🌐 Open ${path.join(projectPath, 'index.html')} in your browser to view the app\n`);

    return {
      success: true,
      projectName,
      projectPath,
      files: result.files.map(f => f.filename)
    };

  } catch (error) {
    console.error('❌ Error creating app:', error.message);
    console.log('🔍 Response text preview:', response?.text?.substring(0, 200) + '...');
    return {
      success: false,
      error: error.message
    };
  }
}

// Interactive CLI function
async function startInteractiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🤖 AI App Generator Started!');
  console.log('💡 Examples: "create a todo app", "create a weather app", "create a calculator"');
  console.log('❌ Type "exit" to quit\n');

  const askQuestion = () => {
    rl.question('👤 What app would you like to create? ', async (answer) => {
      if (answer.toLowerCase() === 'exit' || answer.toLowerCase() === 'quit' || answer.toLowerCase() === 'q') {
        console.log('👋 Goodbye!');
        rl.close();
        return;
      }

      if (answer.trim()) {
        await createApp(answer);
      } else {
        console.log('⚠️  Please enter a valid app description');
      }

      console.log('─'.repeat(50));
      askQuestion();
    });
  };

  askQuestion();
}

// Example usage function
async function runExamples() {
  const examples = [
    'create a todo app with dark mode',
    'create a simple calculator',
    'create a weather dashboard',
    'create a notes app with categories'
  ];

  console.log('🔥 Running example app generations...\n');

  for (const example of examples) {
    await createApp(example);
    console.log('─'.repeat(50));
    // Add a small delay between generations
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Export functions for use in other modules
export { createApp, startInteractiveMode, runExamples };

// Main execution
async function main() {
  // Check if API key is set
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    console.log('💡 Please add GEMINI_API_KEY to your .env file');
    return;
  }

  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    const command = args.join(' ');
    if (command === '--interactive' || command === '-i') {
      await startInteractiveMode();
    } else if (command === '--examples') {
      await runExamples();
    } else {
      await createApp(command);
    }
  } else {
    // Default: start interactive mode
    await startInteractiveMode();
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}