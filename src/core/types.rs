pub struct QrBitmap {
    pub width: u32,
    pub height: u32,
    pub pixels: Vec<u8>,
}

pub enum DecodeInput<'a> {
    Rgba {
        width: u32,
        height: u32,
        data: &'a [u8],
    },
    ImageBytes(&'a [u8]),
}
