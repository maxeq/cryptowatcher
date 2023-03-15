interface ButtonProps {
  text: any;
  className?: any;
  type?: "submit" | "reset" | "button"; // add a default value for the type prop
}

const Button = ({ text, className, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 bg-lime-600 text-center hover:bg-lime-500 shadow-lg transition duration-300 ease-in-out shadow-lime-500/50 py-2 mx:px-0 text-white font-bold rounded whitespace-nowrap ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
