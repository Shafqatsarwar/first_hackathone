# Context7 MCP Integration for Physical AI & Humanoid Robotics Textbook

## Setup

1. Obtain your Context7 API key from Upstash
2. Update the `.env` file with your actual API key:
   ```bash
   CONTEXT7_API_KEY=your_actual_api_key_here
   ```

## Usage with your textbook project

The Context7 MCP provides secure storage and retrieval capabilities for your educational content:

### For storing textbook resources:
- Simulation data files
- Code examples
- Exercise datasets
- Figure and image assets
- Student assignment templates

### To use in your textbook content:

You can now securely store and access files needed for your Physical AI & Humanoid Robotics course:

```
# Example usage within your textbook code examples
# This would allow students to access datasets or simulation files remotely
context7.set("robotics_lesson_1_data", { 
  simulation_files: [...], 
  code_examples: [...], 
  exercises: [...] 
})
```

## Security considerations for educational content:

- Store only properly licensed content
- Ensure student privacy when handling submissions
- Secure access to simulation environments
- Protect proprietary algorithms or implementations

## Environment variables

The following environment variables need to be set for proper operation:

- `CONTEXT7_API_KEY`: Your Upstash Context7 API key
- `CLIENT_IP_ENCRYPTION_KEY`: (Optional) Custom encryption key if needed

Make sure to add `.env` to your `.gitignore` file to prevent exposing credentials:

```
.env
```

## Integration with textbook development workflow

The context7 MCP integration enables:

1. **Secure Content Distribution**: Share simulation environments and datasets with students
2. **Remote Storage**: Store large files needed for robotics simulations without bloating the repo
3. **Version Management**: Track changes to educational resources
4. **Collaborative Content**: Allow multiple educators to securely contribute to the textbook