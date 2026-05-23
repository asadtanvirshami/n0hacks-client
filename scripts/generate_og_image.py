#!/usr/bin/env python3
"""
Generate OG (Open Graph) image for n0hacks website.
Creates a 1200x630px image suitable for social media sharing.

Requirements: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

def create_og_image(output_path="public/og/n0hacks-og.jpg"):
    """Create OG image with n0hacks branding"""

    # Create directory if it doesn't exist
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    # Image dimensions (standard OG image)
    width, height = 1200, 630

    # Colors matching n0hacks brand
    bg_color = "#000a08"  # Dark background
    primary_color = "#10b981"  # Emerald
    accent_color = "#00ff9d"  # Bright emerald/neon
    text_color = "#ffffff"  # White

    # Create image with dark background
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Try to use system fonts, fallback to default
    try:
        # Large font for main text
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 140)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 70)
        tagline_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
    except (OSError, FileNotFoundError):
        # Fallback to default font
        print("⚠️ System fonts not found, using default font (may look different)")
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()

    # Add decorative elements
    # Top-left corner accent
    accent_size = 80
    draw.rectangle(
        [(0, 0), (accent_size, accent_size)],
        outline=primary_color,
        width=4
    )

    # Bottom-right corner accent
    draw.rectangle(
        [(width - accent_size, height - accent_size), (width, height)],
        outline=primary_color,
        width=4
    )

    # Center vertical line (accent)
    draw.line(
        [(width // 2, 80), (width // 2, height - 80)],
        fill=primary_color,
        width=2
    )

    # Text positioning
    margin = 80

    # Main title "n0hacks"
    title = "n0hacks"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    title_y = 100

    draw.text(
        (title_x, title_y),
        title,
        fill=accent_color,
        font=title_font
    )

    # Subtitle
    subtitle = "Offensive Security"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = 280

    draw.text(
        (subtitle_x, subtitle_y),
        subtitle,
        fill=primary_color,
        font=subtitle_font
    )

    # Tagline
    tagline = "Red Team & Pentesting"
    tagline_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tagline_width = tagline_bbox[2] - tagline_bbox[0]
    tagline_x = (width - tagline_width) // 2
    tagline_y = 400

    draw.text(
        (tagline_x, tagline_y),
        tagline,
        fill=text_color,
        font=tagline_font
    )

    # Bottom text
    bottom_text = "Elite cyber specialists | www.n0hacks.com"
    bottom_bbox = draw.textbbox((0, 0), bottom_text, font=tagline_font)
    bottom_width = bottom_bbox[2] - bottom_bbox[0]
    bottom_x = (width - bottom_width) // 2
    bottom_y = 530

    draw.text(
        (bottom_x, bottom_y),
        bottom_text,
        fill=primary_color,
        font=tagline_font
    )

    # Save image
    img.save(output_path, 'JPEG', quality=95)

    print(f"✅ OG image created successfully: {output_path}")
    print(f"   Size: {width}x{height}px")
    print(f"   Format: JPEG (quality: 95)")

    return output_path

if __name__ == "__main__":
    try:
        output = create_og_image()
        print(f"\n📸 Ready for Open Graph sharing!")
    except Exception as e:
        print(f"❌ Error creating OG image: {e}")
        print("\n💡 Install Pillow with: pip install pillow")
        exit(1)
