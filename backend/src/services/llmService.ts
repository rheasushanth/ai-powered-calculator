import axios from 'axios';
import config from '../config';
import type { LLMResponse } from '../types/index';

const client = axios.create({
  timeout: config.llm.timeout,
});

/**
 * Call the LLM API for natural language processing
 */
export async function callLLM(query: string): Promise<LLMResponse> {
  try {
    if (!config.llm.apiKey) {
      throw new Error('LLM API key not configured');
    }

    if (config.llm.provider === 'claude') {
      return await callClaudeAPI(query);
    } else if (config.llm.provider === 'openai') {
      return await callOpenAIAPI(query);
    }

    throw new Error(`Unknown LLM provider: ${config.llm.provider}`);
  } catch (error) {
    console.error('LLM API Error:', error);
    throw error;
  }
}

/**
 * Call Anthropic Claude API
 */
async function callClaudeAPI(query: string): Promise<LLMResponse> {
  const systemPrompt = `You are a mathematical assistant. When given a math question:
1. Parse the query and identify what needs to be calculated
2. Perform the calculation 
3. Return results in JSON format with: result (final answer), steps (array of step descriptions), formula_used (the mathematical approach), and confidence (0-1 score)
4. Always show your work step by step
5. If you cannot parse the query, set clarification_needed to true`;

  try {
    const response = await client.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: config.llm.model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Calculate: ${query}`,
          },
        ],
      },
      {
        headers: {
          'x-api-key': config.llm.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      },
    );

    // Parse Claude's response
    const content = response.data.content[0]?.text || '';
    
    // Try to extract JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as LLMResponse;
      }
    } catch {
      // Fallback if JSON parsing fails
    }

    // Fallback response
    return {
      result: content,
      steps: [content],
      formula_used: 'Claude processing',
      confidence: 0.7,
    };
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(`Claude API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAIAPI(query: string): Promise<LLMResponse> {
  const systemPrompt = `You are a mathematical assistant. When given a math question:
1. Parse the query and identify what needs to be calculated
2. Perform the calculation
3. Return results in JSON format with: result, steps, formula_used, and confidence
4. Always show your work step by step
5. If uncertain, set confidence lower`;

  try {
    const response = await client.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Calculate: ${query}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${config.llm.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const content = response.data.choices[0]?.message?.content || '';
    
    // Try to extract JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as LLMResponse;
      }
    } catch {
      // Fallback if JSON parsing fails
    }

    // Fallback response
    return {
      result: content,
      steps: [content],
      formula_used: 'OpenAI processing',
      confidence: 0.7,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`OpenAI API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Check if LLM is available
 */
export async function isLLMAvailable(): Promise<boolean> {
  return !!config.llm.apiKey && !!config.llm.provider;
}
