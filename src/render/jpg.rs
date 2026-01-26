#![cfg(feature = "render-image")]

use crate::core::types::QrBitmap;
use crate::error::GenerateError;
use image::GrayImage;

pub fn render_jpg(bitmap: &QrBitmap) -> Result<Vec<u8>, GenerateError> {
    let img = GrayImage::from_raw(bitmap.width, bitmap.height, bitmap.pixels.clone())
        .ok_or_else(|| GenerateError::Image("invalid image buffer".into()))?;

    let mut out = Vec::new();
    let mut encoder = image::codecs::jpeg::JpegEncoder::new(&mut out);
    encoder
        .encode_image(&img)
        .map_err(|e: image::ImageError| GenerateError::Image(e.to_string()))?;

    Ok(out)
}
