const widths = {
  base: {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-6/12',
    7: 'w-7/12',
    8: 'w-8/12',
    9: 'w-9/12',
    10: 'w-10/12',
    11: 'w-11/12',
    12: 'w-full',
  },
  sm: {
    1: 'sm:w-1/12',
    2: 'sm:w-2/12',
    3: 'sm:w-3/12',
    4: 'sm:w-4/12',
    5: 'sm:w-5/12',
    6: 'sm:w-6/12',
    7: 'sm:w-7/12',
    8: 'sm:w-8/12',
    9: 'sm:w-9/12',
    10: 'sm:w-10/12',
    11: 'sm:w-11/12',
    12: 'sm:w-full',
  },
  md: {
    1: 'md:w-1/12',
    2: 'md:w-2/12',
    3: 'md:w-3/12',
    4: 'md:w-4/12',
    5: 'md:w-5/12',
    6: 'md:w-6/12',
    7: 'md:w-7/12',
    8: 'md:w-8/12',
    9: 'md:w-9/12',
    10: 'md:w-10/12',
    11: 'md:w-11/12',
    12: 'md:w-full',
  },
  lg: {
    1: 'lg:w-1/12',
    2: 'lg:w-2/12',
    3: 'lg:w-3/12',
    4: 'lg:w-4/12',
    5: 'lg:w-5/12',
    6: 'lg:w-6/12',
    7: 'lg:w-7/12',
    8: 'lg:w-8/12',
    9: 'lg:w-9/12',
    10: 'lg:w-10/12',
    11: 'lg:w-11/12',
    12: 'lg:w-full',
  },
}

const offsetLgMap = {
  1: 'lg:ml-[8.333333%]',
  2: 'lg:ml-[16.666667%]',
  6: 'lg:ml-[50%]',
}

export function Container({ children, className = '', fluid = false, fixed = false }) {
  const max = fixed
    ? 'max-w-[1140px]'
    : 'sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]'

  return (
    <div
      className={`${fluid ? 'container-fluid w-full px-[15px]' : `container w-full mx-auto px-[15px] ${max}`} ${className}`}
    >
      {children}
    </div>
  )
}

export function Row({ children, className = '', noGutters = false }) {
  return (
    <div
      className={`row ${noGutters ? 'no-gutters' : ''} flex flex-wrap ${noGutters ? '' : '-mx-[15px]'} ${className}`}
    >
      {children}
    </div>
  )
}

export function Col({
  children,
  className = '',
  span = 12,
  sm,
  md,
  lg,
  offsetLg,
  order,
  orderLg,
}) {
  const pad = className.includes('px-0') || className.includes('no-pad') ? '' : 'px-[15px]'
  const bsClasses = [
    `col-${span}`,
    sm ? `col-sm-${sm}` : '',
    md ? `col-md-${md}` : '',
    lg ? `col-lg-${lg}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  const classes = [
    bsClasses,
    widths.base[span] || 'w-full',
    sm ? widths.sm[sm] : '',
    md ? widths.md[md] : '',
    lg ? widths.lg[lg] : '',
    offsetLg ? offsetLgMap[offsetLg] || '' : '',
    order === 1 ? 'order-1' : '',
    order === 2 ? 'order-2' : '',
    order === 3 ? 'order-3' : '',
    orderLg === 2 ? 'lg:order-2' : '',
    pad,
    'min-w-0 max-w-full box-border',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
