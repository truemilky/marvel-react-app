const Spinner = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{
        margin: "auto",
        background: "transparent",
        display: "block",
        shapeRendering: "auto",
        animationPlayState: "running",
        animationDelay: "0s",
      }}
      width='200px'
      height='200px'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        r='30'
        strokeWidth='3'
        stroke='#0a0a0a'
        strokeDasharray='47.12388980384689 47.12388980384689'
        fill='none'
        strokeLinecap='round'
        style={{ animationPlayState: "running", animationDelay: "0s" }}
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          keyTimes='0;1'
          values='0 50 50;360 50 50'
          style={{ animationPlayState: "running", animationDelay: "0s" }}
        />
      </circle>
    </svg>
  );
};

export default Spinner;
