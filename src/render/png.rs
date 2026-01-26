use crate::core::types::QrBitmap;
use crate::error::GenerateError;

pub fn render_png(bitmap: &QrBitmap) -> Result<Vec<u8>, GenerateError> {
    let mut out = Vec::new();

    {
        let mut encoder = png::Encoder::new(&mut out, bitmap.width, bitmap.height);
        encoder.set_color(png::ColorType::Grayscale);
        encoder.set_depth(png::BitDepth::Eight);

        let mut writer = encoder
            .write_header()
            .map_err(|e| GenerateError::Png(e.to_string()))?;

        writer
            .write_image_data(&bitmap.pixels)
            .map_err(|e| GenerateError::Png(e.to_string()))?;
    }

    Ok(out)
}
