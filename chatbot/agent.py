"""
Agent-based chatbot for GitHub repository search and guide with OpenAI Agents.

This module provides an agent-based approach using OpenAI's file search and web search tools
for answering questions about the GitHub repository and web resources.

Usage:
    from chatbot.agent import run_workflow, WorkflowInput
    
    input_data = WorkflowInput(input_as_text="What is in this repository?")
    result = await run_workflow(input_data)
"""

from agents import (
    FileSearchTool, 
    WebSearchTool, 
    Agent, 
    ModelSettings, 
    TResponseInputItem, 
    Runner, 
    RunConfig, 
    trace
)
from openai.types.shared.reasoning import Reasoning
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class WorkflowInput(BaseModel):
    """Input model for the chatbot workflow."""
    input_as_text: str


class WorkflowOutput(BaseModel):
    """Output model for the chatbot workflow."""
    output_text: str
    reasoning: Optional[str] = None
    sources: Optional[list] = []


def initialize_agent() -> Agent:
    """
    Initialize and configure the chatbot agent with file search and web search tools.
    
    Returns:
        Agent: Configured chatbot agent ready for processing queries
    """
    # Initialize File Search Tool for searching the repository files
    file_search = FileSearchTool(
        vector_store_ids=[
            os.getenv("OPENAI_FILE_SEARCH_VECTOR_STORE_ID", "vs_6947bf233a0c8191ad67c8e7a04368fa")
        ]
    )
    
    # Initialize Web Search Tool for queries outside the repository
    web_search_preview = WebSearchTool(
        user_location={
            "type": "approximate",
            "country": None,
            "region": None,
            "city": None,
            "timezone": None
        },
        search_context_size="medium"
    )
    
    # Create the chatbot agent
    chatbot = Agent(
        name="ChatBot",
        instructions=(
            "You are a helpful assistant. Your primary role is to help users "
            "find answers from the GitHub repository at https://github.com/Shafqatsarwar/first_hackathone.git. "
            "Use the file search tool to look up information in the repository files first. "
            "If a question is not covered in the repository, use the web search tool to provide "
            "additional context and relevant information from the web. "
            "Always cite the source of your information and never say 'not found' without "
            "attempting both tools. Be helpful, accurate, and supportive."
        ),
        model="gpt-4-turbo",
        tools=[
            file_search,
            web_search_preview
        ],
        model_settings=ModelSettings(
            store=True,
            reasoning=Reasoning(
                effort="low",
                summary="auto"
            )
        )
    )
    
    return chatbot


async def run_workflow(workflow_input: WorkflowInput) -> Dict[str, Any]:
    """
    Execute the chatbot workflow with the provided input.
    
    Args:
        workflow_input: WorkflowInput containing the user's text query
        
    Returns:
        Dict containing the chatbot's response and metadata
        
    Raises:
        Exception: If the agent execution fails
    """
    with trace("GitHub Repository Chatbot"):
        # Extract input data
        workflow = workflow_input.model_dump()
        
        # Build conversation history
        conversation_history: list[TResponseInputItem] = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": workflow["input_as_text"]
                    }
                ]
            }
        ]
        
        # Initialize the agent
        chatbot = initialize_agent()
        
        # Run the agent with the input
        chatbot_result_temp = await Runner.run(
            chatbot,
            input=[
                *conversation_history
            ],
            run_config=RunConfig(trace_metadata={
                "__trace_source__": "agent-builder",
                "workflow_id": os.getenv("OPENAI_WORKFLOW_ID", "wf_6947bdd97d508190a78f508d9a6e6e03072160440be2471e")
            })
        )
        
        # Extend conversation history with new items
        conversation_history.extend(
            [item.to_input_item() for item in chatbot_result_temp.new_items]
        )
        
        # Format and return the response
        chatbot_response = {
            "output_text": chatbot_result_temp.final_output_as(str),
            "reasoning": getattr(chatbot_result_temp, 'reasoning', None),
            "sources": []
        }
        
        return chatbot_response
