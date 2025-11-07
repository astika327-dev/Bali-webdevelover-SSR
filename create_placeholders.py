from PIL import Image
import os

# Direktori target untuk menyimpan gambar
output_dir = "public/screenshot"
os.makedirs(output_dir, exist_ok=True)

# Daftar nama file gambar yang dibutuhkan
image_filenames = [
    "minitools-1.png", "minitools-2.png", "minitools-3.png", "minitools-4.png",
    "opsplaybook-1.png", "opsplaybook-2.png", "opsplaybook-3.png",
    "personalsite-1.png", "personalsite-2.png",
    "cleanpro-1.png", "cleanpro-2.png", "cleanpro-3.png",
    "promptcraft-1.png",
]

# Ukuran dan warna gambar placeholder
width, height = 800, 600
color = (255, 255, 255) # Putih

# Buat dan simpan setiap gambar
for filename in image_filenames:
    try:
        img = Image.new('RGB', (width, height), color)
        filepath = os.path.join(output_dir, filename)
        img.save(filepath)
        print(f"Successfully created {filepath}")
    except Exception as e:
        print(f"Error creating {filename}: {e}")

print("Placeholder image generation complete.")
