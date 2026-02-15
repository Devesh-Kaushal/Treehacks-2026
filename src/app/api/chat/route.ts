import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        const apiKey = process.env.PERPLEXITY_API_KEY;

        if (!apiKey) {
            // Fallback for demo if no key is present
            console.warn("No Perplexity API key found. Using mock response.");
            return NextResponse.json({
                choices: [
                    {
                        message: {
                            role: "assistant",
                            content: "I'm currently running in demo mode because the Perplexity API key hasn't been configured. To get real-time answers, please add your API key to .env.local with the name PERPLEXITY_API_KEY.\n\nIn the meantime: Make sure to clear dry leaves from your gutters, keep a go-bag ready, and know your evacuation zone."
                        }
                    }
                ]
            });
        }

        // specific system prompt based on user profile
        const systemPrompt = `You are the Resonant Safety Advisor, an expert AI assistant for wildfire safety and preparation.
    
    User Context:
    - Name: ${userProfile?.name || 'Resident'}
    - Role: ${userProfile?.profileType || 'resident'}
    - Location: ${userProfile?.location || 'California'}
    
    Your goal is to provide accurate, helpful, and calm advice about wildfire preparedness, evacuation features, and risk assessment.
    Always prioritize official sources and remind users to follow local emergency orders.
    Keep answers concise and actionable.`;

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
                temperature: 0.2,
                top_p: 0.9,
                max_tokens: 1000,
                stream: false
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Perplexity API Error details:', errorData);
            throw new Error(`Perplexity API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Chat Route Error:', error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}
