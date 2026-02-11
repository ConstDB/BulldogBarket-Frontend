export default function CTA() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-5xl w-full mx-auto bg-brand-primary rounded-lg flex flex-col justify-center items-center py-16">
        <h1 className="text-5xl font-bold text-center text-white mb-4">
          Ready to declutter your locker?
        </h1>
        <p className="text-xl text-gray-200 text-center max-w-2xl">
          Turn your old uniforms into cash or find your next favorite snack. Join thousands of
          Nationalians today.
        </p>

        <button className="bg-brand-accent rounded-lg shadow mt-6 mb-8 py-4! px-10!">
          <span className="text-lg font-bold text-brand-primary">Create Free Account</span>
        </button>

        <p className="text-blue-300 text-sm">Valid Student ID required for registration</p>
      </div>
    </section>
  );
}
