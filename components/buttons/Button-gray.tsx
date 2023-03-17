interface ButtonProps {
  text: any;
  className?: any;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const ButtonGray = ({ text, className, type = "button", onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} px-4 bg-gray-100 hover:bg-gray-400 hover:text-gray-100 text-center 
      shadow-lg transition duration-300 ease-in-out shadow-gray-200/50 py-2 mx:px-0 
      text-gray-900 font-bold rounded whitespace-nowrap`}
    >
      {text}
    </button>
  );
};

export default ButtonGray;
