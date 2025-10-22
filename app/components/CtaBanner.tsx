import Link from "next/link";

const CtaBanner = () => {
  return (
<<<<<<< HEAD
    <div className="bg-[var(--cream)]/80 border border-[var(--tan)] text-[var(--brown)] py-6 px-4 rounded-2xl my-8 text-center shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        Punya ide atau proyek?
      </h2>
      <p className="mb-4 text-[var(--brown)]/80">
=======
    <div className="bg-gray-800 text-white py-8 px-6 rounded-lg my-8 text-center">
      <h2 className="text-2xl font-bold mb-2">
        Punya ide atau proyek?
      </h2>
      <p className="mb-4">
>>>>>>> ef8b9085a1d0660daf2bc0890e74ca14d897431e
        Mari kita wujudkan bersama. Kami siap membantu Anda mengubah ide menjadi kenyataan.
      </p>
      <Link
        href="/contact"
<<<<<<< HEAD
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
=======
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
>>>>>>> ef8b9085a1d0660daf2bc0890e74ca14d897431e
      >
        Hubungi Kami
      </Link>
    </div>
  );
};

export default CtaBanner;
