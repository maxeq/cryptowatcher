interface Button {
    text: any;
  }
  
  export default function Button({ text }: Button) {
    return <div className={`px-4 bg-lime-600 hover:bg-lime-500 shadow-lg shadow-lime-500/50 py-2 mx:px-0 text-white font-bold rounded whitespace-nowrap`}>{text}</div>;
  }
  