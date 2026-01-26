use crate::core::types::QrBitmap;

pub fn render_svg(bitmap: &QrBitmap) -> String {
    let mut out = String::new();

    let size = bitmap.width;

    out.push_str(&format!(
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="{0}" height="{0}" viewBox="0 0 {0} {0}" shape-rendering="crispEdges">"#,
        size
    ));
    out.push_str(r#"<rect width="100%" height="100%" fill="white"/>"#);

    for y in 0..bitmap.height {
        for x in 0..bitmap.width {
            let idx = (y * bitmap.width + x) as usize;
            if bitmap.pixels[idx] == 0 {
                out.push_str(&format!(
                    r#"<rect x="{x}" y="{y}" width="1" height="1" fill="black"/>"#
                ));
            }
        }
    }

    out.push_str("</svg>");
    out
}
