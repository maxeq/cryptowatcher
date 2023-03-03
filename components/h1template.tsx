interface H1TemplateProps {
    text: string;
  }
  
  export default function H1Template({ text }: H1TemplateProps) {
    return <h1 className={`title lg:pb-6 md:pb-3 pb-2`}>{text}</h1>;
  }
  