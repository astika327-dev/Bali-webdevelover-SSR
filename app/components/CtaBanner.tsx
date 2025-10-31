import Link from "next/link";

const CtaBanner = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-100 py-8 px-6 rounded-2xl my-8 text-center shadow-sm">
      <h2 className="text-2xl font-bold mb-2">
        Punya ide atau proyek?
      </h2>
      <p className="mb-4">
        Mari kita wujudkan bersama. Kami siap membantu Anda mengubah ide menjadi kenyataan.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-900 text-amber-50 dark:bg-amber-300 dark:text-amber-950 font-medium hover:bg-opacity-90 transition"
      >
        Hubungi Kami
      </Link>
    </div>
  );
};

export default CtaBanner;
