import React, {
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

export const EuiSideNavItem = ({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href,
  items,
  children,
  depth,
  ...rest,
}) => {
  let childItems;

  if (isOpen) {
    childItems = (
      <div className="euiSideNavItem__items">
        {items}
      </div>
    );
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: 'euiSideNavItemButton__icon',
    });
  }

  const classes = classNames('euiSideNavItem', {
    'euiSideNavItem--root': depth === 0,
    'euiSideNavItem--rootIcon': depth === 0 && icon,
    'euiSideNavItem--trunk': depth === 1,
    'euiSideNavItem--branch': depth > 1,
  });

  const buttonClasses = classNames('euiSideNavItemButton', {
    'euiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'euiSideNavItemButton-isSelected': isSelected,
  });

  let caret;

  if (depth > 0 && isParent && !isOpen && !isSelected) {
    caret = <EuiIcon type="arrowDown" color="subdued" size="s" />;
  }

  const buttonContent = (
    <span className="euiSideNavItemButton__content">
      {buttonIcon}

      <span
        className="euiSideNavItemButton__label"
      >
        {children}
      </span>

      {caret}
    </span>
  );

  let button;

  if (href) {
    button = (
      <a
        className={buttonClasses}
        href={href}
      >
        {buttonContent}
      </a>
    );
  } else {
    button = (
      <button
        className={buttonClasses}
        onClick={onClick}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <div className={classes} {...rest}>
      {button}
      {childItems}
    </div>
  );
};

EuiSideNavItem.propTypes = {
  isOpen: PropTypes.bool,
  isSelected: PropTypes.bool,
  isParent: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
  items: PropTypes.node,
  children: PropTypes.node,
  depth: PropTypes.number,
};
