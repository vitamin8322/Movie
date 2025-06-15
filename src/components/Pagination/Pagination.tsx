import { useState, useEffect, ReactElement } from "react";
import classNames from "classnames";
import styles from "./Pagination.module.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  disabled?: boolean;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  className,
}: PaginationProps): ReactElement => {
  const [inputPage, setInputPage] = useState<string | number>(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = parseInt(inputPage as string, 10);
      if (!isNaN(value)) {
        if (value >= 1 && value <= totalPages) {
          onPageChangeWithScroll(value);
        } else if (value > totalPages) {
          onPageChangeWithScroll(totalPages);
        } else {
          onPageChangeWithScroll(1);
        }
      } else {
        setInputPage(currentPage);
      }
    }
  };

  const onPageChangeWithScroll = (newPage: number) => {
    onPageChange(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className={classNames(styles.pagination, className)}>
      <Button
        variant="secondary"
        size="medium"
        className={styles.arrow}
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChangeWithScroll(currentPage - 1)}
      >
        ←
      </Button>

      <div className={styles.pageInputContainer}>
        <span>Trang</span>
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={handleChangePage}
          onKeyPress={handleKeyPress}
          className={styles.pageInput}
          disabled={disabled}
        />
        <span>/ {totalPages}</span>
      </div>

      <Button
        variant="secondary"
        size="medium"
        className={styles.arrow}
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChangeWithScroll(currentPage + 1)}
      >
        →
      </Button>
    </div>
  );
};

export default Pagination;