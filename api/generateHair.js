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

    const {
      image,
      gender
    } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "No image"
      });
    }

    // 仮のAI結果（本人画像を返す）
const hairstyle = image;

return res.status(200).json({
  success: true,
  image: hairstyle
});

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