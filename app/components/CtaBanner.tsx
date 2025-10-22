import Link from "next/link";

const CtaBanner = () => {
  return (
    <div className="bg-[var(--cream)]/80 border border-[var(--tan)] text-[var(--brown)] py-6 px-4 rounded-2xl my-8 text-center shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        Punya ide atau proyek?
      </h2>
      <p className="mb-4 text-[var(--brown)]/80">
        Mari kita wujudkan bersama. Kami siap membantu Anda mengubah ide menjadi kenyataan.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
      >
        Hubungi Kami
      </Link>
    </div>
  );
};

export default CtaBanner;
