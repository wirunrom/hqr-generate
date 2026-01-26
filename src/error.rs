#[derive(Debug)]
pub enum GenerateError {
    Qr(String),
    Png(String),

    #[cfg(feature = "render-image")]
    Image(String),
}

#[cfg(feature = "decode")]
#[derive(Debug)]
pub enum DecodeError {
    NotFound,
    InvalidImage,
    Internal(String),
}
