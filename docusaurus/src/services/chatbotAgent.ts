/**
 * Chatbot Agent Service - Backend API Integration
 * Connects to FastAPI backend for chat responses
 * Supports file search and web search via OpenAI Agents
 */

// Configuration
const API_BASE_URL = typeof window !== 'undefined' 
  ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000'
    : ''
  : 'http://localhost:8000';

export type WorkflowInput = { 
  input_as_text: string 
};

export type WorkflowOutput = {
  response?: string;
  output_text?: string;
  reasoning?: string;
  sources?: string[];
};

/**
 * Call the backend chatbot API
 * Sends user query to FastAPI backend for processing
 */
export const runWorkflow = async (workflow: WorkflowInput): Promise<WorkflowOutput> => {
  try {
    // Use the mock-friendly endpoint (respects MOCK_MODE on the backend)
    const endpoint = `${API_BASE_URL}/api/chat/query`;
    
    console.log('Calling API:', endpoint);
    console.log('Query:', workflow.input_as_text);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message: workflow.input_as_text
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    // Handle different response formats
    const responseText = data.response || data.output_text || JSON.stringify(data);
    const sources = Array.isArray(data.sources) ? data.sources : [];

    return {
      response: responseText,
      output_text: responseText,
      reasoning: data.reasoning,
      sources: sources
    };
  } catch (error) {
    console.error('Chatbot API Error:', error);
    
    // Check if backend is running
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        '⚠️ Cannot reach the backend server. Make sure to run: python -m uvicorn api.main:app --reload'
      );
    }
    
    throw error instanceof Error 
      ? error 
      : new Error('Failed to get chatbot response');
  }
};

/**
 * Initialize the chatbot
 */
export const initializeAgent = () => {
  console.log('Chatbot initialized - Backend API mode');
  return { initialized: true, apiUrl: API_BASE_URL };
};

export default runWorkflow;
