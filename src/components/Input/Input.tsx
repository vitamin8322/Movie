import { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <div className={classNames(styles.container, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={classNames(styles.input, { [styles.error]: !!error })}
          {...rest}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;