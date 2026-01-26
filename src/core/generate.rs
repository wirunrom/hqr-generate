use qrcode::types::Color;
use qrcode::{EcLevel, QrCode};

use crate::core::types::QrBitmap;
use crate::error::GenerateError;

#[inline]
fn ecc_from_u8(ecc: u8) -> EcLevel {
    match ecc {
        0 => EcLevel::L,
        1 => EcLevel::M,
        3 => EcLevel::H,
        _ => EcLevel::Q,
    }
}

pub fn generate_qr_bitmap(
    text: &str,
    size: u32,
    margin: u32,
    ecc: u8,
) -> Result<QrBitmap, GenerateError> {
    let size = size.max(128);

    let code = QrCode::with_error_correction_level(text.as_bytes(), ecc_from_u8(ecc))
        .map_err(|e| GenerateError::Qr(e.to_string()))?;

    let modules = code.width() as u32;
    let total_modules = modules + margin * 2;
    let scale = (size / total_modules).max(1);
    let img_size = total_modules * scale;

    let mut pixels = vec![255u8; (img_size * img_size) as usize];

    for y in 0..modules {
        for x in 0..modules {
            if matches!(code[(x as usize, y as usize)], Color::Dark) {
                let start_x = (x + margin) * scale;
                let start_y = (y + margin) * scale;

                for dy in 0..scale {
                    let row = start_y + dy;
                    let row_start = (row * img_size + start_x) as usize;
                    pixels[row_start..row_start + scale as usize].fill(0);
                }
            }
        }
    }

    Ok(QrBitmap {
        width: img_size,
        height: img_size,
        pixels,
    })
}
