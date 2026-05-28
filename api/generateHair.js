export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const {
      image,
      gender
    } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "No image"
      });
    }

    // 仮のAI結果（次で本物生成AIに変更）
    const hairstyle =
      gender === "men"
      ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800";

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