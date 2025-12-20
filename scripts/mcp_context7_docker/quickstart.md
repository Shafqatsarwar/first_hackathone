# Quickstart Guide: Physical AI & Humanoid Robotics Textbook with Context7 MCP

## Prerequisites

1. Node.js and npm installed
2. Qwen CLI installed (version 0.5.0 or higher)
3. Upstash account with Context7 access

## Setup

1. **Get your Context7 API Key:**
   - Sign up at Upstash
   - Create a new Context7 instance
   - Copy your API key

2. **Configure environment:**
   ```bash
   # Update the .env file with your API key
   CONTEXT7_API_KEY=your_actual_api_key_here
   ```

3. **Verify MCP configuration:**
   ```bash
   qwen mcp list
   ```

## Using Context7 with Your Textbook Project

### For Authors and Educators:

1. **Store Large Assets:**
   - Save simulation files, datasets, or large images to Context7
   - Reference them in your textbook with secure URLs
   - Students can access these resources without bloating the git repository

2. **Share Code Examples:**
   - Store complete, runnable code examples for robotics algorithms
   - Students can access and download these directly from Context7

3. **Distribute Exercise Materials:**
   - Upload exercise datasets that students will use
   - Provide controlled access to different course materials

### For Students:

1. **Access Course Materials:**
   - Your textbook content will include secure links to resources
   - Access simulation environments and datasets when needed

2. **Submit Assignments:**
   - Upload completed exercises with appropriate access controls

## Example Usage in Textbook Content

When writing your chapters, you can reference resources stored in Context7:

```markdown
## Hands-On Exercise: Robot Path Planning

In this exercise, you'll implement and test a path planning algorithm using the simulation environment available at: [context7://robotics/path-planning-lesson/simulation.env]

Download the starter code at: [context7://robotics/path-planning-lesson/starter-code.py]
```

## Best Practices for Your Textbook Project

1. **Security:**
   - Never commit API keys or credentials to the repository
   - Use the `.env` file and ensure `.gitignore` includes it
   - Set appropriate access controls for student materials

2. **Organization:**
   - Use clear naming conventions for resources: `robotics/[lesson-name]/[resource]`
   - Maintain a consistent structure for different chapters and lessons

3. **Versioning:**
   - Keep track of different versions of simulation environments
   - Update textbook references when resources change

## Troubleshooting

- If MCP commands fail, ensure your API key is set correctly in `.env`
- If resources can't be accessed, verify access permissions in your Context7 dashboard
- Check that your network allows connections to Upstash services