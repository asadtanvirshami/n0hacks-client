#!/usr/bin/env python3
"""
Generate favicon from the n0hacks logo SVG.

This script converts the logo.svg to various favicon formats.
Requires: pip install pillow cairosvg (or just use Pillow for PNG)

For production, use: https://realfavicongenerator.net/
"""

from PIL import Image, ImageDraw
import os
from pathlib import Path

def create_simple_favicon(output_dir="public"):
    """
    Create simple favicon.ico and apple-touch-icon.png

    Since converting SVG to ICO requires extra dependencies,
    this creates simple solid-color icons with the n0hacks branding.

    For better quality, use: https://realfavicongenerator.net/
    """

    # Create directory if needed
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Colors
    bg_color = "#000a08"
    primary_color = "#10b981"
    accent_color = "#00ff9d"

    # Create favicon.ico (32x32px)
    print("📍 Creating favicon.ico (32x32px)...")
    favicon = Image.new('RGBA', (32, 32), color=bg_color)
    draw = ImageDraw.Draw(favicon)

    # Draw a simple "n" shape
    # Top horizontal line
    draw.rectangle([(4, 4), (28, 8)], fill=primary_color)
    # Left vertical line
    draw.rectangle([(4, 4), (8, 28)], fill=primary_color)
    # Bottom right corner
    draw.rectangle([(24, 20), (28, 28)], fill=accent_color)

    # Convert to ICO and save
    favicon.save(os.path.join(output_dir, "favicon.ico"), format="ICO")
    print(f"   ✅ Saved: {output_dir}/favicon.ico")

    # Create apple-touch-icon.png (180x180px)
    print("📍 Creating apple-touch-icon.png (180x180px)...")
    apple_icon = Image.new('RGBA', (180, 180), color=bg_color)
    draw_apple = ImageDraw.Draw(apple_icon)

    # Draw larger design
    margin = 20
    # Outer border
    draw_apple.rectangle(
        [(margin, margin), (180 - margin, 180 - margin)],
        outline=primary_color,
        width=3
    )

    # Inner accent
    inner_margin = 40
    draw_apple.rectangle(
        [(inner_margin, inner_margin), (180 - inner_margin, 180 - inner_margin)],
        outline=accent_color,
        width=2
    )

    # Center accent
    center = 90
    draw_apple.ellipse(
        [(center - 30, center - 30), (center + 30, center + 30)],
        fill=primary_color
    )

    apple_icon.save(
        os.path.join(output_dir, "apple-touch-icon.png"),
        format="PNG"
    )
    print(f"   ✅ Saved: {output_dir}/apple-touch-icon.png")

    # Create additional favicon sizes (optional)
    sizes = [16, 32, 64, 128, 256]
    for size in sizes:
        icon = Image.new('RGBA', (size, size), color=bg_color)
        draw_icon = ImageDraw.Draw(icon)

        # Simple "n" design scaled
        draw_icon.rectangle(
            [(size // 8, size // 8), (7 * size // 8, size // 4)],
            fill=primary_color
        )
        draw_icon.rectangle(
            [(size // 8, size // 8), (size // 4, 7 * size // 8)],
            fill=primary_color
        )

        icon.save(os.path.join(output_dir, f"favicon-{size}x{size}.png"), format="PNG")

    print(f"\n✅ Favicons created in {output_dir}/")
    print("\n💡 For professional quality, use:")
    print("   https://realfavicongenerator.net/")
    print("\n📋 Add to your layout head:")
    print("""
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    """)

if __name__ == "__main__":
    try:
        create_simple_favicon()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 Install requirements with:")
        print("   pip install pillow")
        exit(1)
