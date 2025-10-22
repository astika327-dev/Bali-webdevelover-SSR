import Link from "next/link";

const CtaBanner = () => {
  return (
    <div className="bg-gray-800 text-white py-8 px-6 rounded-lg my-8 text-center">
      <h2 className="text-2xl font-bold mb-2">
        Punya ide atau proyek?
      </h2>
      <p className="mb-4">
        Mari kita wujudkan bersama. Kami siap membantu Anda mengubah ide menjadi kenyataan.
      </p>
      <Link
        href="/contact"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Hubungi Kami
      </Link>
    </div>
  );
};

export default CtaBanner;
