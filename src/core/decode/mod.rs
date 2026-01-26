#![cfg(feature = "decode")]

mod impl_;
use impl_::{decode_from_bytes, decode_from_rgba};

use crate::core::types::DecodeInput;
use crate::error::DecodeError;

pub struct QrResult {
    pub text: String,
}

pub fn decode(input: DecodeInput) -> Result<QrResult, DecodeError> {
    match input {
        DecodeInput::Rgba {
            width,
            height,
            data,
        } => decode_from_rgba(width, height, data),

        DecodeInput::ImageBytes(bytes) => decode_from_bytes(bytes),
    }
}
