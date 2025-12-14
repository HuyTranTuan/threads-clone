import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./Button.module.scss";

function Button({
  children,
  rounded = false,
  bordered = false,
  loading = false,
  disabled = false,
  primary = false,
  success = false,
  warning = false,
  danger = false,
  size = "medium",
  href,
  className,
  icon,
  leftIcon = icon,
  rightIcon,
  onClick,
  ...passProps
}) {
  const shouldDisabled = disabled || loading;
  const classNames = clsx(styles.wrapper, className, styles[size], {
    [styles.rounded]: rounded,
    [styles.bordered]: bordered,
    [styles.primary]: primary,
    [styles.success]: success,
    [styles.warning]: warning,
    [styles.danger]: danger,
  });
  const Component = href ? "a" : "button";

  const handleClick = (e) => {
    if (shouldDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) onClick(e);
  };

  return (
    <>
      <Component
        {...passProps}
        onClick={handleClick}
        href={href}
        className={clsx(classNames)}
      >
        <div
          className={clsx(styles.inner, {
            [styles.hidden]: loading,
          })}
        >
          {leftIcon && (
            <FontAwesomeIcon className={styles.icon} icon={leftIcon} />
          )}
          <span>{children}</span>
          {rightIcon && (
            <FontAwesomeIcon className={styles.icon} icon={rightIcon} />
          )}
        </div>
        {loading && (
          <FontAwesomeIcon className={styles.loading} icon={faSpinner} spin />
        )}
      </Component>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  size: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.object,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
