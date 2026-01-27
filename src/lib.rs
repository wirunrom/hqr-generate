// Core QR logic (no I/O, no WASM)
pub mod core;

pub mod error;

// Render QR bitmap into concrete formats (png/svg/...)
pub mod render;

pub use core::generate::generate_qr_bitmap;

pub use render::png::render_png;
pub use render::svg::render_svg;

#[cfg(feature = "decode")]
pub use core::decode;

// WASM bindings (JS-friendly API)
#[cfg(feature = "wasm")]
pub mod wasm;
