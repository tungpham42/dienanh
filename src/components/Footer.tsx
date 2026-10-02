import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-12 py-6">
      <div className="mx-auto flex max-w-6xl justify-center px-4">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/tmdb.svg" alt="TMDB" width={130} height={20} />
        </a>
      </div>
    </footer>
  );
}
