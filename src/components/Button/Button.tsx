import classNames from "classnames";
import styles from "./Button.module.scss";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = "primary",
  size = "medium",
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.disabled]: disabled },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;