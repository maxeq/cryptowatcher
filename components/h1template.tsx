interface H1TemplateProps {
    text: string;
  }
  
  export default function H1Template({ text }: H1TemplateProps) {
    return <h1 className={`title mb-5`}>{text}</h1>;
  }
  