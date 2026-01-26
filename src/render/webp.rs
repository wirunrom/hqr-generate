#![cfg(feature = "render-image")]

use crate::core::types::QrBitmap;
use crate::error::GenerateError;

use image::ExtendedColorType;
use image::codecs::webp::WebPEncoder;

pub fn render_webp(bitmap: &QrBitmap) -> Result<Vec<u8>, GenerateError> {
    let mut out = Vec::new();

    let encoder = WebPEncoder::new_lossless(&mut out);

    encoder
        .encode(
            &bitmap.pixels,
            bitmap.width,
            bitmap.height,
            ExtendedColorType::L8,
        )
        .map_err(|e| GenerateError::Image(e.to_string()))?;

    Ok(out)
}
