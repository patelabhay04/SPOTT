import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an event planning assistant.

Generate event details based on the user's description.

Return ONLY valid JSON.

Format:
{
  "title": "Event title",
  "description": "Detailed event description",
  "category": "tech",
  "suggestedCapacity": 50,
  "suggestedTicketType": "free"
}

Rules:
- Return only JSON
- No markdown
- No explanation
- Category must be one of:
tech, music, sports, art, food, business, health, education, gaming, networking, outdoor, community

User idea:
${prompt}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "user",
              content: systemPrompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No AI response received");
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const eventData = JSON.parse(cleanedText);

    return NextResponse.json(eventData);

  } catch (error) {
    console.error("AI Error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to generate event: " +
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}