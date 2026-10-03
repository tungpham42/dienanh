import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-sm text-muted">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <Image src="/tmdb.svg" alt="TMDB" width={110} height={17} />
        </a>
        <p>Dữ liệu phim được cung cấp bởi TMDB.</p>
      </div>
    </footer>
  );
}
