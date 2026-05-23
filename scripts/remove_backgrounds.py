#!/usr/bin/env python3
"""
Script para remover fondos blancos de logos y convertirlos a PNG transparentes.
Requiere: pip install pillow
"""

from PIL import Image
import os
from pathlib import Path

def remove_white_background(input_path, output_path):
    """Remove white background from image and save as PNG with transparency"""
    try:
        # Abrir imagen
        img = Image.open(input_path)

        # Convertir a RGBA si no lo está
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Obtener datos de la imagen
        data = img.getdata()

        # Crear nueva lista de datos
        new_data = []
        for item in data:
            # Si el píxel es blanco o muy cercano al blanco, hacerlo transparente
            if item[0] > 240 and item[1] > 240 and item[2] > 240:  # RGB cercano a blanco
                new_data.append((255, 255, 255, 0))  # Transparente
            else:
                new_data.append(item)

        # Actualizar imagen
        img.putdata(new_data)

        # Guardar como PNG
        img.save(output_path, 'PNG')
        print(f"✓ {os.path.basename(input_path)} → {os.path.basename(output_path)}")
        return True
    except Exception as e:
        print(f"✗ Error con {input_path}: {e}")
        return False

def main():
    logo_dir = Path("public/portfolio-n0hacks")

    if not logo_dir.exists():
        print(f"❌ Carpeta no encontrada: {logo_dir}")
        return

    # Processar todos los JPEG
    jpeg_files = list(logo_dir.glob("*.jpeg"))

    if not jpeg_files:
        print("ℹ️ No hay archivos JPEG para procesar")
        return

    print(f"Procesando {len(jpeg_files)} logos...\n")

    success_count = 0
    for jpeg_file in jpeg_files:
        png_file = jpeg_file.with_suffix('.png')
        if remove_white_background(str(jpeg_file), str(png_file)):
            success_count += 1

    print(f"\n✅ Completado: {success_count}/{len(jpeg_files)} logos procesados")
    print("Los archivos PNG están en la misma carpeta")

if __name__ == "__main__":
    main()
