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

    // 仮の髪型オーバーレイ画像
    const hairstyle =
      gender === "men"
      ? "https://i.imgur.com/XpQ7YwQ.png"
      : "https://i.imgur.com/5vZQKQx.png";

    return res.status(200).json({
      success: true,
      image: hairstyle
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "AI generation failed"
    });
  }
}