import Image from 'next/image';

interface MdxImageProps {
  src?: string;
  alt?: string;
}

const MdxImage: React.FC<MdxImageProps> = ({ src, alt }) => {
  if (!src) {
    return null;
  }

  // Gunakan dimensi default untuk menjaga rasio aspek gambar dari MDX
  // Ini penting karena markdown tidak menyediakan metadata lebar/tinggi
  const width = 800;
  const height = 450; // Asumsi rasio aspek 16:9

  return (
    <div className="relative my-8 overflow-hidden rounded-lg shadow-lg">
      <Image
        src={src}
        alt={alt || 'Gambar dalam artikel'}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 800px"
        className="h-auto w-full object-cover"
      />
    </div>
  );
};

export default MdxImage;
