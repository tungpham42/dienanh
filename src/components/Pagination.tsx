import Icon, { type IconName } from "./Icon";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VISIBLE = 5;

function PageButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: IconName;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-10 place-items-center rounded-md border border-line bg-surface text-foreground hover:bg-surface-2 disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60"
    >
      <Icon name={icon} />
    </button>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const start = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - VISIBLE + 1),
  );
  const end = Math.min(totalPages, start + VISIBLE - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav
      aria-label="Phân trang"
      className="mt-10 flex flex-wrap justify-center gap-2"
    >
      <PageButton
        label="Trang đầu"
        icon="chevronsLeft"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <PageButton
        label="Trang trước"
        icon="chevronLeft"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`size-10 rounded-md border text-sm ${
            page === currentPage
              ? "border-primary bg-primary text-white"
              : "border-line bg-surface hover:bg-surface-2"
          }`}
        >
          {page}
        </button>
      ))}
      <PageButton
        label="Trang sau"
        icon="chevronRight"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <PageButton
        label="Trang cuối"
        icon="chevronsRight"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
}
