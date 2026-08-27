export default function Awards() {
  const trustSignals = [
    'Trusted by enterprises across Nigeria, Ghana, Kenya, and South Africa',
  ];

  return (
    <section className="py-16 border-y border-brand-border bg-brand-dark">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">
          Trusted by forward-thinking organisations across Africa
        </p>
        <p className="text-lg text-gray-400 font-light">
          {trustSignals[0]}
        </p>
      </div>
    </section>
  );
}
