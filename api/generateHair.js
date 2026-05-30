export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { image, gender } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "No image"
      });
    }

    const apiKey =
      process.env.OPENAI_API_KEY;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "あなたは美容師AIです。顔写真から似合う髪型を3つ提案してください。"
            },
            {
              role: "user",
              content:
                `性別:${gender}`
            }
          ],
          max_tokens: 300
        })
      }
    );

    const data =
      await response.json();

    const advice =
      data.choices?.[0]
      ?.message?.content ||
      "髪型分析失敗";

    return res.status(200).json({
      success: true,
      advice
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "AI generation failed"
    });
  }
}