export default function ErrorState({ message, retry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-red-300">Something went wrong</p>
      <p className="max-w-xl text-lg text-red-200">{message}</p>
      {retry ? (
        <button
          onClick={retry}
          className="rounded-full border border-red-400 px-6 py-3 text-xs uppercase tracking-[0.3em] text-red-200 hover:bg-red-400/10"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
